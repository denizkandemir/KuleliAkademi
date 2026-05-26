<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'message' => 'İlk sayfa başarıyla açıldı.',
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/hakkımızda', function () {
    return Inertia::render('Hakkimizda');
});

Route::get('/egitimlerimiz', function () {
    return Inertia::render('Egitimlerimiz');
});

Route::get('/yurtdışıeğitim', function () {
    return Inertia::render('YurtDisindaEgitim');
});

Route::get('/üniversiteler', function () {
    return Inertia::render('Universities');
})->name('üniversiteler');

Route::get('/iletişim', function () {
    return Inertia::render('Iletisim');
});

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
    ]);
})->where('slug', '[A-Za-z0-9-]+');

// Instagram bio linkler sayfası
Route::get('/linkler', function () {
    return Inertia::render('Linkler', [
        'title' => 'Linkler | Kuleli Akademi',
        'description' => 'Kuleli Akademi eğitim başvuruları, Polonya üniversite danışmanlığı ve iletişim bağlantıları.',
    ]);
});

// Alias for English-speaking users
Route::redirect('/links', '/linkler');

// SEO Routes - robots.txt and sitemap.xml
Route::get('/robots.txt', 'App\Http\Controllers\RobotsController@index');
Route::get('/sitemap.xml', 'App\Http\Controllers\SitemapController@index');

// University detail page
Route::get('/universiteler/{slug}', function ($slug) {
    return Inertia::render('UniversityDetail', [
        'slug' => $slug,
    ]);
})->where('slug', '[A-Za-z0-9-]+');