<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class University extends Model
{
    use HasFactory;

    public const DEFAULT_COUNTRY = 'Polonya';

    public const DEFAULT_COUNTRY_SLUG = 'polonya';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'short_name',
        'country',
        'country_slug',
        'city',
        'description',
        'short_description',
        'website_url',
        'application_url',
        'main_image_url',
        'logo_url',
        'tuition_fee',
        'currency',
        'duration',
        'language',
        'ranking',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public static function normalizeCountry(?string $country): string
    {
        $normalized = trim((string) $country);

        return $normalized === '' ? self::DEFAULT_COUNTRY : $normalized;
    }

    public static function countrySlug(?string $country): string
    {
        return Str::slug(static::normalizeCountry($country));
    }

    public static function normalizeCountrySlug(?string $countrySlug): ?string
    {
        $normalized = trim((string) $countrySlug);

        return $normalized === '' ? null : Str::slug($normalized);
    }

    public static function countryOptions(): array
    {
        return static::countryOptionsFrom(static::query()->select('country')->get());
    }

    /**
     * @param iterable<mixed> $universities
     */
    public static function countryOptionsFrom(iterable $universities): array
    {
        $options = collect($universities)
            ->map(function (mixed $item): string {
                if ($item instanceof self) {
                    return static::normalizeCountry($item->country);
                }

                if (is_string($item)) {
                    return static::normalizeCountry($item);
                }

                if (is_array($item)) {
                    return static::normalizeCountry($item['country'] ?? null);
                }

                if (is_object($item)) {
                    return static::normalizeCountry($item->country ?? null);
                }

                return static::DEFAULT_COUNTRY;
            })
            ->groupBy(fn (string $country): string => static::countrySlug($country))
            ->map(function (Collection $countries, string $slug): array {
                return [
                    'label' => $countries->first(),
                    'value' => $slug,
                    'count' => $countries->count(),
                ];
            })
            ->sortBy(fn (array $option): string => Str::lower($option['label']))
            ->values();

        if ($options->isEmpty()) {
            return [[
                'label' => self::DEFAULT_COUNTRY,
                'value' => self::DEFAULT_COUNTRY_SLUG,
                'count' => 0,
            ]];
        }

        return $options->all();
    }

    public function setCountryAttribute(mixed $value): void
    {
        $country = static::normalizeCountry(is_string($value) ? $value : null);

        $this->attributes['country'] = $country;
        $this->attributes['country_slug'] = static::countrySlug($country);
    }

    public function scopeByCountry(Builder $query, ?string $countrySlug): Builder
    {
        $normalizedCountrySlug = static::normalizeCountrySlug($countrySlug);

        if ($normalizedCountrySlug === null) {
            return $query;
        }

        return $query->where('country_slug', $normalizedCountrySlug);
    }

    public function images()
    {
        return $this->hasMany(UniversityImage::class);
    }

    public function coverImage()
    {
        return $this->hasOne(UniversityImage::class)
            ->where('is_cover', true);
    }
}