<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('language_schools', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('short_name')->nullable();
            $table->string('country');
            $table->string('country_slug')->index();
            $table->string('language')->nullable();
            $table->longText('description')->nullable();
            $table->text('short_description')->nullable();
            $table->text('website_url')->nullable();
            $table->text('application_url')->nullable();
            $table->text('main_image_url')->nullable();
            $table->text('logo_url')->nullable();
            // Default course fees; a campus can override them.
            $table->decimal('weekly_fee', 10, 2)->nullable();
            $table->decimal('monthly_fee', 10, 2)->nullable();
            $table->decimal('yearly_fee', 10, 2)->nullable();
            $table->string('currency', 3)->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_active')->default(true)->index();
            $table->integer('sort_order')->default(0)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('language_schools');
    }
};
