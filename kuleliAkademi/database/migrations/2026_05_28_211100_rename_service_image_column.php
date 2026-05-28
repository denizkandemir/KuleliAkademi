<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('services') && Schema::hasColumn('services', 'image') && ! Schema::hasColumn('services', 'image_url')) {
            Schema::table('services', function (Blueprint $table): void {
                $table->renameColumn('image', 'image_url');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('services') && Schema::hasColumn('services', 'image_url') && ! Schema::hasColumn('services', 'image')) {
            Schema::table('services', function (Blueprint $table): void {
                $table->renameColumn('image_url', 'image');
            });
        }
    }
};