<?php

namespace Database\Seeders;

use App\Services\UniversityImportService;
use Illuminate\Database\Seeder;

class UniversitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app(UniversityImportService::class)->importFromSource();
    }
}