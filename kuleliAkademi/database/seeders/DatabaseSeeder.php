<?php

namespace Database\Seeders;

use App\Models\EducationVideo;
use App\Models\Faq;
use App\Models\Form;
use App\Models\FormField;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@kuleliakademi.com'],
            [
                'name' => 'Kuleli Akademi Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        User::query()->updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'role' => 'user',
            ]
        );

        Service::query()->updateOrCreate(
            ['slug' => 'okul-basvurusu'],
            [
                'title' => 'Okul Başvurusu',
                'short_description' => 'Üniversite başvuru evrak ve süreç danışmanlığı.',
                'description' => 'Adayın profil analizinden kabul mektubuna kadar başvuru süreç yönetimi.',
                'image_url' => 'https://res.cloudinary.com/demo/image/upload/v1/kuleli/services/okul-basvurusu.webp',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        Faq::query()->updateOrCreate(
            ['question' => 'Polonya öğrenci vizesi ne kadar sürer?'],
            [
                'page' => 'yurtdisiegitim',
                'answer' => 'Dosya yoğunluğuna göre değişmekle birlikte ortalama 2-6 hafta aralığında sonuçlanır.',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        EducationVideo::query()->updateOrCreate(
            ['slug' => 'polonya-egitim-rehberi'],
            [
                'title' => 'Polonya Eğitim Rehberi',
                'description' => 'Polonya üniversite başvuru sürecine genel bakış.',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'thumbnail_url' => 'https://res.cloudinary.com/demo/image/upload/v1/kuleli/videos/polonya-egitim-rehberi.webp',
                'source' => 'youtube',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        $form = Form::query()->updateOrCreate(
            ['slug' => 'genel-basvuru-formu'],
            [
                'title' => 'Genel Başvuru Formu',
                'description' => 'Aday bilgilerini hızlıca toplamak için temel form.',
                'is_active' => true,
            ]
        );

        FormField::query()->updateOrCreate(
            ['form_id' => $form->id, 'name' => 'full_name'],
            [
                'label' => 'Ad Soyad',
                'type' => 'text',
                'placeholder' => 'Ad Soyad',
                'options' => null,
                'is_required' => true,
                'sort_order' => 1,
            ]
        );

        FormField::query()->updateOrCreate(
            ['form_id' => $form->id, 'name' => 'email'],
            [
                'label' => 'E-posta',
                'type' => 'email',
                'placeholder' => 'ornek@eposta.com',
                'options' => null,
                'is_required' => true,
                'sort_order' => 2,
            ]
        );

        $this->call(UniversitySeeder::class);
    }
}
