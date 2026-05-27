<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Generate sitemap.xml for search engines
     * Includes all pages and service detail pages
     */
    public function index()
    {
        // All static routes
        $routes = [
            ['url' => '/', 'priority' => 1.0, 'changefreq' => 'weekly'],
            ['url' => '/hakkımızda', 'priority' => 0.8, 'changefreq' => 'monthly'],
            ['url' => '/egitimlerimiz', 'priority' => 0.9, 'changefreq' => 'weekly'],
            ['url' => '/yurtdışıeğitim', 'priority' => 0.8, 'changefreq' => 'monthly'],
            ['url' => '/iletişim', 'priority' => 0.7, 'changefreq' => 'monthly'],
            ['url' => '/linkler', 'priority' => 0.6, 'changefreq' => 'monthly'],
        ];

        // Service detail routes
        $services = [
            'okul-basvurusu',
            'vize-basvurusu',
            'karsilama-ve-yerlesim',
            'konaklama-destegi',
            'oturum-izni',
            'sehir-ve-uyum-destegi',
        ];

        foreach ($services as $service) {
            $routes[] = [
                'url' => "/hizmetler/{$service}",
                'priority' => 0.9,
                'changefreq' => 'weekly',
            ];
        }

        // Generate XML
        $xml = $this->generateSitemapXml($routes);

        return response($xml, 200)
            ->header('Content-Type', 'application/xml; charset=utf-8');
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
            $xml .= "    <loc>" . htmlspecialchars(url($route['url'])) . "</loc>\n";
            $xml .= "    <lastmod>" . date('Y-m-d') . "</lastmod>\n";
            $xml .= "    <changefreq>" . $route['changefreq'] . "</changefreq>\n";
            $xml .= "    <priority>" . $route['priority'] . "</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= "</urlset>";

        return $xml;
    }
}
