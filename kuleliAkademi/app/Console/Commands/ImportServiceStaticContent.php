<?php

namespace App\Console\Commands;

use App\Models\Service;
use App\Models\ServiceImage;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ImportServiceStaticContent extends Command
{
    /**
     * This command is NOT run automatically on deploy or by DatabaseSeeder.
     * Run it manually, once, to migrate the six original hardcoded
     * "Hizmetlerimiz" entries into the database. It is idempotent for the
     * service row itself (matched by slug), but re-running it DOES replace
     * the intro paragraphs / highlights / process steps / requirements of
     * those same six services with the frozen snapshot in
     * database/data/service_static_content.php — any admin edits made to
     * those specific nested sections in the meantime would be overwritten.
     * It never touches any other service.
     */
    protected $signature = 'services:import-static-content';

    protected $description = 'Import the six original static Hizmetlerimiz entries into the services tables (idempotent by slug).';

    public function handle(): int
    {
        $dataPath = database_path('data/service_static_content.php');

        if (! File::exists($dataPath)) {
            $this->error("Kaynak veri dosyası bulunamadı: {$dataPath}");

            return self::FAILURE;
        }

        $rows = require $dataPath;

        foreach ($rows as $index => $row) {
            DB::transaction(function () use ($row, $index): void {
                $this->importService($row, $index);
            });

            $this->info("İşlendi: {$row['slug']}");
        }

        $this->newLine();
        $this->info(count($rows).' hizmet başarıyla içe aktarıldı.');

        return self::SUCCESS;
    }

    private function importService(array $row, int $index): void
    {
        $service = Service::query()->where('slug', $row['slug'])->first();
        $isNew = $service === null;
        $service ??= new Service(['slug' => $row['slug']]);

        $service->fill([
            'title' => $row['title'],
            'subtitle' => $row['subtitle'] ?? null,
            'short_description' => $row['short_description'] ?? null,
            'intro_title' => $row['intro_title'] ?? null,
            'sidebar_short_info' => $row['sidebar_short_info'] ?? null,
            'cta_title' => $row['cta_title'] ?? null,
            'cta_text' => $row['cta_text'] ?? null,
            'cta_button_text' => $row['cta_button_text'] ?? null,
            'cta_href' => $row['cta_href'] ?? null,
            'whatsapp_key' => $row['whatsapp_key'] ?? null,
            'detail_page_note' => $row['detail_page_note'] ?? null,
            'detail_object_position' => $row['detail_object_position'] ?? null,
        ]);

        if ($isNew) {
            $service->is_active = true;
            $service->sort_order = $index + 1;
        }

        $service->save();

        $service->introParagraphs()->delete();
        $service->introParagraphs()->createMany(
            collect($row['intro_paragraphs'] ?? [])
                ->values()
                ->map(fn (string $content, int $i): array => ['content' => $content, 'sort_order' => $i])
                ->all()
        );

        $service->highlights()->delete();
        $service->highlights()->createMany(
            collect($row['highlights'] ?? [])
                ->values()
                ->map(fn (string $content, int $i): array => ['content' => $content, 'sort_order' => $i])
                ->all()
        );

        $service->processSteps()->delete();
        $service->processSteps()->createMany(
            collect($row['process_steps'] ?? [])
                ->values()
                ->map(fn (array $step, int $i): array => [
                    'title' => $step['title'],
                    'short_description' => $step['short_description'] ?? null,
                    'icon_path' => $this->copyIcon($step['icon'] ?? null),
                    'sort_order' => $i,
                ])
                ->all()
        );

        $service->requirements()->delete();
        $service->requirements()->createMany(
            collect($row['requirements'] ?? [])
                ->values()
                ->map(fn (array $item, int $i): array => [
                    'title' => $item['title'],
                    'short_description' => $item['short_description'] ?? null,
                    'icon_path' => $this->copyIcon($item['icon'] ?? null),
                    'sort_order' => $i,
                ])
                ->all()
        );

        foreach (($row['images'] ?? []) as $type => $image) {
            ServiceImage::query()->updateOrCreate(
                ['service_id' => $service->id, 'image_type' => $type],
                [
                    'image_url' => $image['path'],
                    'object_position' => $image['object_position'] ?? null,
                    'alt_text' => $service->title,
                    'sort_order' => 0,
                    'is_cover' => $type === 'homepage',
                ]
            );
        }
    }

    private function copyIcon(?string $filename): ?string
    {
        if (! $filename) {
            return null;
        }

        $source = resource_path("js/assets/icons/{$filename}");

        if (! File::exists($source)) {
            $this->warn("İkon kaynağı bulunamadı, atlanıyor: {$filename}");

            return null;
        }

        $destinationRelative = "service-icons/{$filename}";
        $destinationAbsolute = storage_path("app/public/{$destinationRelative}");

        File::ensureDirectoryExists(dirname($destinationAbsolute));
        File::copy($source, $destinationAbsolute);

        return $destinationRelative;
    }
}
