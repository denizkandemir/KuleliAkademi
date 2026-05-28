<?php

namespace App\Services;

use App\Models\University;
use App\Models\UniversityImage;
use Illuminate\Support\Facades\Process;
use RuntimeException;

class UniversityImportService
{
    /**
     * Import universities and gallery images from the JS source file.
     */
    public function importFromSource(): array
    {
        $sourceUniversities = $this->loadSourceUniversities();
        $imported = [];

        foreach ($sourceUniversities as $index => $sourceUniversity) {
            $imported[] = $this->importUniversity($sourceUniversity, $index);
        }

        return $imported;
    }

    /**
     * Load and normalize the current frontend source data.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function loadSourceUniversities(): array
    {
        $process = Process::path(base_path())
            ->timeout(120)
            ->run(['node', base_path('database/scripts/export-universities.mjs')]);

        if (! $process->successful()) {
            throw new RuntimeException('University source export failed: '.$process->errorOutput());
        }

        $decoded = json_decode($process->output(), true, 512, JSON_THROW_ON_ERROR);

        return is_array($decoded) ? $decoded : [];
    }

    /**
     * @param array<string, mixed> $sourceUniversity
     * @return array<string, mixed>
     */
    protected function importUniversity(array $sourceUniversity, int $sortOrder): array
    {
        $payload = $this->normalizeUniversityPayload($sourceUniversity, $sortOrder);

        $university = University::query()->updateOrCreate(
            ['slug' => $payload['slug']],
            $payload
        );

        $this->syncUniversityImages($university, $sourceUniversity);

        return $payload;
    }

    /**
     * @param array<string, mixed> $sourceUniversity
     * @return array<string, mixed>
     */
    protected function normalizeUniversityPayload(array $sourceUniversity, int $sortOrder): array
    {
        $slug = (string) ($sourceUniversity['slug'] ?? $sourceUniversity['id'] ?? '');
        $descriptionParts = $this->normalizeStringArray($sourceUniversity['longDescriptions'] ?? []);
        $notes = $this->normalizeMixedText($sourceUniversity['notes'] ?? null);

        $description = implode("\n\n", array_filter(array_merge($descriptionParts, $notes ? [$notes] : [])));
        $shortDescription = $descriptionParts[0] ?? $notes;

        $tuitionParts = array_values(array_filter([
            $this->normalizeMixedText($sourceUniversity['tuition_undergrad_eur'] ?? null),
            $this->normalizeMixedText($sourceUniversity['tuition_postgrad_eur'] ?? null),
        ]));

        $tuitionFee = match (count($tuitionParts)) {
            0 => null,
            1 => $tuitionParts[0],
            default => implode(' | ', array_values(array_unique($tuitionParts))),
        };

        $mainImageUrl = $this->normalizeMixedText($sourceUniversity['banner_image'] ?? null)
            ?? $this->normalizeMixedText($sourceUniversity['card_image'] ?? null)
            ?? $this->firstString($sourceUniversity['gallery_images'] ?? []);

        return [
            'name' => (string) ($sourceUniversity['name'] ?? $slug),
            'slug' => $slug,
            'short_name' => $this->normalizeMixedText($sourceUniversity['name_local'] ?? null),
            'country' => $this->normalizeMixedText($sourceUniversity['country'] ?? null) ?? 'Poland',
            'city' => $this->normalizeMixedText($sourceUniversity['city'] ?? null),
            'description' => $description ?: null,
            'short_description' => $shortDescription ?: null,
            'website_url' => $this->normalizeMixedText($sourceUniversity['website'] ?? null),
            'application_url' => $this->normalizeMixedText($sourceUniversity['application_url'] ?? null),
            'main_image_url' => $mainImageUrl,
            'logo_url' => $this->normalizeMixedText($sourceUniversity['logo_url'] ?? null),
            'tuition_fee' => $tuitionFee,
            'currency' => $tuitionFee ? 'EUR' : null,
            'duration' => $this->normalizeMixedText($sourceUniversity['duration'] ?? null),
            'language' => $this->normalizeMixedText($sourceUniversity['language_of_instruction'] ?? null),
            'ranking' => $this->normalizeMixedText($sourceUniversity['qs_ranking'] ?? null),
            'is_featured' => false,
            'is_active' => true,
            'sort_order' => $sortOrder,
        ];
    }

    /**
     * @param array<string, mixed> $sourceUniversity
     */
    protected function syncUniversityImages(University $university, array $sourceUniversity): void
    {
        $galleryImages = $this->normalizeStringArray($sourceUniversity['gallery_images'] ?? []);
        $mainImageUrl = $this->normalizeMixedText($sourceUniversity['main_image_url'] ?? null);

        if ($mainImageUrl && ! in_array($mainImageUrl, $galleryImages, true)) {
            array_unshift($galleryImages, $mainImageUrl);
        }

        if ($galleryImages === []) {
            return;
        }

        $coverImageUrl = $mainImageUrl ?: $galleryImages[0];

        foreach ($galleryImages as $index => $imageUrl) {
            UniversityImage::query()->updateOrCreate(
                [
                    'university_id' => $university->id,
                    'image_url' => $imageUrl,
                ],
                [
                    'alt_text' => $this->buildAltText($university->name, $index),
                    'sort_order' => $index,
                    'is_cover' => false,
                ]
            );
        }

        UniversityImage::query()
            ->where('university_id', $university->id)
            ->update(['is_cover' => false]);

        UniversityImage::query()
            ->where('university_id', $university->id)
            ->where('image_url', $coverImageUrl)
            ->update([
                'is_cover' => true,
                'sort_order' => 0,
            ]);
    }

    /**
     * @param array<int, mixed> $values
     * @return array<int, string>
     */
    protected function normalizeStringArray(array $values): array
    {
        return array_values(array_filter(array_map(function ($value): ?string {
            if (! is_string($value)) {
                return null;
            }

            $normalized = trim($value);

            return $normalized === '' ? null : $normalized;
        }, $values)));
    }

    /**
     * @param mixed $value
     */
    protected function normalizeMixedText(mixed $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $normalized = trim($value);

        return $normalized === '' ? null : $normalized;
    }

    /**
     * @param mixed $values
     */
    protected function firstString(mixed $values): ?string
    {
        if (! is_array($values)) {
            return null;
        }

        foreach ($values as $value) {
            $normalized = $this->normalizeMixedText($value);

            if ($normalized !== null) {
                return $normalized;
            }
        }

        return null;
    }

    protected function buildAltText(string $universityName, int $index): string
    {
        return $index === 0
            ? $universityName.' cover image'
            : $universityName.' gallery image '.($index + 1);
    }
}