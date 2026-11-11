<?php

namespace Tests\Feature;

use App\Models\Application;
use App\Models\ContactMessage;
use App\Models\Service;
use Database\Seeders\LanguageSchoolSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudyAbroadPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_study_abroad_hub_still_renders_at_its_existing_url(): void
    {
        $this->get('/yurtdışıeğitim')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('YurtDisindaEgitim'));
    }

    public function test_poland_page_renders_with_active_services(): void
    {
        Service::factory()->create(['title' => 'Pasif', 'is_active' => false]);
        Service::factory()->create(['title' => 'Aktif', 'is_active' => true]);

        $this->get('/polonyada-universite')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('PolandPage')
                ->has('dbServices', 1)
                ->where('dbServices.0.title', 'Aktif')
            );
    }

    public function test_spain_page_renders(): void
    {
        $this->get('/ispanyada-egitim')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('SpainPage'));
    }

    public function test_language_schools_page_lists_seeded_schools_and_filters_by_city(): void
    {
        $this->seed(LanguageSchoolSeeder::class);

        $this->get('/dil-okullari')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('LanguageSchoolsPage')
                ->has('languageSchools', 3)
                ->where('countryOptions.0.value', 'ispanya')
            );

        $this->get('/dil-okullari?country=ispanya&city=valensiya')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('filters.city', 'valensiya')
                // Enforex, Linguaschools and Hispania all have a Valencia campus.
                ->has('languageSchools', 3)
            );

        $this->get('/dil-okullari?country=ispanya&city=cadiz')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->has('languageSchools', 1)
                ->where('languageSchools.0.slug', 'enforex')
            );
    }

    public function test_language_school_seeder_is_idempotent(): void
    {
        $this->seed(LanguageSchoolSeeder::class);
        $this->seed(LanguageSchoolSeeder::class);

        $this->assertDatabaseCount('language_schools', 3);
        $this->assertDatabaseCount('language_school_campuses', 11 + 7 + 1);
    }

    public function test_old_and_short_urls_redirect_permanently(): void
    {
        $this->get('/dilOkullari')->assertStatus(301)->assertRedirect('/dil-okullari');
        $this->get('/polonya')->assertStatus(301)->assertRedirect('/polonyada-universite');
        $this->get('/ispanya')->assertStatus(301)->assertRedirect('/ispanyada-egitim');
    }

    public function test_existing_public_urls_still_respond(): void
    {
        foreach (['/', '/üniversiteler', '/egitimlerimiz', '/iletişim', '/basvuru', '/linkler', '/hakkımızda'] as $url) {
            $this->get($url)->assertOk();
        }
    }

    public function test_sitemap_lists_the_new_pages(): void
    {
        $this->get('/sitemap.xml')
            ->assertOk()
            ->assertSee('https://akademikuleli.com/polonyada-universite', false)
            ->assertSee('https://akademikuleli.com/ispanyada-egitim', false)
            ->assertSee('https://akademikuleli.com/dil-okullari', false)
            ->assertSee(htmlspecialchars('https://akademikuleli.com/yurtdışıeğitim'), false);
    }

    public function test_contact_form_stores_the_selected_program(): void
    {
        $this->post('/iletişim', [
            'name' => 'Test Aday',
            'email' => 'aday@example.com',
            'program' => 'malta_language',
            'message' => '8 hafta, Haziran, B1',
        ])->assertRedirect();

        $this->assertSame('malta_language', ContactMessage::query()->first()->program);
    }

    public function test_application_form_stores_the_selected_program(): void
    {
        $this->post('/basvuru', [
            'full_name' => 'Test Aday',
            'email' => 'aday@example.com',
            'program' => 'spain_foundation',
        ])->assertRedirect();

        $this->assertSame('spain_foundation', Application::query()->first()->program);
    }

    public function test_forms_reject_an_unknown_program(): void
    {
        $this->post('/iletişim', [
            'name' => 'Test Aday',
            'email' => 'aday@example.com',
            'program' => 'mars_university',
            'message' => 'Merhaba',
        ])->assertSessionHasErrors('program');

        $this->post('/basvuru', [
            'full_name' => 'Test Aday',
            'email' => 'aday@example.com',
            'program' => 'mars_university',
        ])->assertSessionHasErrors('program');

        $this->assertDatabaseCount('contact_messages', 0);
        $this->assertDatabaseCount('applications', 0);
    }
}
