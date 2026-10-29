<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UniversityStoreRequest;
use App\Http\Requests\UniversityUpdateRequest;
use App\Models\University;
use App\Models\UniversityImage;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class UniversityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $countryOptions = University::countryOptions();
        $defaultCountry = University::normalizeCountrySlug(University::DEFAULT_COUNTRY);

        $selectedCountry = University::normalizeCountrySlug(
            $request->input('country', University::DEFAULT_COUNTRY)
        );

        $availableCountrySlugs = array_column($countryOptions, 'value');

        if (! in_array($selectedCountry, $availableCountrySlugs, true)) {
            $selectedCountry = $defaultCountry;
        }

        $universitiesQuery = University::query()
            ->with('coverImage')
            ->byCountry($selectedCountry)
            ->orderBy('sort_order')
            ->orderBy('id');

        return Inertia::render('Admin/Universities/Index', [
            'universities' => $universitiesQuery->get(),
            'countryOptions' => $countryOptions,
            'selectedCountry' => $selectedCountry,
            'defaultCountry' => University::DEFAULT_COUNTRY,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Universities/Create', [
            'countryOptions' => University::countryOptions(),
            'defaultCountry' => University::DEFAULT_COUNTRY,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UniversityStoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated): void {
            $university = University::query()->create($this->extractUniversityData($validated));
            $this->syncImages($university, $validated['images'] ?? []);
        });

        return redirect()->route('admin.universities.index')->with('success', 'Üniversite oluşturuldu.');
    }

    /**
     * Display the specified resource.
     */
    public function show(University $university)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(University $university): Response
    {
        return Inertia::render('Admin/Universities/Edit', [
            'university' => $university->load('images'),
            'countryOptions' => University::countryOptions(),
            'defaultCountry' => University::DEFAULT_COUNTRY,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UniversityUpdateRequest $request, University $university): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($university, $validated): void {
            $university->update($this->extractUniversityData($validated));
            $this->syncImages($university, $validated['images'] ?? []);
        });

        return redirect()->route('admin.universities.index')->with('success', 'Üniversite güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(University $university): RedirectResponse
    {
        $university->delete();

        return back()->with('success', 'Üniversite silindi.');
    }

    private function extractUniversityData(array $validated): array
    {
        return [
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'short_name' => $validated['short_name'] ?? null,
            'country' => University::normalizeCountry($validated['country'] ?? null),
            'city' => $validated['city'] ?? null,
            'short_description' => $validated['short_description'] ?? null,
            'description' => $validated['description'] ?? null,
            'website_url' => $validated['website_url'] ?? null,
            'application_url' => $validated['application_url'] ?? null,
            'main_image_url' => $validated['main_image_url'] ?? null,
            'logo_url' => $validated['logo_url'] ?? null,
            'tuition_fee' => $validated['tuition_fee'] ?? null,
            'currency' => $validated['currency'] ?? null,
            'duration' => $validated['duration'] ?? null,
            'language' => $validated['language'] ?? null,
            'ranking' => $validated['ranking'] ?? null,
            'is_featured' => (bool) ($validated['is_featured'] ?? false),
            'is_active' => (bool) ($validated['is_active'] ?? true),
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
        ];
    }

    private function syncImages(University $university, array $images): void
    {
        if ($images === []) {
            return;
        }

        $currentIds = [];
        $coverPicked = false;

        foreach ($images as $index => $image) {
            if (empty($image['image_url'])) {
                continue;
            }

            $item = UniversityImage::query()->updateOrCreate(
                [
                    'university_id' => $university->id,
                    'image_url' => $image['image_url'],
                ],
                [
                    'alt_text' => $image['alt_text'] ?? null,
                    'sort_order' => (int) ($image['sort_order'] ?? $index),
                    'is_cover' => false,
                ]
            );

            $currentIds[] = $item->id;

            if (! $coverPicked && ! empty($image['is_cover'])) {
                $coverPicked = true;
                UniversityImage::query()->where('university_id', $university->id)->update(['is_cover' => false]);
                $item->update(['is_cover' => true]);
                $university->update(['main_image_url' => $item->image_url]);
            }
        }

        if ($currentIds !== []) {
            UniversityImage::query()
                ->where('university_id', $university->id)
                ->whereNotIn('id', $currentIds)
                ->delete();
        }
    }
}
