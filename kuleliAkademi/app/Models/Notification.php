<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'message',
        'type',
        'is_read',
        'related_type',
        'related_id',
    ];

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
            'related_id' => 'integer',
        ];
    }
}
