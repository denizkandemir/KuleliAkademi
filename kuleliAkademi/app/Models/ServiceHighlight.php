<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceHighlight extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'content',
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
}
