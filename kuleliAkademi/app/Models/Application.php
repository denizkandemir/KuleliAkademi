<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'full_name',
        'email',
        'phone',
        'message',
        'status',
    ];

    protected function casts(): array
    {
        return [];
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
