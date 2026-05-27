<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class RobotsController extends Controller
{
    /**
     * Generate robots.txt for search engine crawlers
     */
    public function index()
    {
        $content = "# Kuleli Akademi - robots.txt\n";
        $content .= "# Generated automatically for SEO optimization\n\n";

        $content .= "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Allow: /hizmetler/\n";
        $content .= "Allow: /egitimlerimiz\n";
        $content .= "Allow: /hakkımızda\n";
        $content .= "Allow: /iletişim\n";
        $content .= "Allow: /yurtdışıeğitim\n\n";

        // Disallow specific paths that should not be indexed
        $content .= "Disallow: /admin\n";
        $content .= "Disallow: /private\n";
        $content .= "Disallow: /*.pdf$\n";
        $content .= "Disallow: /*?*sort=\n";
        $content .= "Disallow: /*?*filter=\n\n";

        // Crawl delay for bots
        $content .= "Crawl-delay: 1\n\n";

        // Sitemap location
        $content .= "Sitemap: " . url('/sitemap.xml') . "\n";

        return response($content, 200)
            ->header('Content-Type', 'text/plain; charset=utf-8');
    }
}
