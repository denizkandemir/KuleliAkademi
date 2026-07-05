<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AdminPanelDataService;
use Inertia\Inertia;
use Inertia\Response;

class DocumentController extends Controller
{
    public function index(AdminPanelDataService $adminPanelDataService): Response
    {
        return Inertia::render('Admin/Documents/Index', [
            'documents' => $adminPanelDataService->documents(),
            'documentTypeOptions' => $adminPanelDataService->documentTypeOptions(),
            'documentStatusOptions' => $adminPanelDataService->documentStatusOptions(),
        ]);
    }
}
