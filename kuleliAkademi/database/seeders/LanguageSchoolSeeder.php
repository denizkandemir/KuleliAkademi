<?php

namespace Database\Seeders;

use App\Models\LanguageSchool;
use App\Models\LanguageSchoolAccommodation;
use App\Models\LanguageSchoolCampus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

/**
 * Partner language schools in Spain (source: Kuleli International internal guide, November 2026).
 *
 * Idempotent: rows are matched by slug / city / title and updated in place, so it is safe to re-run.
 * Run on its own: php artisan db:seed --class=LanguageSchoolSeeder
 *
 * Fee convention: `weekly_fee` is the price of ONE week of the school's standard intensive course
 * (20 lessons/hours per week), taken from the school's official price list. Longer bookings are
 * cheaper per week, so the public card labels it as a one-week price, never as a weekly rate.
 * Unknown prices stay null and the card shows "Fiyat teklif üzerine".
 */
class LanguageSchoolSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->schools() as $index => $data) {
            $school = LanguageSchool::query()->updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'name' => $data['name'],
                    'short_name' => $data['short_name'] ?? null,
                    'country' => 'İspanya',
                    'language' => 'İspanyolca',
                    'short_description' => $data['short_description'],
                    'website_url' => $data['website_url'],
                    'currency' => 'EUR',
                    'weekly_fee' => $data['weekly_fee'] ?? null,
                    'is_featured' => true,
                    'is_active' => true,
                    'sort_order' => $index + 1,
                ]
            );

            foreach ($data['campuses'] as $campusIndex => $campus) {
                LanguageSchoolCampus::query()->updateOrCreate(
                    [
                        'language_school_id' => $school->id,
                        'city_slug' => Str::slug($campus['city']),
                    ],
                    [
                        'city' => $campus['city'],
                        'weekly_fee' => $campus['weekly_fee'] ?? null,
                        'is_active' => true,
                        'sort_order' => $campusIndex + 1,
                    ]
                );
            }

            foreach ($data['accommodations'] as $accommodationIndex => $accommodation) {
                LanguageSchoolAccommodation::query()->updateOrCreate(
                    [
                        'language_school_id' => $school->id,
                        'title' => $accommodation['title'],
                    ],
                    [
                        'language_school_campus_id' => null,
                        'type' => $accommodation['type'],
                        'room_type' => $accommodation['room_type'] ?? null,
                        'meal_plan' => $accommodation['meal_plan'] ?? null,
                        'is_active' => true,
                        'sort_order' => $accommodationIndex + 1,
                    ]
                );
            }
        }
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function schools(): array
    {
        return [
            [
                'slug' => 'enforex',
                'name' => 'Enforex',
                'short_description' => 'İspanya\'da 11 şehirde yoğun kurslar, uzun dönem ve gap year programları, üniversiteye giriş (PAU / PCE) ve DELE / SIELE hazırlığı. 14–21 yaş gençlik programları.',
                'website_url' => 'https://www.enforex.com/',
                // Enforex price list not received yet: quoted on request.
                'weekly_fee' => null,
                'campuses' => array_map(fn (string $city): array => ['city' => $city], [
                    'Madrid', 'Barselona', 'Valensiya', 'Malaga', 'Granada', 'Salamanca',
                    'Sevilla', 'Alicante', 'Marbella', 'Cádiz', 'Tenerife',
                ]),
                'accommodations' => [],
            ],
            [
                'slug' => 'linguaschools',
                'name' => 'Linguaschools',
                'short_description' => 'Yetişkinlere odaklı okul. Yoğun ve uzun dönem kurslar, üniversiteye hazırlık (pathway) ve DELE hazırlığı.',
                'website_url' => 'https://www.linguaschools.com/spain',
                'weekly_fee' => null,
                // Intensive 20, 1 week (Linguaschools 2027 price lists). Other cities: quoted on request.
                'campuses' => [
                    ['city' => 'Barselona', 'weekly_fee' => 215],
                    ['city' => 'Madrid', 'weekly_fee' => 215],
                    ['city' => 'Granada', 'weekly_fee' => 205],
                    ['city' => 'San Sebastián', 'weekly_fee' => 260],
                    ['city' => 'Salamanca'],
                    ['city' => 'Malaga'],
                    ['city' => 'Valensiya'],
                ],
                'accommodations' => [
                    ['title' => 'Paylaşımlı daire, tek kişilik oda', 'type' => 'shared_apartment', 'room_type' => 'Tek kişilik'],
                    ['title' => 'Aile yanı, yarım pansiyon', 'type' => 'host_family', 'room_type' => 'Tek kişilik', 'meal_plan' => 'Yarım pansiyon'],
                ],
            ],
            [
                'slug' => 'hispania',
                'name' => 'Hispania',
                'short_name' => 'Hispania Valencia',
                'short_description' => 'Valensiya\'da 2002\'den beri; Instituto Cervantes ve EAQUALS akreditasyonlu. 10–14 kişilik sınıflar, vizeye uygun uzun dönem kurslar, PCE ve EBAU hazırlığı.',
                'website_url' => 'https://www.hispaniaeducation.com/',
                // Intensive Plus (20 hours), 1 week (Hispania 2026–27 price list).
                'weekly_fee' => 200,
                'campuses' => [
                    ['city' => 'Valensiya'],
                ],
                'accommodations' => [
                    ['title' => 'Öğrenci dairesi, bireysel oda', 'type' => 'shared_apartment', 'room_type' => 'Bireysel oda'],
                    ['title' => 'Aile yanı, bireysel oda, yarım pansiyon', 'type' => 'host_family', 'room_type' => 'Bireysel oda', 'meal_plan' => 'Yarım pansiyon'],
                ],
            ],
        ];
    }
}
