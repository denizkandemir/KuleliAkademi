<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EducationOptionRequest;
use App\Http\Controllers\Controller;
use App\Models\EducationOption;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EducationOptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/EducationOptions/Index', [
            'items' => EducationOption::query()->orderBy('sort_order')->latest('id')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/EducationOptions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EducationOptionRequest $request): RedirectResponse
    {
        EducationOption::query()->create($request->validated());

        return redirect()->route('admin.education-options.index')->with('success', 'Opsiyon oluşturuldu.');
    }

    /**
     * Display the specified resource.
     */
    public function show(EducationOption $educationOption)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EducationOption $educationOption): Response
    {
        return Inertia::render('Admin/EducationOptions/Edit', [
            'item' => $educationOption,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EducationOptionRequest $request, EducationOption $educationOption): RedirectResponse
    {
        $educationOption->update($request->validated());

        return redirect()->route('admin.education-options.index')->with('success', 'Opsiyon güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EducationOption $educationOption): RedirectResponse
    {
        $educationOption->delete();

        return redirect()->route('admin.education-options.index')->with('success', 'Opsiyon silindi.');
    }
}
