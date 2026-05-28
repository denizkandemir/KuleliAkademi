<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SettingRequest extends FormRequest
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
        $settingId = $this->route('setting')?->id;

        return [
            'key' => ['required', 'string', 'max:255', Rule::unique('settings', 'key')->ignore($settingId)],
            'value' => ['nullable', 'string'],
            'type' => ['nullable', 'string', 'max:100'],
            'group' => ['nullable', 'string', 'max:100'],
        ];
    }
}
