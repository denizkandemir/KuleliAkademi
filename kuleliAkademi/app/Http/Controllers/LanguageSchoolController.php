<?php

namespace App\Http\Controllers;

use App\Http\Resources\LanguageSchoolResource;
use App\Models\LanguageSchool;
use App\Models\LanguageSchoolCampus;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class LanguageSchoolController extends Controller
{
    public function index(Request $request): Response
    {
        // Slugged so filters.country always matches a countryOptions value on the frontend.
        $country = Str::slug($request->string('country')->toString()) ?: null;
        $city = Str::slug($request->string('city')->toString()) ?: null;

        $schools = LanguageSchool::query()
            ->active()
            ->byCountry($country)
            ->byCity($city)
            ->with([
                'campuses' => fn ($query) => $query->active(),
                'accommodations' => fn ($query) => $query->active(),
            ])
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return Inertia::render('LanguageSchoolsPage', [
            'languageSchools' => LanguageSchoolResource::collection($schools)->resolve($request),
            'countryOptions' => LanguageSchool::countryOptions(),
            'cityOptions' => LanguageSchoolCampus::cityOptions($country),
            'filters' => [
                'country' => $country,
                'city' => $city,
            ],
        ]);
    }
}
