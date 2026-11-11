<?php

namespace App\Models;

use App\Models\Concerns\HasPeriodicFees;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class LanguageSchool extends Model
{
    use HasFactory, HasPeriodicFees;

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
        'language',
        'description',
        'short_description',
        'website_url',
        'application_url',
        'main_image_url',
        'logo_url',
        'weekly_fee',
        'monthly_fee',
        'yearly_fee',
        'currency',
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
            'weekly_fee' => 'decimal:2',
            'monthly_fee' => 'decimal:2',
            'yearly_fee' => 'decimal:2',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * Distinct countries that have at least one active school, for the country filter.
     *
     * @return list<array{label: string, value: string, count: int}>
     */
    public static function countryOptions(): array
    {
        return static::query()
            ->active()
            ->selectRaw('country_slug, MIN(country) as country, COUNT(*) as school_count')
            ->groupBy('country_slug')
            ->orderBy('country')
            ->get()
            ->map(fn (self $school): array => [
                'label' => $school->country,
                'value' => $school->country_slug,
                'count' => (int) $school->school_count,
            ])
            ->all();
    }

    public function setCountryAttribute(mixed $value): void
    {
        $country = is_string($value) ? trim($value) : '';

        $this->attributes['country'] = $country;
        $this->attributes['country_slug'] = Str::slug($country);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeByCountry(Builder $query, ?string $countrySlug): Builder
    {
        $countrySlug = trim((string) $countrySlug);

        if ($countrySlug === '') {
            return $query;
        }

        return $query->where('country_slug', Str::slug($countrySlug));
    }

    public function scopeByCity(Builder $query, ?string $citySlug): Builder
    {
        $citySlug = trim((string) $citySlug);

        if ($citySlug === '') {
            return $query;
        }

        return $query->whereHas('campuses', fn (Builder $campuses) => $campuses
            ->active()
            ->where('city_slug', Str::slug($citySlug)));
    }

    public function campuses()
    {
        // chaperone(): each loaded campus gets ->languageSchool set without an extra query
        // (campus effectiveFee() falls back to the school's fee).
        return $this->hasMany(LanguageSchoolCampus::class)
            ->chaperone()
            ->orderBy('sort_order');
    }

    public function accommodations()
    {
        return $this->hasMany(LanguageSchoolAccommodation::class)
            ->orderBy('sort_order');
    }
}
