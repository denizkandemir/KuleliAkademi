<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EducationVideoRequest;
use App\Http\Controllers\Controller;
use App\Models\EducationVideo;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EducationVideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/EducationVideos/Index', [
            'items' => EducationVideo::query()->orderBy('sort_order')->latest('id')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/EducationVideos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EducationVideoRequest $request): RedirectResponse
    {
        EducationVideo::query()->create($request->validated());

        return redirect()->route('admin.education-videos.index')->with('success', 'Eğitim videosu oluşturuldu.');
    }

    /**
     * Display the specified resource.
     */
    public function show(EducationVideo $educationVideo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EducationVideo $educationVideo): Response
    {
        return Inertia::render('Admin/EducationVideos/Edit', [
            'item' => $educationVideo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EducationVideoRequest $request, EducationVideo $educationVideo): RedirectResponse
    {
        $educationVideo->update($request->validated());

        return redirect()->route('admin.education-videos.index')->with('success', 'Eğitim videosu güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EducationVideo $educationVideo): RedirectResponse
    {
        $educationVideo->delete();

        return redirect()->route('admin.education-videos.index')->with('success', 'Eğitim videosu silindi.');
    }
}
