<?php

namespace Tests\Feature;

use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_active_service_is_reachable_by_slug_with_relations_loaded(): void
    {
        $service = Service::factory()->create(['slug' => 'aktif-hizmet', 'is_active' => true]);
        $service->introParagraphs()->create(['content' => 'Paragraf', 'sort_order' => 0]);
        $service->processSteps()->create(['title' => 'Adım', 'sort_order' => 0]);

        $response = $this->get('/hizmetler/aktif-hizmet');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('ServiceDetail')
            ->where('service.slug', 'aktif-hizmet')
            ->where('service.intro_paragraphs.0', 'Paragraf')
            ->where('service.process_steps.0.title', 'Adım')
        );
    }

    public function test_inactive_service_is_not_exposed_on_the_public_page(): void
    {
        Service::factory()->create(['slug' => 'pasif-hizmet', 'is_active' => false]);

        $response = $this->get('/hizmetler/pasif-hizmet');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('ServiceDetail')->where('service', null));
    }

    public function test_unknown_slug_is_not_exposed(): void
    {
        $response = $this->get('/hizmetler/hic-boyle-bir-hizmet-yok');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->where('service', null));
    }

    public function test_homepage_only_lists_active_services_ordered_by_sort_order(): void
    {
        Service::factory()->create(['title' => 'Pasif', 'is_active' => false, 'sort_order' => 0]);
        Service::factory()->create(['title' => 'İkinci', 'is_active' => true, 'sort_order' => 2]);
        Service::factory()->create(['title' => 'Birinci', 'is_active' => true, 'sort_order' => 1]);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Home')
            ->has('dbServices', 2)
            ->where('dbServices.0.title', 'Birinci')
            ->where('dbServices.1.title', 'İkinci')
        );
    }

    public function test_shared_nav_services_only_include_active_services(): void
    {
        Service::factory()->create(['title' => 'Aktif Menü', 'is_active' => true, 'sort_order' => 0]);
        Service::factory()->create(['title' => 'Pasif Menü', 'is_active' => false, 'sort_order' => 1]);

        $response = $this->get('/');

        $response->assertInertia(fn ($page) => $page
            ->has('navServices', 1)
            ->where('navServices.0.title', 'Aktif Menü')
        );
    }
}
