<?php

use App\Http\Middleware\ForceCanonicalDomain;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware([ForceCanonicalDomain::class])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Home', [
            'message' => 'İlk sayfa başarıyla açıldı.',
        ]);
    });

    Route::redirect('/about', '/hakkımızda', 301);
    Route::redirect('/contact', '/iletişim', 301);
    Route::redirect('/links', '/linkler', 301);
    Route::redirect('/universities', '/üniversiteler', 301);
    Route::redirect('/hizmetler', '/egitimlerimiz', 301);

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

    Route::redirect('/hizmetler/konaklama-destegi', '/hizmetler/konaklama-danismanligi', 301);
    Route::redirect('/hizmetler/sehir-ve-uyum-destegi', '/hizmetler/sehir-ve-ogrenci-hayati-rehberligi', 301);

    $serviceSlugs = [
        'okul-basvurusu',
        'vize-basvurusu',
        'karsilama-ve-yerlesim',
        'konaklama-danismanligi',
        'oturum-izni',
        'sehir-ve-ogrenci-hayati-rehberligi',
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
        return Inertia::render('Linkler');
    });

    // SEO Routes - robots.txt and sitemap.xml
    Route::get('/robots.txt', 'App\Http\Controllers\RobotsController@index');
    Route::get('/sitemap.xml', 'App\Http\Controllers\SitemapController@index');

    // University detail page
    Route::get('/universiteler/{slug}', function ($slug) {
        return Inertia::render('UniversityDetail', [
            'slug' => $slug,
        ]);
    })->where('slug', '[A-Za-z0-9-]+');
});