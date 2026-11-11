<?php

namespace App\Support;

/**
 * Programs a visitor can pick on the public application and contact forms.
 *
 * Keys must stay in sync with `studyPrograms` in resources/js/data/destinationsData.js.
 */
final class StudyPrograms
{
    public const PROGRAMS = [
        'poland_university' => 'Polonya · Üniversite',
        'spain_language' => 'İspanya · Dil okulu',
        'spain_foundation' => 'İspanya · Üniversiteye hazırlık',
        'malta_language' => 'Malta · İngilizce dil okulu (ön kayıt)',
        'aliaga_courses' => 'Aliağa · Yüz yüze dersler',
    ];

    /**
     * @return list<string>
     */
    public static function keys(): array
    {
        return array_keys(self::PROGRAMS);
    }

    public static function label(?string $key): ?string
    {
        return $key === null ? null : (self::PROGRAMS[$key] ?? null);
    }

    /**
     * Validation rule for an optional program field.
     *
     * @return list<string>
     */
    public static function rule(): array
    {
        return ['nullable', 'string', 'in:'.implode(',', self::keys())];
    }
}
