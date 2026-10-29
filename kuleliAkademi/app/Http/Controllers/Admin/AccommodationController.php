<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\AccommodationRequest;
use App\Http\Controllers\Controller;
use App\Models\Accommodation;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AccommodationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Accommodations/Index', [
            'items' => Accommodation::query()->orderBy('sort_order')->latest('id')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Accommodations/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AccommodationRequest $request): RedirectResponse
    {
        Accommodation::query()->create($request->validated());

        return redirect()->route('admin.accommodations.index')->with('success', 'Konaklama kaydı oluşturuldu.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Accommodation $accommodation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Accommodation $accommodation): Response
    {
        return Inertia::render('Admin/Accommodations/Edit', [
            'item' => $accommodation,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AccommodationRequest $request, Accommodation $accommodation): RedirectResponse
    {
        $accommodation->update($request->validated());

        return redirect()->route('admin.accommodations.index')->with('success', 'Konaklama kaydı güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Accommodation $accommodation): RedirectResponse
    {
        $accommodation->delete();

        return redirect()->route('admin.accommodations.index')->with('success', 'Konaklama kaydı silindi.');
    }
}
