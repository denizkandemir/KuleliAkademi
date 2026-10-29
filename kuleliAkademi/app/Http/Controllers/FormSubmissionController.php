<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormSubmission;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class FormSubmissionController extends Controller
{
    public function store(Form $form, Request $request)
    {
        $form->load('fields');

        $rules = [];

        foreach ($form->fields as $field) {
            $fieldKey = 'answers.'.$field->name;
            $baseRules = [];

            if ($field->is_required) {
                $baseRules[] = 'required';
            } else {
                $baseRules[] = 'nullable';
            }

            $baseRules[] = match ($field->type) {
                'email' => 'email',
                'file' => 'string',
                default => 'string',
            };

            if (in_array($field->type, ['select', 'radio'], true) && is_array($field->options) && $field->options !== []) {
                $baseRules[] = Rule::in($field->options);
            }

            $rules[$fieldKey] = $baseRules;
        }

        $validated = $request->validate($rules);
        $answers = $validated['answers'] ?? [];

        if ($answers === []) {
            throw ValidationException::withMessages(['answers' => 'Form cevabı boş olamaz.']);
        }

        DB::transaction(function () use ($form, $answers): void {
            $submission = FormSubmission::query()->create([
                'form_id' => $form->id,
                'full_name' => $answers['full_name'] ?? $answers['name'] ?? null,
                'email' => $answers['email'] ?? null,
                'phone' => $answers['phone'] ?? null,
                'status' => 'new',
                'is_read' => false,
            ]);

            foreach ($form->fields as $field) {
                if (! array_key_exists($field->name, $answers)) {
                    continue;
                }

                $submission->answers()->create([
                    'form_field_id' => $field->id,
                    'field_name' => $field->name,
                    'value' => is_array($answers[$field->name])
                        ? json_encode($answers[$field->name], JSON_UNESCAPED_UNICODE)
                        : (string) $answers[$field->name],
                ]);
            }

            Notification::query()->create([
                'title' => 'Yeni form başvurusu',
                'message' => $form->title,
                'type' => 'form_submission',
                'related_type' => FormSubmission::class,
                'related_id' => $submission->id,
            ]);
        });

        return back()->with('success', 'Form gönderimi başarıyla alındı.');
    }
}
