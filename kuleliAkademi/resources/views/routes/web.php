<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AccommodationController;
use App\Http\Controllers\Admin\EducationOptionController;
use App\Http\Controllers\Admin\EducationVideoController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\FormController;
use App\Http\Controllers\Admin\FormSubmissionController as AdminFormSubmissionController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UniversityController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SitemapController;
use App\Models\EducationOption;
use App\Models\EducationVideo;
use App\Models\Form;
use App\Models\Service;
use App\Models\University;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'message' => 'İlk sayfa başarıyla açıldı.',
    ]);
});

Route::middleware('guest')->group(function (): void {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);

    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function (): void {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::post('/contact', [ContactMessageController::class, 'store'])->name('contact-messages.store.en');

Route::get('/hakkımızda', function () {
    return Inertia::render('Hakkimizda');
});

Route::get('/egitimlerimiz', function () {
    return Inertia::render('Egitimlerimiz', [
        'dbVideos' => EducationVideo::query()->where('is_active', true)->orderBy('sort_order')->get(),
    ]);
});

Route::get('/yurtdışıeğitim', function () {
    return Inertia::render('YurtDisindaEgitim', [
        'dbEducationOptions' => EducationOption::query()->where('is_active', true)->orderBy('sort_order')->get(),
    ]);
});

Route::get('/üniversiteler', function () {
    return Inertia::render('Universities', [
        'dbUniversities' => University::query()->where('is_active', true)->orderBy('sort_order')->get(),
    ]);
})->name('üniversiteler');

Route::get('/iletişim', function () {
    return Inertia::render('Iletisim');
});

Route::post('/iletişim', [ContactMessageController::class, 'store'])->name('contact-messages.store');

Route::get('/basvuru', [ApplicationController::class, 'create'])->name('applications.public.create');
Route::post('/basvuru', [ApplicationController::class, 'store'])->name('applications.public.store');
Route::post('/forms/{form:slug}/submit', [FormSubmissionController::class, 'store'])->name('forms.submissions.store');

$serviceSlugs = [
    'okul-basvurusu',
    'vize-basvurusu',
    'karsilama-ve-yerlesim',
    'konaklama-destegi',
    'oturum-izni',
    'sehir-ve-uyum-destegi',
];

foreach ($serviceSlugs as $serviceSlug) {
    Route::get("/hizmetler/{$serviceSlug}", function () use ($serviceSlug) {
        return Inertia::render('ServiceDetail', [
            'serviceSlug' => $serviceSlug,
        ]);
    });
}

Route::get('/hizmetler/{slug}', function ($slug) {
    return Inertia::render('ServiceDetail', [
        'serviceSlug' => $slug,
        'dbService' => Service::query()->where('slug', $slug)->first(),
    ]);
})->where('slug', '[A-Za-z0-9-]+');

Route::get('/linkler', function () {
    return Inertia::render('Linkler', [
        'title' => 'Linkler | Kuleli Akademi',
        'description' => 'Kuleli Akademi eğitim başvuruları, Polonya üniversite danışmanlığı ve iletişim bağlantıları.',
    ]);
});

Route::redirect('/links', '/linkler');

Route::get('/robots.txt', [RobotsController::class, 'index']);
Route::get('/sitemap.xml', [SitemapController::class, 'index']);

Route::get('/universiteler/{slug}', function ($slug) {
    return Inertia::render('UniversityDetail', [
        'slug' => $slug,
    ]);
})->where('slug', '[A-Za-z0-9-]+');

Route::prefix('admin')->as('admin.')->middleware(['auth', 'admin'])->group(function (): void {
    Route::redirect('/', '/admin/dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('services', ServiceController::class)->except(['show']);
    Route::resource('universities', UniversityController::class)->except(['show']);
    Route::resource('education-options', EducationOptionController::class)->except(['show']);
    Route::resource('accommodations', AccommodationController::class)->except(['show']);
    Route::resource('faqs', FaqController::class)->except(['show']);
    Route::resource('education-videos', EducationVideoController::class)->except(['show']);
    Route::resource('forms', FormController::class)->except(['show']);
    Route::resource('form-submissions', AdminFormSubmissionController::class)->only(['index', 'show', 'update', 'destroy']);
    Route::resource('applications', ApplicationController::class)->only(['index', 'update', 'destroy']);
    Route::resource('contact-messages', ContactMessageController::class)->only(['index', 'update', 'destroy']);
    Route::resource('notifications', NotificationController::class)->except(['show']);
    Route::resource('settings', SettingController::class)->except(['show']);
});
