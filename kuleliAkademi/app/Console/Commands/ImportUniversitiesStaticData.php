<?php

namespace App\Console\Commands;

use App\Models\University;
use App\Models\UniversityImage;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

/**
 * Imports the static university catalogue (exported from
 * resources/js/data/universitiesData.js via
 * scripts/export-universities-for-database.mjs into
 * database/data/universities.import.json) into the `universities` and
 * `university_images` tables.
 *
 * Safe by construction:
 * - Defaults to a read-only dry run; nothing is written unless --apply is given.
 * - --apply still asks for interactive confirmation before writing.
 * - Upserts by slug only; never deletes or truncates anything.
 * - Existing is_active / is_featured / sort_order are preserved on updates.
 * - Each university is processed in its own transaction so one failure can't
 *   leave a half-written record, and does not abort the rest of the import.
 */
class ImportUniversitiesStaticData extends Command
{
    protected $signature = 'universities:import-static-data {--apply : Actually write to the database. Without this flag the command only reports what it would do.}';

    protected $description = 'Dry-run (default) or apply (--apply) idempotent import of the static university catalogue into universities/university_images.';

    private const JSON_RELATIVE_PATH = 'database/data/universities.import.json';

    public function handle(): int
    {
        $jsonPath = base_path(self::JSON_RELATIVE_PATH);

        $this->printConnectionInfo($jsonPath);

        if (! File::exists($jsonPath)) {
            $this->error('Kaynak JSON bulunamadı. Önce çalıştırın: node scripts/export-universities-for-database.mjs');

            return self::FAILURE;
        }

        $records = json_decode(File::get($jsonPath), true, flags: JSON_THROW_ON_ERROR);

        if (! is_array($records) || $records === []) {
            $this->error('Kaynak JSON boş veya geçersiz.');

            return self::FAILURE;
        }

        $report = $this->buildReport($records);
        $this->printReport($report);

        if (! $this->option('apply')) {
            $this->newLine();
            $this->info('Dry-run tamamlandı. Gerçek yazma işlemi yapılmadı. Uygulamak için --apply ekleyin.');

            return self::SUCCESS;
        }

        $this->newLine();
        $this->warn('--apply verildi: bu işlem veritabanına GERÇEK değişiklikler yazacak.');

        if (! $this->confirm('Devam etmek istediğinizden emin misiniz?', false)) {
            $this->info('İşlem iptal edildi. Hiçbir değişiklik yapılmadı.');

            return self::SUCCESS;
        }

        return $this->applyImport($records);
    }

    private function printConnectionInfo(string $jsonPath): void
    {
        $connection = config('database.default');

        $this->info('== Bağlantı bilgileri ==');
        $this->line('APP_ENV      : '.app()->environment());
        $this->line('DB_CONNECTION: '.$connection);
        $this->line('DB_HOST      : '.config("database.connections.{$connection}.host"));
        $this->line('DB_DATABASE  : '.config("database.connections.{$connection}.database"));
        $this->line('JSON path    : '.self::JSON_RELATIVE_PATH.' ('.(File::exists($jsonPath) ? 'mevcut' : 'BULUNAMADI').')');
        $this->newLine();
    }

    /**
     * @param  array<int, array<string, mixed>>  $records
     * @return array<string, mixed>
     */
    private function buildReport(array $records): array
    {
        $existingSlugs = University::query()->pluck('id', 'slug');

        $slugs = array_map(fn (array $r): string => (string) ($r['slug'] ?? ''), $records);
        $duplicateSlugs = array_diff_key(array_count_values($slugs), array_flip(array_unique($slugs)));
        $invalid = [];

        foreach ($records as $index => $record) {
            if (empty($record['slug']) || empty($record['name'])) {
                $invalid[] = "index {$index}: slug veya name eksik";
            }
        }

        $toCreate = [];
        $toUpdate = [];
        foreach ($records as $record) {
            $slug = $record['slug'] ?? null;
            if (! $slug) {
                continue;
            }
            if ($existingSlugs->has($slug)) {
                $toUpdate[] = $slug;
            } else {
                $toCreate[] = $slug;
            }
        }

        $withMainImage = collect($records)->filter(fn (array $r) => ! empty($r['main_image_url']))->count();
        $withoutMainImage = collect($records)->filter(fn (array $r) => empty($r['main_image_url']))->pluck('slug')->all();
        $withGallery = collect($records)->filter(fn (array $r) => ! empty($r['gallery']))->count();

        $imageRowsPlanned = 0;
        foreach ($records as $record) {
            $main = $record['main_image_url'] ?? null;
            $gallery = array_values(array_unique(array_filter($record['gallery'] ?? [])));
            if ($main) {
                $imageRowsPlanned++;
            }
            foreach ($gallery as $url) {
                if ($url !== $main) {
                    $imageRowsPlanned++;
                }
            }
        }

        return [
            'total' => count($records),
            'unique_slugs' => count(array_unique($slugs)),
            'duplicate_slugs' => $duplicateSlugs,
            'invalid' => $invalid,
            'existing_in_db' => $existingSlugs->count(),
            'to_create' => $toCreate,
            'to_update' => $toUpdate,
            'with_main_image' => $withMainImage,
            'without_main_image' => $withoutMainImage,
            'with_gallery' => $withGallery,
            'image_rows_planned' => $imageRowsPlanned,
        ];
    }

    /**
     * @param  array<string, mixed>  $report
     */
    private function printReport(array $report): void
    {
        $this->info('== Dry-run raporu ==');
        $this->line("Kaynakta bulunan toplam üniversite: {$report['total']}");
        $this->line("Benzersiz slug sayısı: {$report['unique_slugs']}");
        $this->line('Duplicate slug: '.($report['duplicate_slugs'] === [] ? 'yok' : implode(', ', array_keys($report['duplicate_slugs']))));
        $this->line('Geçersiz kayıtlar: '.($report['invalid'] === [] ? 'yok' : implode('; ', $report['invalid'])));
        $this->line("DB'de zaten bulunan üniversite sayısı: {$report['existing_in_db']}");
        $this->line('Oluşturulacak üniversite sayısı: '.count($report['to_create']));
        $this->line('Güncellenecek üniversite sayısı: '.count($report['to_update']));
        $this->line("Ana görseli bulunan üniversite sayısı: {$report['with_main_image']}");
        $this->line('Ana görseli bulunmayan üniversiteler: '.($report['without_main_image'] === [] ? 'yok' : implode(', ', $report['without_main_image'])));
        $this->line("Galerisi bulunan üniversite sayısı: {$report['with_gallery']}");
        $this->line("Oluşturulacak/upsert edilecek image kaydı sayısı: {$report['image_rows_planned']}");
    }

    /**
     * @param  array<int, array<string, mixed>>  $records
     */
    private function applyImport(array $records): int
    {
        $created = [];
        $updated = [];
        $failed = [];
        $imageRows = 0;

        foreach ($records as $record) {
            $slug = $record['slug'] ?? null;

            if (! $slug) {
                continue;
            }

            try {
                DB::transaction(function () use ($record, $slug, &$created, &$updated, &$imageRows): void {
                    $existing = University::query()->where('slug', $slug)->first();
                    $isNew = $existing === null;

                    $fields = [
                        'name' => $record['name'],
                        'slug' => $slug,
                        'short_name' => $record['short_name'] ?? null,
                        'country' => $record['country'] ?? 'Poland',
                        'city' => $record['city'] ?? null,
                        'description' => $record['description'] ?? null,
                        'short_description' => $record['short_description'] ?? null,
                        'website_url' => $record['website_url'] ?? null,
                        'application_url' => $record['application_url'] ?? null,
                        'main_image_url' => $record['main_image_url'] ?? null,
                        'language' => $record['language'] ?? null,
                        'ranking' => $record['ranking'] ?? null,
                        'tuition_fee' => $record['tuition_fee'] ?? null,
                    ];

                    if ($isNew) {
                        $fields['is_active'] = true;
                        $fields['is_featured'] = false;
                        $fields['sort_order'] = (int) ($record['sort_order'] ?? 0);
                    }

                    $university = University::query()->updateOrCreate(['slug' => $slug], $fields);

                    if ($isNew) {
                        $created[] = $slug;
                    } else {
                        $updated[] = $slug;
                    }

                    $mainUrl = $record['main_image_url'] ?? null;
                    $gallery = array_values(array_unique(array_filter($record['gallery'] ?? [])));

                    if ($mainUrl) {
                        UniversityImage::query()->updateOrCreate(
                            ['university_id' => $university->id, 'image_url' => $mainUrl],
                            [
                                'alt_text' => "{$university->name} ana görseli",
                                'sort_order' => 0,
                                'is_cover' => true,
                            ]
                        );
                        $imageRows++;

                        UniversityImage::query()
                            ->where('university_id', $university->id)
                            ->where('image_url', '!=', $mainUrl)
                            ->update(['is_cover' => false]);
                    }

                    $order = 1;
                    foreach ($gallery as $url) {
                        if ($url === $mainUrl) {
                            continue;
                        }

                        UniversityImage::query()->updateOrCreate(
                            ['university_id' => $university->id, 'image_url' => $url],
                            [
                                'alt_text' => "{$university->name} galeri görseli {$order}",
                                'sort_order' => $order,
                                'is_cover' => false,
                            ]
                        );
                        $imageRows++;
                        $order++;
                    }
                });
            } catch (\Throwable $e) {
                $failed[] = "{$slug}: {$e->getMessage()}";
            }
        }

        $this->newLine();
        $this->info('== Import sonucu ==');
        $this->line('Oluşturulan üniversite: '.count($created).($created ? ' ('.implode(', ', $created).')' : ''));
        $this->line('Güncellenen üniversite: '.count($updated));
        $this->line("İşlenen image kaydı: {$imageRows}");
        $this->line('Hatalı kayıtlar: '.($failed === [] ? 'yok' : implode('; ', $failed)));
        $this->line('Not: hatalı kayıtlar diğer üniversitelerin işlenmesini engellemedi (her üniversite kendi transaction\'ında işlendi).');

        $this->runPostImportChecks();

        return $failed === [] ? self::SUCCESS : self::FAILURE;
    }

    private function runPostImportChecks(): void
    {
        $this->newLine();
        $this->info('== Salt okunur kontroller ==');

        $universityCount = DB::table('universities')->count();
        $this->line("Toplam üniversite: {$universityCount}");

        $duplicateSlugs = DB::table('universities')
            ->select('slug', DB::raw('COUNT(*) as duplicate_count'))
            ->groupBy('slug')
            ->havingRaw('COUNT(*) > 1')
            ->get();
        $this->line('Duplicate slug: '.($duplicateSlugs->isEmpty() ? 'yok' : $duplicateSlugs->toJson()));

        $duplicateCovers = DB::table('university_images')
            ->select('university_id', DB::raw('COUNT(*) as cover_count'))
            ->where('is_cover', true)
            ->groupBy('university_id')
            ->havingRaw('COUNT(*) > 1')
            ->get();
        $this->line('Birden fazla cover görseli olan üniversite: '.($duplicateCovers->isEmpty() ? 'yok' : $duplicateCovers->toJson()));

        $orphanImages = DB::table('university_images as ui')
            ->leftJoin('universities as u', 'u.id', '=', 'ui.university_id')
            ->whereNull('u.id')
            ->count();
        $this->line("Orphan image kaydı: {$orphanImages}");
    }
}
