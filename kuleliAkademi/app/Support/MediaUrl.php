<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaUrl
{
    /**
     * Resolve a stored image/icon reference into a browser-usable URL.
     *
     * Supports: absolute external URLs, existing `/storage/...` public paths
     * (legacy static assets), and relative paths on the `public` disk.
     */
    public static function resolve(?string $path): ?string
    {
        if (! filled($path)) {
            return null;
        }

        if (Str::startsWith($path, ['http://', 'https://', '/storage/'])) {
            return $path;
        }

        return Storage::disk('public')->url(ltrim($path, '/'));
    }

    /**
     * A "managed" path is a relative public-disk path this application
     * uploaded itself (e.g. "services/abc.webp"), as opposed to an external
     * URL or a legacy `/storage/...` asset shared by other pages.
     */
    public static function isManagedPath(?string $path): bool
    {
        return filled($path) && ! Str::startsWith($path, ['http://', 'https://', '/storage/']);
    }

    public static function deleteIfManaged(?string $path): void
    {
        if (! static::isManagedPath($path)) {
            return;
        }

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
