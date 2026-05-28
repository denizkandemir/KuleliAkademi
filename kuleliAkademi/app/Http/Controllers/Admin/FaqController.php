<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\FaqRequest;
use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Faqs/Index', [
            'items' => Faq::query()->orderBy('sort_order')->latest('id')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Faqs/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaqRequest $request): RedirectResponse
    {
        Faq::query()->create($request->validated());

        return redirect()->route('admin.faqs.index')->with('success', 'SSS kaydı oluşturuldu.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Faq $faq)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faq $faq): Response
    {
        return Inertia::render('Admin/Faqs/Edit', [
            'item' => $faq,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FaqRequest $request, Faq $faq): RedirectResponse
    {
        $faq->update($request->validated());

        return redirect()->route('admin.faqs.index')->with('success', 'SSS kaydı güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faq $faq): RedirectResponse
    {
        $faq->delete();

        return redirect()->route('admin.faqs.index')->with('success', 'SSS kaydı silindi.');
    }
}
