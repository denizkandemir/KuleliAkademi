<?php

namespace App\Models;

use App\Support\MediaUrl;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'subtitle',
        'short_description',
        'description',
        'image_url',
        'intro_eyebrow',
        'intro_title',
        'process_eyebrow',
        'process_title',
        'requirements_eyebrow',
        'requirements_title',
        'requirements_description',
        'requirements_note_title',
        'requirements_note_text',
        'requirements_note_icon',
        'sidebar_short_info',
        'cta_eyebrow',
        'cta_title',
        'cta_text',
        'cta_button_text',
        'cta_href',
        'whatsapp_key',
        'detail_page_note',
        'detail_object_position',
        'homepage_button_text',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function images()
    {
        return $this->hasMany(ServiceImage::class)->orderBy('sort_order')->orderBy('id');
    }

    public function coverImage()
    {
        return $this->hasOne(ServiceImage::class)
            ->where('is_cover', true);
    }

    public function homepageImage()
    {
        return $this->hasOne(ServiceImage::class)->where('image_type', 'homepage');
    }

    public function bannerImage()
    {
        return $this->hasOne(ServiceImage::class)->where('image_type', 'banner');
    }

    public function detailImage()
    {
        return $this->hasOne(ServiceImage::class)->where('image_type', 'detail');
    }

    public function sidebarWidgetImage()
    {
        return $this->hasOne(ServiceImage::class)->where('image_type', 'sidebar_widget');
    }

    public function ctaImage()
    {
        return $this->hasOne(ServiceImage::class)->where('image_type', 'cta');
    }

    public function introParagraphs()
    {
        return $this->hasMany(ServiceIntroParagraph::class)->orderBy('sort_order')->orderBy('id');
    }

    public function highlights()
    {
        return $this->hasMany(ServiceHighlight::class)->orderBy('sort_order')->orderBy('id');
    }

    public function processSteps()
    {
        return $this->hasMany(ServiceProcessStep::class)->orderBy('sort_order')->orderBy('id');
    }

    public function requirements()
    {
        return $this->hasMany(ServiceRequirement::class)->orderBy('sort_order')->orderBy('id');
    }

    public function resolvedImageUrl(): ?string
    {
        return MediaUrl::resolve($this->getRawOriginal('image_url'));
    }

    /**
     * Cover image used in admin listings and the homepage cards: prefers a
     * dedicated "homepage" service_images row, then falls back to the
     * legacy `services.image_url` column.
     */
    public function resolvedCoverImageUrl(): ?string
    {
        if ($this->relationLoaded('homepageImage') && $this->homepageImage) {
            return MediaUrl::resolve($this->homepageImage->image_url);
        }

        if (! $this->relationLoaded('homepageImage')) {
            $homepageImage = $this->homepageImage()->first();

            if ($homepageImage) {
                return MediaUrl::resolve($homepageImage->image_url);
            }
        }

        return $this->resolvedImageUrl();
    }
}
