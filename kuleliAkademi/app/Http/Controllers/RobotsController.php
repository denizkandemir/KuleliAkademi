<?php

namespace App\Http\Controllers;

class RobotsController extends Controller
{
    private const CANONICAL_BASE = 'https://akademikuleli.com';

    /**
     * Generate robots.txt for search engine crawlers
     */
    public function index()
    {
        $content = '';
        $content .= "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Sitemap: " . self::CANONICAL_BASE . "/sitemap.xml\n";

        return response($content, 200)
            ->header('Content-Type', 'text/plain; charset=utf-8');
    }
}
