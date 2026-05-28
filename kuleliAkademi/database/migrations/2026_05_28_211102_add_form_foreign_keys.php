<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('form_fields', function (Blueprint $table): void {
            $table->foreign('form_id')->references('id')->on('forms')->cascadeOnDelete();
        });

        Schema::table('form_submissions', function (Blueprint $table): void {
            $table->foreign('form_id')->references('id')->on('forms')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('form_fields', function (Blueprint $table): void {
            $table->dropForeign(['form_id']);
        });

        Schema::table('form_submissions', function (Blueprint $table): void {
            $table->dropForeign(['form_id']);
        });
    }
};