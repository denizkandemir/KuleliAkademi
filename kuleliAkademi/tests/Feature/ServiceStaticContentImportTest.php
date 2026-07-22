<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\ServiceIntroParagraph;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiceStaticContentImportTest extends TestCase
{
    use RefreshDatabase;

    private const EXPECTED_SLUGS = [
        'okul-basvurusu',
        'vize-basvurusu',
        'karsilama-ve-yerlesim',
        'oturum-izni',
        'konaklama-danismanligi',
        'sehir-ve-ogrenci-hayati-rehberligi',
    ];

    public function test_it_imports_all_six_static_services(): void
    {
        $this->artisan('services:import-static-content')->assertSuccessful();

        foreach (self::EXPECTED_SLUGS as $slug) {
            $this->assertDatabaseHas('services', ['slug' => $slug]);
        }

        $this->assertSame(6, Service::query()->whereIn('slug', self::EXPECTED_SLUGS)->count());
    }

    public function test_running_it_twice_does_not_create_duplicates(): void
    {
        $this->artisan('services:import-static-content')->assertSuccessful();
        $firstCount = Service::query()->count();
        $firstParagraphCount = ServiceIntroParagraph::query()->count();

        $this->artisan('services:import-static-content')->assertSuccessful();

        $this->assertSame($firstCount, Service::query()->count());
        $this->assertSame($firstParagraphCount, ServiceIntroParagraph::query()->count());
    }

    public function test_it_does_not_touch_unrelated_services(): void
    {
        $unrelated = Service::factory()->create(['slug' => 'ilgisiz-hizmet']);

        $this->artisan('services:import-static-content')->assertSuccessful();

        $this->assertDatabaseHas('services', ['id' => $unrelated->id, 'slug' => 'ilgisiz-hizmet']);
    }
}
