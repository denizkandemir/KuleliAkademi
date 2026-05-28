<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'video_url',
        'thumbnail_url',
        'source',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
