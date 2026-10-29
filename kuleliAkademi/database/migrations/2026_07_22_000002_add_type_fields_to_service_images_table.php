<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Remove orphaned rows before adding the foreign key constraint below.
        if (Schema::hasTable('service_images') && Schema::hasTable('services')) {
            DB::table('service_images')
                ->whereNotIn('service_id', DB::table('services')->select('id'))
                ->delete();
        }

        Schema::table('service_images', function (Blueprint $table): void {
            if (! Schema::hasColumn('service_images', 'image_type')) {
                $table->string('image_type', 50)->default('gallery')->after('service_id');
            }
            if (! Schema::hasColumn('service_images', 'object_position')) {
                $table->string('object_position', 50)->nullable()->after('image_type');
            }
        });

        $hasServiceIdIndex = collect(Schema::getIndexes('service_images'))
            ->contains(fn (array $index): bool => $index['columns'] === ['service_id']);

        if (! $hasServiceIdIndex) {
            Schema::table('service_images', function (Blueprint $table): void {
                $table->index('service_id');
            });
        }

        $hasForeignKey = collect(Schema::getForeignKeys('service_images'))
            ->contains(fn (array $fk): bool => $fk['columns'] === ['service_id']);

        if (! $hasForeignKey) {
            Schema::table('service_images', function (Blueprint $table): void {
                $table->foreign('service_id')->references('id')->on('services')->cascadeOnDelete();
            });
        }
    }

    public function down(): void
    {
        Schema::table('service_images', function (Blueprint $table): void {
            $hasForeignKey = collect(Schema::getForeignKeys('service_images'))
                ->contains(fn (array $fk): bool => $fk['columns'] === ['service_id']);

            if ($hasForeignKey) {
                $table->dropForeign(['service_id']);
            }

            if (Schema::hasColumn('service_images', 'object_position')) {
                $table->dropColumn('object_position');
            }
            if (Schema::hasColumn('service_images', 'image_type')) {
                $table->dropColumn('image_type');
            }
        });
    }
};
