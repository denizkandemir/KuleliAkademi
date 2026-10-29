<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AdminPanelDataService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(AdminPanelDataService $adminPanelDataService): Response
    {
        return Inertia::render('Admin/Dashboard', $adminPanelDataService->dashboard());
    }
}
