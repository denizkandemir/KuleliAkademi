<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    use HasFactory;

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