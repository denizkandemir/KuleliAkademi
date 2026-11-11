<?php

namespace App\Models;

use App\Models\Concerns\HasPeriodicFees;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * A branch of a language school in one city. All campuses of a school are in the school's country.
 */
class LanguageSchoolCampus extends Model
{
    use HasFactory, HasPeriodicFees;

    protected $table = 'language_school_campuses';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'language_school_id',
        'name',
        'city',
        'city_slug',
        'address',
        'weekly_fee',
        'monthly_fee',
        'yearly_fee',
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
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * Distinct cities that have an active campus, optionally limited to one country.
     *
     * @return list<array{label: string, value: string, count: int}>
     */
    public static function cityOptions(?string $countrySlug = null): array
    {
        return static::query()
            ->active()
            ->whereHas('languageSchool', fn (Builder $schools) => $schools->active()->byCountry($countrySlug))
            ->selectRaw('city_slug, MIN(city) as city, COUNT(DISTINCT language_school_id) as school_count')
            ->groupBy('city_slug')
            ->orderBy('city')
            ->get()
            ->map(fn (self $campus): array => [
                'label' => $campus->city,
                'value' => $campus->city_slug,
                'count' => (int) $campus->school_count,
            ])
            ->all();
    }

    public function setCityAttribute(mixed $value): void
    {
        $city = is_string($value) ? trim($value) : '';

        $this->attributes['city'] = $city;
        $this->attributes['city_slug'] = Str::slug($city);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Campus fee for the period, falling back to the school's default fee when the campus has none.
     */
    public function effectiveFee(string $period): ?string
    {
        return $this->feeFor($period) ?? $this->languageSchool?->feeFor($period);
    }

    /**
     * Accommodations offered at this campus: its own options plus the school-wide ones.
     */
    public function availableAccommodations(): Builder
    {
        return LanguageSchoolAccommodation::query()
            ->where('language_school_id', $this->language_school_id)
            ->where(fn (Builder $query) => $query
                ->whereNull('language_school_campus_id')
                ->orWhere('language_school_campus_id', $this->getKey()))
            ->orderBy('sort_order');
    }

    public function languageSchool()
    {
        return $this->belongsTo(LanguageSchool::class);
    }

    public function accommodations()
    {
        return $this->hasMany(LanguageSchoolAccommodation::class)
            ->orderBy('sort_order');
    }
}
