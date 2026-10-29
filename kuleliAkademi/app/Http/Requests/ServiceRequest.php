<?php

namespace App\Http\Requests;

use App\Models\ServiceImage;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ServiceRequest extends FormRequest
{
    private const IMAGE_RULES = ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,gif', 'max:4096'];

    private const ICON_RULES = ['nullable', 'image', 'mimes:png,jpg,jpeg,webp', 'max:2048'];

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        $serviceId = $this->route('service')?->id;
        $imageTypes = array_diff(ServiceImage::TYPES, ['gallery']);

        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('services', 'slug')->ignore($serviceId)],
            'subtitle' => ['nullable', 'string', 'max:2000'],
            'short_description' => ['nullable', 'string', 'max:1000'],
            'description' => ['nullable', 'string', 'max:20000'],
            'is_active' => ['sometimes', 'boolean'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],

            'intro_eyebrow' => ['nullable', 'string', 'max:255'],
            'intro_title' => ['nullable', 'string', 'max:255'],
            'process_eyebrow' => ['nullable', 'string', 'max:255'],
            'process_title' => ['nullable', 'string', 'max:255'],
            'requirements_eyebrow' => ['nullable', 'string', 'max:255'],
            'requirements_title' => ['nullable', 'string', 'max:255'],
            'requirements_description' => ['nullable', 'string', 'max:2000'],
            'requirements_note_title' => ['nullable', 'string', 'max:255'],
            'requirements_note_text' => ['nullable', 'string', 'max:2000'],
            'requirements_note_icon' => self::ICON_RULES,
            'requirements_note_icon_remove' => ['nullable', 'boolean'],
            'sidebar_short_info' => ['nullable', 'string', 'max:2000'],
            'cta_eyebrow' => ['nullable', 'string', 'max:255'],
            'cta_title' => ['nullable', 'string', 'max:255'],
            'cta_text' => ['nullable', 'string', 'max:2000'],
            'cta_button_text' => ['nullable', 'string', 'max:255'],
            'cta_href' => ['nullable', 'string', 'max:2048'],
            'whatsapp_key' => ['nullable', 'string', 'max:100'],
            'detail_page_note' => ['nullable', 'string', 'max:2000'],
            'detail_object_position' => ['nullable', 'string', 'max:50'],
            'homepage_button_text' => ['nullable', 'string', 'max:255'],

            'images' => ['nullable', 'array'],
            'images.*' => ['array'],

            'intro_paragraphs' => ['nullable', 'array'],
            'intro_paragraphs.*.id' => ['nullable', 'integer'],
            'intro_paragraphs.*.content' => ['required', 'string'],
            'intro_paragraphs.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'deleted_intro_paragraph_ids' => ['nullable', 'array'],
            'deleted_intro_paragraph_ids.*' => ['integer'],

            'highlights' => ['nullable', 'array'],
            'highlights.*.id' => ['nullable', 'integer'],
            'highlights.*.content' => ['required', 'string', 'max:500'],
            'highlights.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'deleted_highlight_ids' => ['nullable', 'array'],
            'deleted_highlight_ids.*' => ['integer'],

            'process_steps' => ['nullable', 'array'],
            'process_steps.*.id' => ['nullable', 'integer'],
            'process_steps.*.title' => ['required', 'string', 'max:255'],
            'process_steps.*.short_description' => ['nullable', 'string', 'max:2000'],
            'process_steps.*.icon' => self::ICON_RULES,
            'process_steps.*.remove_icon' => ['nullable', 'boolean'],
            'process_steps.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'deleted_process_step_ids' => ['nullable', 'array'],
            'deleted_process_step_ids.*' => ['integer'],

            'requirements' => ['nullable', 'array'],
            'requirements.*.id' => ['nullable', 'integer'],
            'requirements.*.title' => ['required', 'string', 'max:255'],
            'requirements.*.short_description' => ['nullable', 'string', 'max:2000'],
            'requirements.*.icon' => self::ICON_RULES,
            'requirements.*.remove_icon' => ['nullable', 'boolean'],
            'requirements.*.sort_order' => ['nullable', 'integer', 'min:0'],
            'deleted_requirement_ids' => ['nullable', 'array'],
            'deleted_requirement_ids.*' => ['integer'],
        ];

        foreach ($imageTypes as $type) {
            $rules["images.{$type}.file"] = self::IMAGE_RULES;
            $rules["images.{$type}.alt_text"] = ['nullable', 'string', 'max:255'];
            $rules["images.{$type}.object_position"] = ['nullable', 'string', 'max:50'];
            $rules["images.{$type}.remove"] = ['nullable', 'boolean'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'required' => ':attribute alanı zorunludur.',
            'string' => ':attribute alanı metin olmalıdır.',
            'max' => [
                'string' => ':attribute alanı en fazla :max karakter olabilir.',
                'file' => ':attribute alanı en fazla :max kilobayt olabilir.',
            ],
            'integer' => ':attribute alanı sayı olmalıdır.',
            'min' => [
                'integer' => ':attribute alanı en az :min olmalıdır.',
            ],
            'boolean' => ':attribute alanı doğru/yanlış olmalıdır.',
            'unique' => 'Bu :attribute zaten kullanılıyor.',
            'image' => ':attribute alanı bir görsel dosyası olmalıdır.',
            'mimes' => ':attribute alanı için izin verilen formatlar: :values.',
            'array' => ':attribute alanı geçersiz.',
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'başlık',
            'slug' => 'slug',
            'subtitle' => 'alt başlık',
            'short_description' => 'kısa açıklama',
            'description' => 'açıklama',
            'sort_order' => 'sıra',
            'is_active' => 'aktiflik durumu',
            'intro_title' => 'giriş başlığı',
            'sidebar_short_info' => 'kısa bilgi',
            'cta_title' => 'CTA başlığı',
            'cta_text' => 'CTA metni',
            'cta_button_text' => 'CTA buton metni',
            'cta_href' => 'CTA bağlantısı',
            'requirements_note_icon' => 'gerekli evrak notu ikonu',
            'intro_paragraphs.*.content' => 'giriş paragrafı',
            'highlights.*.content' => 'öne çıkan madde',
            'process_steps.*.title' => 'süreç adımı başlığı',
            'process_steps.*.short_description' => 'süreç adımı açıklaması',
            'process_steps.*.icon' => 'süreç adımı ikonu',
            'requirements.*.title' => 'gerekli evrak başlığı',
            'requirements.*.short_description' => 'gerekli evrak açıklaması',
            'requirements.*.icon' => 'gerekli evrak ikonu',
        ];
    }
}
