<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\University;

class SitemapController extends Controller
{
    private const CANONICAL_BASE = 'https://akademikuleli.com';

    /**
     * Generate sitemap.xml for search engines
     * Includes all pages and service detail pages
     */
    public function index()
    {
        $routes = $this->getStaticRoutes();

        foreach ($this->extractServiceSlugs() as $service) {
            $routes[] = [
                'url' => "/hizmetler/{$service}",
                'priority' => 0.9,
                'changefreq' => 'weekly',
            ];
        }

        foreach ($this->extractUniversitySlugs() as $universitySlug) {
            $routes[] = [
                'url' => "/universiteler/{$universitySlug}",
                'priority' => 0.75,
                'changefreq' => 'monthly',
            ];
        }

        // Generate XML
        $xml = $this->generateSitemapXml($routes);

        return response($xml, 200)
            ->header('Content-Type', 'application/xml; charset=utf-8');
    }

    private function getStaticRoutes(): array
    {
        return [
            ['url' => '/', 'priority' => 1.0, 'changefreq' => 'weekly'],
            ['url' => '/hakkımızda', 'priority' => 0.8, 'changefreq' => 'monthly'],
            ['url' => '/egitimlerimiz', 'priority' => 0.9, 'changefreq' => 'weekly'],
            ['url' => '/üniversiteler', 'priority' => 0.85, 'changefreq' => 'weekly'],
            ['url' => '/yurtdışıeğitim', 'priority' => 0.8, 'changefreq' => 'monthly'],
            ['url' => '/iletişim', 'priority' => 0.7, 'changefreq' => 'monthly'],
            ['url' => '/linkler', 'priority' => 0.6, 'changefreq' => 'monthly'],
        ];
    }

    /**
     * Service detail pages are rendered from the database, so only active
     * services have a live page.
     */
    private function extractServiceSlugs(): array
    {
        return Service::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->pluck('slug')
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    /**
     * University detail pages resolve the static data first and fall back to
     * the database, so both sources produce live URLs.
     */
    private function extractUniversitySlugs(): array
    {
        $slugs = [];
        $file = base_path('resources/js/data/universitiesData.js');

        if (file_exists($file)) {
            $content = file_get_contents($file);
            preg_match_all('/"id":\s*"([^"]+)"/', $content, $matches);
            $slugs = $matches[1] ?? [];
        }

        $databaseSlugs = University::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->pluck('slug')
            ->filter()
            ->all();

        return array_values(array_unique(array_merge($slugs, $databaseSlugs)));
    }

    /**
     * Generate XML content for sitemap
     */
    private function generateSitemapXml($routes)
    {
        $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        $xml .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

        foreach ($routes as $route) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . htmlspecialchars(self::CANONICAL_BASE . $route['url']) . "</loc>\n";
            $xml .= "    <lastmod>" . date('Y-m-d') . "</lastmod>\n";
            $xml .= "    <changefreq>" . $route['changefreq'] . "</changefreq>\n";
            $xml .= "    <priority>" . $route['priority'] . "</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= "</urlset>";

        return $xml;
    }
}
