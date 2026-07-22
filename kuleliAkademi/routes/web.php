<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AccommodationController;
use App\Http\Controllers\Admin\DocumentController;
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
use App\Http\Resources\ServiceResource;
use App\Models\EducationOption;
use App\Models\EducationVideo;
use App\Models\Form;
use App\Models\Service;
use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $services = Service::query()
        ->with('homepageImage')
        ->where('is_active', true)
        ->orderBy('sort_order')
        ->orderBy('id')
        ->get()
        ->map(fn (Service $service): array => [
            'slug' => $service->slug,
            'title' => $service->title,
            'description' => $service->short_description,
            'image' => $service->resolvedCoverImageUrl(),
            'buttonText' => $service->homepage_button_text ?: 'Detayları Gör',
            'objectPosition' => optional($service->homepageImage)->object_position,
            'href' => "/hizmetler/{$service->slug}",
        ]);

    return Inertia::render('Home', [
        'message' => 'İlk sayfa başarıyla açıldı.',
        'dbServices' => $services,
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

Route::get('/üniversiteler', function (Request $request) {
    $countryOptions = University::countryOptions();
    $defaultCountry = University::normalizeCountrySlug(University::DEFAULT_COUNTRY);

    $selectedCountry = University::normalizeCountrySlug(
        $request->input('country', University::DEFAULT_COUNTRY)
    );

    $availableCountrySlugs = array_column($countryOptions, 'value');

    if (! in_array($selectedCountry, $availableCountrySlugs, true)) {
        $selectedCountry = $defaultCountry;
    }

    $universities = University::query()
        ->with('coverImage')
        ->where('is_active', true)
        ->byCountry($selectedCountry)
        ->orderBy('sort_order')
        ->orderBy('id')
        ->get();

    $selectedCountryOption = collect($countryOptions)->firstWhere('value', $selectedCountry);

    return Inertia::render('Universities', [
        'dbUniversities' => $universities,
        'countryOptions' => $countryOptions,
        'selectedCountry' => $selectedCountry,
        'selectedCountryLabel' => $selectedCountryOption['label'] ?? University::DEFAULT_COUNTRY,
        'defaultCountry' => University::DEFAULT_COUNTRY_SLUG,
    ]);
})->name('üniversiteler');

Route::get('/iletişim', function () {
    return Inertia::render('Iletisim');
});

Route::post('/iletişim', [ContactMessageController::class, 'store'])->name('contact-messages.store');

Route::get('/basvuru', [ApplicationController::class, 'create'])->name('applications.public.create');
Route::post('/basvuru', [ApplicationController::class, 'store'])->name('applications.public.store');
Route::post('/forms/{form:slug}/submit', [FormSubmissionController::class, 'store'])->name('forms.submissions.store');

Route::get('/hizmetler/{slug}', function (string $slug) {
    $service = Service::query()
        ->where('slug', $slug)
        ->where('is_active', true)
        ->with(['images', 'introParagraphs', 'highlights', 'processSteps', 'requirements'])
        ->first();

    $services = Service::query()
        ->where('is_active', true)
        ->orderBy('sort_order')
        ->orderBy('id')
        ->get(['id', 'slug', 'title']);

    return Inertia::render('ServiceDetail', [
        'serviceSlug' => $slug,
        'service' => $service ? new ServiceResource($service) : null,
        'services' => $services,
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
        'dbUniversity' => University::query()->with('images')->where('slug', $slug)->first(),
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
    Route::get('/documents', [DocumentController::class, 'index'])->name('documents');
    Route::resource('settings', SettingController::class)->except(['show']);
});
