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
        Schema::create('language_school_accommodations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('language_school_id')->constrained()->cascadeOnDelete();
            // Null = offered at every campus of the school.
            $table->foreignId('language_school_campus_id')->nullable()->constrained('language_school_campuses')->cascadeOnDelete();
            $table->string('title');
            $table->string('type')->index();
            $table->string('room_type')->nullable();
            $table->string('meal_plan')->nullable();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->text('image_url')->nullable();
            $table->decimal('weekly_fee', 10, 2)->nullable();
            $table->decimal('monthly_fee', 10, 2)->nullable();
            $table->decimal('yearly_fee', 10, 2)->nullable();
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
        Schema::dropIfExists('language_school_accommodations');
    }
};
