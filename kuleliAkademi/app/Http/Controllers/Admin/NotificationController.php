<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\NotificationUpdateRequest;
use App\Models\Notification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Notifications/Index', [
            'items' => Notification::query()->latest('id')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Notifications/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'message' => ['nullable', 'string'],
            'type' => ['nullable', 'string', 'max:255'],
        ]);

        Notification::query()->create($validated);

        return redirect()->route('admin.notifications.index')->with('success', 'Bildirim oluşturuldu.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notification $notification): Response
    {
        return Inertia::render('Admin/Notifications/Edit', [
            'item' => $notification,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(NotificationUpdateRequest $request, Notification $notification): RedirectResponse
    {
        $notification->update($request->validated());

        return redirect()->route('admin.notifications.index')->with('success', 'Bildirim güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification): RedirectResponse
    {
        $notification->delete();

        return back()->with('success', 'Bildirim silindi.');
    }
}
