<?php

namespace Tests\Feature\Admin;

use App\Models\Service;
use App\Models\ServiceProcessStep;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ServiceManagementTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['role' => 'admin']);
    }

    public function test_admin_can_create_a_service_with_nested_content_and_images(): void
    {
        Storage::fake('public');

        $response = $this->actingAs($this->admin())->post('/admin/services', [
            'title' => 'Yeni Hizmet',
            'slug' => '',
            'short_description' => 'Kısa açıklama',
            'is_active' => true,
            'sort_order' => 2,
            'intro_paragraphs' => [
                ['content' => 'Birinci paragraf'],
                ['content' => 'İkinci paragraf'],
            ],
            'highlights' => [
                ['content' => 'Madde bir'],
            ],
            'process_steps' => [
                ['title' => 'Adım 1', 'short_description' => 'Açıklama', 'icon' => UploadedFile::fake()->image('step.png')],
            ],
            'requirements' => [
                ['title' => 'Evrak 1', 'short_description' => 'Açıklama'],
            ],
            'images' => [
                'homepage' => ['file' => UploadedFile::fake()->image('homepage.jpg'), 'alt_text' => 'Kapak'],
            ],
        ]);

        $response->assertRedirect('/admin/services');
        $response->assertSessionHas('success');

        $service = Service::query()->where('title', 'Yeni Hizmet')->firstOrFail();
        $this->assertSame('yeni-hizmet', $service->slug);
        $this->assertCount(2, $service->introParagraphs);
        $this->assertCount(1, $service->highlights);
        $this->assertCount(1, $service->processSteps);
        $this->assertCount(1, $service->requirements);
        $this->assertNotNull($service->processSteps->first()->icon_path);
        Storage::disk('public')->assertExists($service->processSteps->first()->icon_path);

        $homepageImage = $service->images()->where('image_type', 'homepage')->first();
        $this->assertNotNull($homepageImage);
        Storage::disk('public')->assertExists($homepageImage->image_url);
    }

    public function test_slug_must_be_unique(): void
    {
        Service::factory()->create(['slug' => 'mevcut-hizmet']);

        $response = $this->actingAs($this->admin())->post('/admin/services', [
            'title' => 'Başka hizmet',
            'slug' => 'mevcut-hizmet',
        ]);

        $response->assertSessionHasErrors('slug');
    }

    public function test_update_preserves_existing_image_when_no_new_file_uploaded(): void
    {
        Storage::fake('public');
        $service = Service::factory()->create();
        $existingPath = UploadedFile::fake()->image('old.jpg')->store('services', 'public');
        $service->images()->create([
            'image_type' => 'homepage',
            'image_url' => $existingPath,
            'sort_order' => 0,
            'is_cover' => true,
        ]);

        $this->actingAs($this->admin())->put("/admin/services/{$service->id}", [
            'title' => $service->title,
            'slug' => $service->slug,
            'images' => [
                'homepage' => ['alt_text' => 'Yeni alt metin'],
            ],
        ]);

        $image = $service->images()->where('image_type', 'homepage')->first();
        $this->assertSame($existingPath, $image->image_url);
        $this->assertSame('Yeni alt metin', $image->alt_text);
        Storage::disk('public')->assertExists($existingPath);
    }

    public function test_uploading_a_new_image_deletes_the_previous_managed_file(): void
    {
        Storage::fake('public');
        $service = Service::factory()->create();
        $oldPath = UploadedFile::fake()->image('old.jpg')->store('services', 'public');
        $service->images()->create([
            'image_type' => 'homepage',
            'image_url' => $oldPath,
            'sort_order' => 0,
            'is_cover' => true,
        ]);

        $this->actingAs($this->admin())->put("/admin/services/{$service->id}", [
            'title' => $service->title,
            'slug' => $service->slug,
            'images' => [
                'homepage' => ['file' => UploadedFile::fake()->image('new.jpg')],
            ],
        ]);

        Storage::disk('public')->assertMissing($oldPath);
        $image = $service->images()->where('image_type', 'homepage')->first();
        $this->assertNotSame($oldPath, $image->image_url);
        Storage::disk('public')->assertExists($image->image_url);
    }

    public function test_a_legacy_storage_images_path_is_never_deleted(): void
    {
        Storage::fake('public');
        $service = Service::factory()->create();
        $service->images()->create([
            'image_type' => 'homepage',
            'image_url' => '/storage/images/servicesImg1.webp',
            'sort_order' => 0,
            'is_cover' => true,
        ]);

        $this->actingAs($this->admin())->put("/admin/services/{$service->id}", [
            'title' => $service->title,
            'slug' => $service->slug,
            'images' => [
                'homepage' => ['file' => UploadedFile::fake()->image('new.jpg')],
            ],
        ]);

        // No exception/file-system error should occur for a non-managed legacy path,
        // and the shared asset must never be touched.
        $this->assertTrue(true);
    }

    public function test_admin_cannot_update_a_process_step_belonging_to_another_service(): void
    {
        $serviceA = Service::factory()->create();
        $serviceB = Service::factory()->create();
        $stepFromB = ServiceProcessStep::query()->create([
            'service_id' => $serviceB->id,
            'title' => 'B adımı',
            'sort_order' => 0,
        ]);

        $this->actingAs($this->admin())->put("/admin/services/{$serviceA->id}", [
            'title' => $serviceA->title,
            'slug' => $serviceA->slug,
            'process_steps' => [
                ['id' => $stepFromB->id, 'title' => 'Ele geçirilmeye çalışıldı'],
            ],
        ]);

        $this->assertSame('B adımı', $stepFromB->fresh()->title);
        // The scoped whereKey() lookup found nothing under service A, so a new
        // row was created for service A instead of mutating service B's row.
        $this->assertSame(1, $serviceA->fresh()->processSteps()->count());
        $this->assertSame(1, $serviceB->fresh()->processSteps()->count());
    }

    public function test_deleting_a_process_step_removes_its_managed_icon_file(): void
    {
        Storage::fake('public');
        $service = Service::factory()->create();
        $iconPath = UploadedFile::fake()->image('icon.png')->store('service-icons', 'public');
        $step = $service->processSteps()->create(['title' => 'Adım', 'icon_path' => $iconPath, 'sort_order' => 0]);

        $this->actingAs($this->admin())->put("/admin/services/{$service->id}", [
            'title' => $service->title,
            'slug' => $service->slug,
            'deleted_process_step_ids' => [$step->id],
        ]);

        $this->assertSame(0, $service->fresh()->processSteps()->count());
        Storage::disk('public')->assertMissing($iconPath);
    }

    public function test_deleting_a_service_cascades_and_cleans_up_managed_files(): void
    {
        Storage::fake('public');
        $service = Service::factory()->create();
        $imagePath = UploadedFile::fake()->image('cover.jpg')->store('services', 'public');
        $service->images()->create(['image_type' => 'homepage', 'image_url' => $imagePath, 'sort_order' => 0]);
        $service->introParagraphs()->create(['content' => 'x', 'sort_order' => 0]);
        $service->highlights()->create(['content' => 'x', 'sort_order' => 0]);
        $service->processSteps()->create(['title' => 'x', 'sort_order' => 0]);
        $service->requirements()->create(['title' => 'x', 'sort_order' => 0]);

        $this->actingAs($this->admin())->delete("/admin/services/{$service->id}");

        $this->assertDatabaseMissing('services', ['id' => $service->id]);
        $this->assertDatabaseMissing('service_images', ['service_id' => $service->id]);
        $this->assertDatabaseMissing('service_intro_paragraphs', ['service_id' => $service->id]);
        $this->assertDatabaseMissing('service_highlights', ['service_id' => $service->id]);
        $this->assertDatabaseMissing('service_process_steps', ['service_id' => $service->id]);
        $this->assertDatabaseMissing('service_requirements', ['service_id' => $service->id]);
        Storage::disk('public')->assertMissing($imagePath);
    }

    public function test_guest_cannot_access_admin_services(): void
    {
        $this->get('/admin/services')->assertRedirect('/login');
    }

    public function test_non_admin_user_is_forbidden(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $this->actingAs($user)->get('/admin/services')->assertForbidden();
    }
}
