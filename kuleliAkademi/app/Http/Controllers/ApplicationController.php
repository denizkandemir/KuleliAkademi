<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Notification;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Application/Create', [
            'services' => Service::query()->where('is_active', true)->orderBy('sort_order')->get(['id', 'title', 'slug']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'service_id' => ['nullable', 'exists:services,id'],
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'message' => ['nullable', 'string'],
        ]);

        Application::query()->create([
            ...$validated,
            'status' => 'new',
        ]);

        Notification::query()->create([
            'title' => 'Yeni başvuru alındı',
            'message' => $validated['full_name'] ?? null,
            'type' => 'application',
            'related_type' => Application::class,
        ]);

        return back()->with('success', 'Başvurunuz başarıyla alındı. En kısa sürede dönüş yapılacaktır.');
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Applications/Index', [
            'applications' => Application::query()
                ->with('service:id,title')
                ->latest()
                ->get(),
            'statusOptions' => $this->statusOptions(),
        ]);
    }

    public function update(Request $request, Application $application): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:new,contacted,in_progress,completed,cancelled'],
        ]);

        $application->update($validated);

        return back()->with('success', 'Başvuru durumu güncellendi.');
    }

    public function destroy(Application $application): RedirectResponse
    {
        $application->delete();

        return back()->with('success', 'Başvuru silindi.');
    }

    private function statusOptions(): array
    {
        return [
            'new' => 'Yeni',
            'contacted' => 'İletişim Kuruldu',
            'in_progress' => 'İşlemde',
            'completed' => 'Tamamlandı',
            'cancelled' => 'İptal',
        ];
    }
}
