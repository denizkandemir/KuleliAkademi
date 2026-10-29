<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormRequestData;
use App\Models\Form;
use App\Models\FormField;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Forms/Index', [
            'forms' => Form::query()
                ->withCount(['fields', 'submissions'])
                ->latest('id')
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Forms/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FormRequestData $request): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated): void {
            $form = Form::query()->create([
                'title' => $validated['title'],
                'slug' => $validated['slug'],
                'description' => $validated['description'] ?? null,
                'is_active' => (bool) ($validated['is_active'] ?? true),
            ]);

            $this->syncFields($form, $validated['fields'] ?? []);
        });

        return redirect()->route('admin.forms.index')->with('success', 'Form oluşturuldu.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Form $form)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Form $form): Response
    {
        return Inertia::render('Admin/Forms/Edit', [
            'form' => $form->load('fields'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormRequestData $request, Form $form): RedirectResponse
    {
        $validated = $request->validated();

        DB::transaction(function () use ($form, $validated): void {
            $form->update([
                'title' => $validated['title'],
                'slug' => $validated['slug'],
                'description' => $validated['description'] ?? null,
                'is_active' => (bool) ($validated['is_active'] ?? true),
            ]);

            $this->syncFields($form, $validated['fields'] ?? []);
        });

        return redirect()->route('admin.forms.index')->with('success', 'Form güncellendi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form): RedirectResponse
    {
        $form->delete();

        return redirect()->route('admin.forms.index')->with('success', 'Form silindi.');
    }

    private function syncFields(Form $form, array $fields): void
    {
        $existingIds = [];

        foreach ($fields as $index => $field) {
            if (empty($field['label']) || empty($field['name']) || empty($field['type'])) {
                continue;
            }

            $item = FormField::query()->updateOrCreate(
                [
                    'id' => $field['id'] ?? null,
                    'form_id' => $form->id,
                ],
                [
                    'label' => $field['label'],
                    'name' => Str::snake($field['name']),
                    'type' => $field['type'],
                    'placeholder' => $field['placeholder'] ?? null,
                    'options' => $field['options'] ?? null,
                    'is_required' => (bool) ($field['is_required'] ?? false),
                    'sort_order' => (int) ($field['sort_order'] ?? $index),
                ]
            );

            $existingIds[] = $item->id;
        }

        if ($existingIds !== []) {
            FormField::query()
                ->where('form_id', $form->id)
                ->whereNotIn('id', $existingIds)
                ->delete();
        }
    }
}
