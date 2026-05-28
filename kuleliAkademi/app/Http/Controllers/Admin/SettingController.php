<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingRequest;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Settings/Index', [
            'items' => Setting::query()->orderBy('group')->orderBy('key')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Settings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SettingRequest $request): RedirectResponse
    {
        Setting::query()->create($request->validated());

        return redirect()->route('admin.settings.index')->with('success', 'Ayar oluşturuldu.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting): Response
    {
        return Inertia::render('Admin/Settings/Edit', [
            'item' => $setting,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SettingRequest $request, Setting $setting): RedirectResponse
    {
        $setting->update($request->validated());

        return redirect()->route('admin.settings.index')->with('success', 'Ayar güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting): RedirectResponse
    {
        $setting->delete();

        return redirect()->route('admin.settings.index')->with('success', 'Ayar silindi.');
    }
}
