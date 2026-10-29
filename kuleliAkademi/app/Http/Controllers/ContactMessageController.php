<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Notification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'message' => ['required', 'string'],
        ]);

        $message = ContactMessage::query()->create([
            ...$validated,
            'is_read' => false,
        ]);

        Notification::query()->create([
            'title' => 'Yeni iletişim mesajı',
            'message' => $message->name,
            'type' => 'contact_message',
            'related_type' => ContactMessage::class,
            'related_id' => $message->id,
        ]);

        return back()->with('success', 'Mesajınız başarıyla iletildi.');
    }

    public function index(): Response
    {
        return Inertia::render('Admin/ContactMessages/Index', [
            'messages' => ContactMessage::query()->latest()->get(),
        ]);
    }

    public function update(Request $request, ContactMessage $contact_message): RedirectResponse
    {
        $validated = $request->validate([
            'is_read' => ['required', 'boolean'],
        ]);

        $contact_message->update($validated);

        return back()->with('success', 'Mesaj durumu güncellendi.');
    }

    public function destroy(ContactMessage $contact_message): RedirectResponse
    {
        $contact_message->delete();

        return back()->with('success', 'Mesaj silindi.');
    }
}
