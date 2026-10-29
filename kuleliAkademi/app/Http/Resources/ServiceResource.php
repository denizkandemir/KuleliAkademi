<?php

namespace App\Http\Resources;

use App\Support\MediaUrl;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shapes a Service (with its content relations eager loaded) into the prop
 * structure the public /hizmetler/{slug} page consumes. Keeps a handful of
 * section labels defaulted to their original static copy when a service
 * hasn't set its own, so newly created services never render blank headings.
 */
class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'subtitle' => $this->subtitle,
            'short_description' => $this->short_description,
            'description' => $this->description,

            'intro_eyebrow' => $this->intro_eyebrow ?: 'Bu hizmet nedir?',
            'intro_title' => $this->intro_title,
            'intro_paragraphs' => $this->introParagraphs->pluck('content')->values(),

            'highlights' => $this->highlights->pluck('content')->values(),

            'process_eyebrow' => $this->process_eyebrow ?: 'Süreç nasıl ilerliyor?',
            'process_title' => $this->process_title ?: 'Başvuru Süreci',
            'process_steps' => $this->processSteps->map(fn ($step): array => [
                'id' => $step->id,
                'title' => $step->title,
                'short_description' => $step->short_description,
                'icon_url' => $step->resolvedIconUrl(),
            ])->values(),

            'requirements_eyebrow' => $this->requirements_eyebrow ?: 'Bu hizmet kapsamında neler var?',
            'requirements_title' => $this->requirements_title ?: 'Gerekli Evrak ve Belgeler',
            'requirements_description' => $this->requirements_description
                ?: 'Başvuru sürecinin sorunsuz ilerlemesi için aşağıdaki belgelerin hazırlanması gerekebilir.',
            'requirements' => $this->requirements->map(fn ($item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'short_description' => $item->short_description,
                'icon_url' => $item->resolvedIconUrl(),
            ])->values(),
            'requirements_note' => [
                'title' => $this->requirements_note_title
                    ?: 'Belgelerinizin güncel ve eksiksiz olması başvurunuzun daha sağlıklı ilerlemesine yardımcı olur.',
                'text' => $this->requirements_note_text
                    ?: 'Belgeler üniversiteye, başvuru dönemine ve resmi kurum taleplerine göre değişiklik gösterebilir.',
                'icon_url' => MediaUrl::resolve($this->requirements_note_icon),
            ],

            'sidebar_short_info' => $this->sidebar_short_info,

            'cta' => [
                'eyebrow' => $this->cta_eyebrow ?: 'BU HİZMET HAKKINDA BİLGİ ALIN',
                'title' => $this->cta_title,
                'text' => $this->cta_text,
                'button_text' => $this->cta_button_text ?: 'Başvuru Formunu Doldur',
                'href' => $this->cta_href,
            ],

            'whatsapp_key' => $this->whatsapp_key ?: 'poland',
            'detail_page_note' => $this->detail_page_note,
            'detail_object_position' => $this->detail_object_position,

            'images' => collect(['homepage', 'banner', 'detail', 'sidebar_widget', 'cta'])
                ->mapWithKeys(function (string $type): array {
                    $image = $this->images->firstWhere('image_type', $type);

                    return [$type => $image ? [
                        'url' => $image->resolvedUrl(),
                        'alt_text' => $image->alt_text,
                        'object_position' => $image->object_position,
                    ] : null];
                }),
        ];
    }
}
