<?php

namespace App\Models;

use App\Support\MediaUrl;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceImage extends Model
{
    use HasFactory;

    public const TYPES = ['homepage', 'banner', 'detail', 'sidebar_widget', 'cta', 'gallery'];

    protected $fillable = [
        'service_id',
        'image_url',
        'image_type',
        'object_position',
        'alt_text',
        'sort_order',
        'is_cover',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'is_cover' => 'boolean',
        ];
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function resolvedUrl(): ?string
    {
        return MediaUrl::resolve($this->image_url);
    }
}
