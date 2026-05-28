<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FormSubmission;
use App\Models\ContactMessage;
use App\Models\Notification;
use App\Models\Service;
use App\Models\University;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalServices' => Service::query()->count(),
                'totalUniversities' => University::query()->count(),
                'newFormSubmissions' => FormSubmission::query()->where('status', 'new')->count(),
                'unreadMessages' => ContactMessage::query()->where('is_read', false)->count(),
                'unreadNotifications' => Notification::query()->where('is_read', false)->count(),
            ],
        ]);
    }
}
