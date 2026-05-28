<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest;
use App\Models\Notification;
use App\Models\Service;
use App\Models\ServiceImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::query()
                ->with('coverImage')
                ->orderBy('sort_order')
                ->latest('id')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Services/Create');
    }

    public function store(ServiceRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated): void {
            $service = Service::query()->create([
                ...$validated,
                'slug' => $validated['slug'] ?: Str::slug($validated['title']),
                'is_active' => (bool) ($validated['is_active'] ?? true),
                'sort_order' => (int) ($validated['sort_order'] ?? 0),
            ]);

            if (! empty($validated['image_url'])) {
                ServiceImage::query()->updateOrCreate(
                    [
                        'service_id' => $service->id,
                        'image_url' => $validated['image_url'],
                    ],
                    [
                        'alt_text' => $service->title.' cover image',
                        'sort_order' => 0,
                        'is_cover' => true,
                    ]
                );
            }

            Notification::query()->create([
                'title' => 'Yeni hizmet oluşturuldu',
                'message' => $service->title,
                'type' => 'service',
                'related_type' => Service::class,
                'related_id' => $service->id,
            ]);
        });

        return redirect()->route('admin.services.index')->with('success', 'Hizmet oluşturuldu.');
    }

    public function edit(Service $service): Response
    {
        return Inertia::render('Admin/Services/Edit', [
            'service' => $service->load('images'),
        ]);
    }

    public function update(ServiceRequest $request, Service $service): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($service, $validated): void {
            $service->update([
                ...$validated,
                'slug' => $validated['slug'] ?: Str::slug($validated['title']),
                'is_active' => (bool) ($validated['is_active'] ?? false),
                'sort_order' => (int) ($validated['sort_order'] ?? 0),
            ]);

            if (! empty($validated['image_url'])) {
                ServiceImage::query()->updateOrCreate(
                    [
                        'service_id' => $service->id,
                        'image_url' => $validated['image_url'],
                    ],
                    [
                        'alt_text' => $service->title.' cover image',
                        'sort_order' => 0,
                        'is_cover' => true,
                    ]
                );

                ServiceImage::query()
                    ->where('service_id', $service->id)
                    ->where('image_url', '!=', $validated['image_url'])
                    ->update(['is_cover' => false]);
            }
        });

        return redirect()->route('admin.services.index')->with('success', 'Hizmet güncellendi.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()->route('admin.services.index')->with('success', 'Hizmet silindi.');
    }
}
