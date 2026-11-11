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
        Schema::create('language_school_campuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('language_school_id')->constrained()->cascadeOnDelete();
            $table->string('name')->nullable();
            $table->string('city');
            $table->string('city_slug')->index();
            $table->text('address')->nullable();
            // Null = use the school's default fee.
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
        Schema::dropIfExists('language_school_campuses');
    }
};
