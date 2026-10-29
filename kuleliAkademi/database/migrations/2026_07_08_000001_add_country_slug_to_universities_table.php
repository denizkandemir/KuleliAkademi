<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('universities', 'country_slug')) {
            Schema::table('universities', function (Blueprint $table): void {
                $table->string('country_slug')->nullable()->index()->after('country');
            });
        }

        Schema::table('universities', function (Blueprint $table): void {
            $table->index('country', 'universities_country_index');
        });

        $universities = DB::table('universities')
            ->select('id', 'country', 'country_slug')
            ->orderBy('id')
            ->get();

        foreach ($universities as $university) {
            $rawCountry = trim((string) ($university->country ?? ''));
            $normalizedCountry = $rawCountry === '' || in_array(mb_strtolower($rawCountry), ['poland', 'polonya'], true)
                ? 'Polonya'
                : $rawCountry;

            $normalizedCountrySlug = Str::slug($normalizedCountry);

            $updates = [];

            if ($rawCountry !== $normalizedCountry) {
                $updates['country'] = $normalizedCountry;
            }

            if ((string) ($university->country_slug ?? '') !== $normalizedCountrySlug) {
                $updates['country_slug'] = $normalizedCountrySlug;
            }

            if ($updates !== []) {
                DB::table('universities')
                    ->where('id', $university->id)
                    ->update($updates);
            }
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('universities', 'country_slug')) {
            Schema::table('universities', function (Blueprint $table): void {
                $table->dropIndex('universities_country_slug_index');
                $table->dropColumn('country_slug');
            });
        }

        Schema::table('universities', function (Blueprint $table): void {
            $table->dropIndex('universities_country_index');
        });
    }
};