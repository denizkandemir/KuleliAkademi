<?php

namespace App\Http\Resources;

use App\Models\LanguageSchool;
use App\Models\LanguageSchoolAccommodation;
use App\Models\LanguageSchoolCampus;
use App\Support\MediaUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shapes a LanguageSchool (with active campuses and accommodations eager loaded)
 * into the prop structure the public /dil-okullari page consumes.
 *
 * @mixin LanguageSchool
 */
class LanguageSchoolResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'short_name' => $this->short_name,
            'country' => $this->country,
            'country_slug' => $this->country_slug,
            'language' => $this->language,
            'short_description' => $this->short_description,
            'website_url' => $this->website_url,
            'application_url' => $this->application_url,
            'main_image_url' => MediaUrl::resolve($this->main_image_url),
            'logo_url' => MediaUrl::resolve($this->logo_url),
            'is_featured' => $this->is_featured,
            'currency' => $this->currency,
            'fees' => $this->fees(),

            'campuses' => $this->campuses->map(fn (LanguageSchoolCampus $campus): array => [
                'id' => $campus->id,
                'name' => $campus->name,
                'city' => $campus->city,
                'city_slug' => $campus->city_slug,
                'address' => $campus->address,
                'fees' => collect(LanguageSchoolCampus::FEE_PERIODS)
                    ->keys()
                    ->mapWithKeys(fn (string $period): array => [$period => $campus->effectiveFee($period)])
                    ->all(),
            ])->values(),

            'accommodations' => $this->accommodations->map(fn (LanguageSchoolAccommodation $accommodation): array => [
                'id' => $accommodation->id,
                // null = available at every campus
                'campus_id' => $accommodation->language_school_campus_id,
                'title' => $accommodation->title,
                'type' => $accommodation->type,
                'type_label' => $accommodation->typeLabel(),
                'room_type' => $accommodation->room_type,
                'meal_plan' => $accommodation->meal_plan,
                'short_description' => $accommodation->short_description,
                'image_url' => MediaUrl::resolve($accommodation->image_url),
                'fees' => $accommodation->fees(),
            ])->values(),
        ];
    }
}
