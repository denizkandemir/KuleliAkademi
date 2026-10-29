<?php

namespace App\Models;

use App\Support\MediaUrl;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceProcessStep extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'title',
        'short_description',
        'icon_path',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function resolvedIconUrl(): ?string
    {
        return MediaUrl::resolve($this->icon_path);
    }
}
