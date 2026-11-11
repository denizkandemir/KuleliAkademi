<?php

namespace App\Models;

use App\Models\Concerns\HasPeriodicFees;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Dormitory / residence / host family etc. option of a language school.
 * language_school_campus_id = null means the option is offered at every campus of the school.
 */
class LanguageSchoolAccommodation extends Model
{
    use HasFactory, HasPeriodicFees;

    public const TYPES = [
        'dormitory' => 'Yurt',
        'residence' => 'Öğrenci Rezidansı',
        'host_family' => 'Aile Yanı',
        'shared_apartment' => 'Paylaşımlı Daire',
        'private_apartment' => 'Özel Daire',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'language_school_id',
        'language_school_campus_id',
        'title',
        'type',
        'room_type',
        'meal_plan',
        'short_description',
        'description',
        'image_url',
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

    public function typeLabel(): ?string
    {
        return self::TYPES[$this->type] ?? $this->type;
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function languageSchool()
    {
        return $this->belongsTo(LanguageSchool::class);
    }

    public function campus()
    {
        return $this->belongsTo(LanguageSchoolCampus::class, 'language_school_campus_id');
    }
}
