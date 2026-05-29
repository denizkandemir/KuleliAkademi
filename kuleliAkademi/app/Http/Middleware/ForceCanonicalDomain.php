<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ForceCanonicalDomain
{
    private const CANONICAL_HOST = 'akademikuleli.com';

    /**
     * Ensure every public request resolves on the canonical host.
     */
    public function handle(Request $request, Closure $next)
    {
        if (app()->environment(['local', 'testing'])) {
            return $next($request);
        }

        $host = strtolower($request->getHost());

        if (in_array($host, ['localhost', '127.0.0.1', '::1'], true)) {
            return $next($request);
        }

        if ($host !== self::CANONICAL_HOST) {
            $target = 'https://' . self::CANONICAL_HOST . $request->getRequestUri();

            return redirect()->to($target, 301);
        }

        return $next($request);
    }
}