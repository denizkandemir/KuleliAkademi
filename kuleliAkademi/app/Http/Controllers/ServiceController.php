<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest;
use App\Models\Notification;
use App\Models\Service;
use App\Models\ServiceImage;
use App\Support\MediaUrl;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::query()
            ->with('homepageImage')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->map(fn (Service $service): array => [
                'id' => $service->id,
                'title' => $service->title,
                'slug' => $service->slug,
                'short_description' => $service->short_description,
                'sort_order' => $service->sort_order,
                'is_active' => $service->is_active,
                'cover_image_url' => $service->resolvedCoverImageUrl(),
            ]);

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Services/Create');
    }

    public function store(ServiceRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($request, $validated): void {
            $service = Service::query()->create([
                ...$this->extractServiceFields($validated),
                'slug' => $validated['slug'] ?: Str::slug($validated['title']),
                'is_active' => (bool) ($validated['is_active'] ?? true),
                'sort_order' => (int) ($validated['sort_order'] ?? 0),
            ]);

            $this->syncIntroParagraphs($service, $validated['intro_paragraphs'] ?? [], []);
            $this->syncHighlights($service, $validated['highlights'] ?? [], []);
            $this->syncProcessSteps($request, $service, $validated['process_steps'] ?? [], []);
            $this->syncRequirements($request, $service, $validated['requirements'] ?? [], []);
            $this->syncImages($request, $service, $validated['images'] ?? []);
            $this->syncRequirementsNoteIcon($request, $service, $validated);

            Notification::query()->create([
                'title' => 'Yeni hizmet oluşturuldu',
                'message' => $service->title,
                'type' => 'service',
                'related_type' => Service::class,
                'related_id' => $service->id,
            ]);
        });

        return redirect()->route('admin.services.index')->with('success', 'Hizmet oluşturuldu.');
    }

    public function edit(Service $service): Response
    {
        $service->load(['images', 'introParagraphs', 'highlights', 'processSteps', 'requirements']);

        return Inertia::render('Admin/Services/Edit', [
            'service' => [
                ...$service->only([
                    'id', 'title', 'slug', 'subtitle', 'short_description', 'description',
                    'is_active', 'sort_order',
                    'intro_eyebrow', 'intro_title',
                    'process_eyebrow', 'process_title',
                    'requirements_eyebrow', 'requirements_title', 'requirements_description',
                    'requirements_note_title', 'requirements_note_text',
                    'sidebar_short_info',
                    'cta_eyebrow', 'cta_title', 'cta_text', 'cta_button_text', 'cta_href',
                    'whatsapp_key', 'detail_page_note', 'detail_object_position', 'homepage_button_text',
                ]),
                'requirements_note_icon_url' => MediaUrl::resolve($service->requirements_note_icon),
                'images' => collect(ServiceImage::TYPES)
                    ->reject(fn (string $type): bool => $type === 'gallery')
                    ->mapWithKeys(function (string $type) use ($service): array {
                        $image = $service->images->firstWhere('image_type', $type);

                        return [$type => $image ? [
                            'url' => $image->resolvedUrl(),
                            'alt_text' => $image->alt_text,
                            'object_position' => $image->object_position,
                        ] : null];
                    }),
                'intro_paragraphs' => $service->introParagraphs->map->only(['id', 'content', 'sort_order'])->values(),
                'highlights' => $service->highlights->map->only(['id', 'content', 'sort_order'])->values(),
                'process_steps' => $service->processSteps->map(fn ($step): array => [
                    ...$step->only(['id', 'title', 'short_description', 'sort_order']),
                    'icon_url' => $step->resolvedIconUrl(),
                ])->values(),
                'requirements' => $service->requirements->map(fn ($item): array => [
                    ...$item->only(['id', 'title', 'short_description', 'sort_order']),
                    'icon_url' => $item->resolvedIconUrl(),
                ])->values(),
            ],
        ]);
    }

    public function update(ServiceRequest $request, Service $service): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($request, $service, $validated): void {
            $service->update([
                ...$this->extractServiceFields($validated),
                'slug' => $validated['slug'] ?: Str::slug($validated['title']),
                'is_active' => (bool) ($validated['is_active'] ?? false),
                'sort_order' => (int) ($validated['sort_order'] ?? 0),
            ]);

            $this->syncIntroParagraphs($service, $validated['intro_paragraphs'] ?? [], $validated['deleted_intro_paragraph_ids'] ?? []);
            $this->syncHighlights($service, $validated['highlights'] ?? [], $validated['deleted_highlight_ids'] ?? []);
            $this->syncProcessSteps($request, $service, $validated['process_steps'] ?? [], $validated['deleted_process_step_ids'] ?? []);
            $this->syncRequirements($request, $service, $validated['requirements'] ?? [], $validated['deleted_requirement_ids'] ?? []);
            $this->syncImages($request, $service, $validated['images'] ?? []);
            $this->syncRequirementsNoteIcon($request, $service, $validated);
        });

        return redirect()->route('admin.services.index')->with('success', 'Hizmet güncellendi.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->load(['images', 'processSteps', 'requirements']);

        $managedPaths = [
            $service->getRawOriginal('image_url'),
            $service->requirements_note_icon,
            ...$service->images->pluck('image_url'),
            ...$service->processSteps->pluck('icon_path'),
            ...$service->requirements->pluck('icon_path'),
        ];

        $service->delete();

        foreach ($managedPaths as $path) {
            MediaUrl::deleteIfManaged($path);
        }

        return redirect()->route('admin.services.index')->with('success', 'Hizmet silindi.');
    }

    private function extractServiceFields(array $validated): array
    {
        return [
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'] ?? null,
            'short_description' => $validated['short_description'] ?? null,
            'description' => $validated['description'] ?? null,
            'intro_eyebrow' => $validated['intro_eyebrow'] ?? null,
            'intro_title' => $validated['intro_title'] ?? null,
            'process_eyebrow' => $validated['process_eyebrow'] ?? null,
            'process_title' => $validated['process_title'] ?? null,
            'requirements_eyebrow' => $validated['requirements_eyebrow'] ?? null,
            'requirements_title' => $validated['requirements_title'] ?? null,
            'requirements_description' => $validated['requirements_description'] ?? null,
            'requirements_note_title' => $validated['requirements_note_title'] ?? null,
            'requirements_note_text' => $validated['requirements_note_text'] ?? null,
            'sidebar_short_info' => $validated['sidebar_short_info'] ?? null,
            'cta_eyebrow' => $validated['cta_eyebrow'] ?? null,
            'cta_title' => $validated['cta_title'] ?? null,
            'cta_text' => $validated['cta_text'] ?? null,
            'cta_button_text' => $validated['cta_button_text'] ?? null,
            'cta_href' => $validated['cta_href'] ?? null,
            'whatsapp_key' => $validated['whatsapp_key'] ?? null,
            'detail_page_note' => $validated['detail_page_note'] ?? null,
            'detail_object_position' => $validated['detail_object_position'] ?? null,
            'homepage_button_text' => $validated['homepage_button_text'] ?? null,
        ];
    }

    private function syncIntroParagraphs(Service $service, array $items, array $deletedIds): void
    {
        if ($deletedIds !== []) {
            $service->introParagraphs()->whereIn('id', $deletedIds)->delete();
        }

        foreach ($items as $index => $item) {
            $attributes = ['content' => $item['content'], 'sort_order' => $index];

            if (! empty($item['id'])) {
                $service->introParagraphs()->whereKey($item['id'])->update($attributes);
            } else {
                $service->introParagraphs()->create($attributes);
            }
        }
    }

    private function syncHighlights(Service $service, array $items, array $deletedIds): void
    {
        if ($deletedIds !== []) {
            $service->highlights()->whereIn('id', $deletedIds)->delete();
        }

        foreach ($items as $index => $item) {
            $attributes = ['content' => $item['content'], 'sort_order' => $index];

            if (! empty($item['id'])) {
                $service->highlights()->whereKey($item['id'])->update($attributes);
            } else {
                $service->highlights()->create($attributes);
            }
        }
    }

    private function syncProcessSteps(ServiceRequest $request, Service $service, array $items, array $deletedIds): void
    {
        if ($deletedIds !== []) {
            $service->processSteps()->whereIn('id', $deletedIds)->get()->each(function ($step): void {
                MediaUrl::deleteIfManaged($step->icon_path);
            });
            $service->processSteps()->whereIn('id', $deletedIds)->delete();
        }

        foreach ($items as $index => $item) {
            $existing = ! empty($item['id']) ? $service->processSteps()->whereKey($item['id'])->first() : null;

            $attributes = [
                'title' => $item['title'],
                'short_description' => $item['short_description'] ?? null,
                'sort_order' => $index,
            ];

            $iconFile = $request->file("process_steps.{$index}.icon");
            $removeIcon = (bool) ($item['remove_icon'] ?? false);

            if ($iconFile instanceof UploadedFile) {
                if ($existing) {
                    MediaUrl::deleteIfManaged($existing->icon_path);
                }
                $attributes['icon_path'] = $this->storeIcon($iconFile);
            } elseif ($removeIcon && $existing) {
                MediaUrl::deleteIfManaged($existing->icon_path);
                $attributes['icon_path'] = null;
            }

            if ($existing) {
                $existing->update($attributes);
            } else {
                $service->processSteps()->create($attributes);
            }
        }
    }

    private function syncRequirements(ServiceRequest $request, Service $service, array $items, array $deletedIds): void
    {
        if ($deletedIds !== []) {
            $service->requirements()->whereIn('id', $deletedIds)->get()->each(function ($item): void {
                MediaUrl::deleteIfManaged($item->icon_path);
            });
            $service->requirements()->whereIn('id', $deletedIds)->delete();
        }

        foreach ($items as $index => $item) {
            $existing = ! empty($item['id']) ? $service->requirements()->whereKey($item['id'])->first() : null;

            $attributes = [
                'title' => $item['title'],
                'short_description' => $item['short_description'] ?? null,
                'sort_order' => $index,
            ];

            $iconFile = $request->file("requirements.{$index}.icon");
            $removeIcon = (bool) ($item['remove_icon'] ?? false);

            if ($iconFile instanceof UploadedFile) {
                if ($existing) {
                    MediaUrl::deleteIfManaged($existing->icon_path);
                }
                $attributes['icon_path'] = $this->storeIcon($iconFile);
            } elseif ($removeIcon && $existing) {
                MediaUrl::deleteIfManaged($existing->icon_path);
                $attributes['icon_path'] = null;
            }

            if ($existing) {
                $existing->update($attributes);
            } else {
                $service->requirements()->create($attributes);
            }
        }
    }

    private function syncImages(ServiceRequest $request, Service $service, array $images): void
    {
        foreach (array_diff(ServiceImage::TYPES, ['gallery']) as $type) {
            $payload = $images[$type] ?? null;

            if ($payload === null) {
                continue;
            }

            $existing = $service->images()->where('image_type', $type)->first();
            $file = $request->file("images.{$type}.file");
            $remove = (bool) ($payload['remove'] ?? false);

            if ($remove) {
                if ($existing) {
                    MediaUrl::deleteIfManaged($existing->image_url);
                    $existing->delete();
                }

                continue;
            }

            if ($file instanceof UploadedFile) {
                if ($existing) {
                    MediaUrl::deleteIfManaged($existing->image_url);
                }

                $attributes = [
                    'image_url' => $file->store('services', 'public'),
                    'alt_text' => $payload['alt_text'] ?? $service->title,
                    'object_position' => $payload['object_position'] ?? null,
                    'is_cover' => $type === 'homepage',
                ];

                if ($existing) {
                    $existing->update($attributes);
                } else {
                    $service->images()->create([...$attributes, 'image_type' => $type, 'sort_order' => 0]);
                }

                continue;
            }

            if ($existing) {
                $existing->update([
                    'alt_text' => $payload['alt_text'] ?? $existing->alt_text,
                    'object_position' => $payload['object_position'] ?? $existing->object_position,
                ]);
            }
        }
    }

    private function syncRequirementsNoteIcon(ServiceRequest $request, Service $service, array $validated): void
    {
        $file = $request->file('requirements_note_icon');
        $remove = (bool) ($validated['requirements_note_icon_remove'] ?? false);

        if ($file instanceof UploadedFile) {
            MediaUrl::deleteIfManaged($service->requirements_note_icon);
            $service->update(['requirements_note_icon' => $this->storeIcon($file)]);
        } elseif ($remove && $service->requirements_note_icon) {
            MediaUrl::deleteIfManaged($service->requirements_note_icon);
            $service->update(['requirements_note_icon' => null]);
        }
    }

    private function storeIcon(UploadedFile $file): string
    {
        return $file->store('service-icons', 'public');
    }
}
