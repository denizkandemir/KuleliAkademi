<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UniversityUpdateRequest extends FormRequest
{
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
        $universityId = $this->route('university')?->id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('universities', 'slug')->ignore($universityId)],
            'short_name' => ['nullable', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'short_description' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'website_url' => ['nullable', 'url', 'max:2048'],
            'application_url' => ['nullable', 'url', 'max:2048'],
            'main_image_url' => ['nullable', 'url', 'max:2048'],
            'logo_url' => ['nullable', 'url', 'max:2048'],
            'tuition_fee' => ['nullable', 'string', 'max:255'],
            'currency' => ['nullable', 'string', 'max:32'],
            'duration' => ['nullable', 'string', 'max:64'],
            'language' => ['nullable', 'string', 'max:255'],
            'ranking' => ['nullable', 'string', 'max:64'],
            'is_featured' => ['sometimes', 'boolean'],
            'is_active' => ['sometimes', 'boolean'],
            'sort_order' => ['sometimes', 'integer'],
            'images' => ['nullable', 'array'],
            'images.*.id' => ['nullable', 'integer', 'exists:university_images,id'],
            'images.*.image_url' => ['required_with:images', 'url', 'max:2048'],
            'images.*.alt_text' => ['nullable', 'string', 'max:255'],
            'images.*.sort_order' => ['nullable', 'integer'],
            'images.*.is_cover' => ['nullable', 'boolean'],
        ];
    }
}
