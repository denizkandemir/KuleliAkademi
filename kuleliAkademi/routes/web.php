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

Route::get('/iletişim', function () {
    return Inertia::render('Iletisim');
});