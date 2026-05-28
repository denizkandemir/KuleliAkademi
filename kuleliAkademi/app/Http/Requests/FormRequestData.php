<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FormRequestData extends FormRequest
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
        $formId = $this->route('form')?->id;

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('forms', 'slug')->ignore($formId)],
            'description' => ['nullable', 'string'],
            'is_active' => ['sometimes', 'boolean'],
            'fields' => ['nullable', 'array'],
            'fields.*.label' => ['required_with:fields', 'string', 'max:255'],
            'fields.*.name' => ['required_with:fields', 'string', 'max:255'],
            'fields.*.type' => ['required_with:fields', Rule::in(['text', 'email', 'phone', 'textarea', 'select', 'checkbox', 'radio', 'file'])],
            'fields.*.placeholder' => ['nullable', 'string'],
            'fields.*.options' => ['nullable', 'array'],
            'fields.*.options.*' => ['nullable', 'string', 'max:255'],
            'fields.*.is_required' => ['nullable', 'boolean'],
            'fields.*.sort_order' => ['nullable', 'integer'],
        ];
    }
}
