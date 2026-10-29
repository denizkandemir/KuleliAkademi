<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormSubmissionUpdateRequest;
use App\Models\FormSubmission;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FormSubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/FormSubmissions/Index', [
            'submissions' => FormSubmission::query()
                ->with(['form:id,title,slug', 'answers'])
                ->latest('id')
                ->get(),
            'statusOptions' => [
                'new' => 'Yeni',
                'contacted' => 'İletişim Kuruldu',
                'in_progress' => 'İşlemde',
                'completed' => 'Tamamlandı',
                'cancelled' => 'İptal',
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(FormSubmission $formSubmission): Response
    {
        return Inertia::render('Admin/FormSubmissions/Show', [
            'submission' => $formSubmission->load(['form:id,title,slug', 'answers.field:id,label,name']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FormSubmission $formSubmission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormSubmissionUpdateRequest $request, FormSubmission $formSubmission): RedirectResponse
    {
        $formSubmission->update($request->validated());

        return back()->with('success', 'Form başvurusu güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FormSubmission $formSubmission): RedirectResponse
    {
        $formSubmission->delete();

        return back()->with('success', 'Form başvurusu silindi.');
    }
}
