<?php

namespace App\Services;

use App\Models\Application;
use App\Models\ContactMessage;
use App\Models\FormSubmission;
use App\Models\Notification;
use App\Models\Service;
use App\Models\University;
use Illuminate\Support\Str;

class AdminPanelDataService
{
    public function dashboard(): array
    {
        $documents = $this->documents();
        $newApplications = Application::query()->where('status', 'new')->count();
        $reviewingApplications = Application::query()->whereIn('status', ['contacted', 'in_progress'])->count();
        $completedApplications = Application::query()->where('status', 'completed')->count();

        return [
            'stats' => [
                'totalServices' => Service::query()->count(),
                'totalUniversities' => University::query()->count(),
                'newFormSubmissions' => FormSubmission::query()->where('status', 'new')->count(),
                'unreadMessages' => ContactMessage::query()->where('is_read', false)->count(),
                'unreadNotifications' => Notification::query()->where('is_read', false)->count(),
                'newApplications' => $newApplications,
                'reviewingApplications' => $reviewingApplications,
                'completedApplications' => $completedApplications,
                'totalDocuments' => count($documents),
            ],
            'recentApplications' => $this->recentApplications(),
            'recentDocuments' => array_slice($documents, 0, 5),
            'todaySummary' => $this->todaySummary($documents),
            'universityDistribution' => $this->universityDistribution(),
            'documentsCount' => count($documents),
            'documentTypeOptions' => $this->documentTypeOptions(),
            'documentStatusOptions' => $this->documentStatusOptions(),
        ];
    }

    public function documents(): array
    {
        $records = [];

        FormSubmission::query()
            ->with(['form:id,title,slug', 'answers.field:id,label,name,type'])
            ->latest('id')
            ->get()
            ->each(function (FormSubmission $submission) use (&$records): void {
                foreach ($submission->answers as $answer) {
                    $field = $answer->field;
                    $value = is_string($answer->value) ? trim($answer->value) : '';

                    if (! $field || $value === '') {
                        continue;
                    }

                    if (! $this->looksLikeDocumentField($field->type ?? null, $value)) {
                        continue;
                    }

                    $previewUrl = $this->normalizeDocumentUrl($value);
                    $records[] = [
                        'id' => 'submission-'.$submission->id.'-answer-'.$answer->id,
                        'student_name' => $submission->full_name ?: $submission->email ?: 'İsimsiz Aday',
                        'document_type' => $field->label ?: Str::headline($field->name ?: ($answer->field_name ?: 'Belge')),
                        'document_type_key' => $this->documentTypeKey($field->label ?: $field->name ?: $answer->field_name ?: 'Belge'),
                        'submitted_at' => $submission->created_at?->format('d.m.Y'),
                        'submitted_at_iso' => $submission->created_at?->toIso8601String(),
                        'status' => $this->documentStatusKey($submission->status),
                        'status_label' => $this->documentStatusLabel($submission->status),
                        'preview_kind' => $this->previewType($previewUrl, $value),
                        'preview_url' => $previewUrl,
                        'download_url' => $previewUrl,
                        'form_title' => $submission->form?->title,
                    ];
                }
            });

        return $records;
    }

    public function documentTypeOptions(): array
    {
        return [
            'all' => 'Tüm Belgeler',
            'pasaport' => 'Pasaport',
            'diploma' => 'Diploma',
            'transkript' => 'Transkript',
            'fotograf' => 'Fotoğraf',
            'motivasyon_mektubu' => 'Motivasyon Mektubu',
            'dil_belgesi' => 'Dil Belgesi',
            'vize_evraki' => 'Vize Evrakı',
        ];
    }

    public function documentStatusOptions(): array
    {
        return [
            'all' => 'Tüm Durumlar',
            'waiting' => 'Bekliyor',
            'reviewing' => 'İnceleniyor',
            'approved' => 'Onaylandı',
            'missing' => 'Eksik',
        ];
    }

    private function recentApplications(): array
    {
        return Application::query()
            ->with('service:id,title')
            ->latest('id')
            ->limit(5)
            ->get()
            ->map(function (Application $application): array {
                $status = $this->applicationStatus($application->status);

                return [
                    'id' => $application->id,
                    'name' => $application->full_name,
                    'email' => $application->email,
                    'program' => $application->service?->title ?: 'Genel',
                    'submitted_at' => $application->created_at?->format('d.m.Y'),
                    'status' => $status['key'],
                    'status_label' => $status['label'],
                    'status_tone' => $status['tone'],
                ];
            })
            ->all();
    }

    private function todaySummary(array $documents): array
    {
        return [
            [
                'label' => 'Yeni Başvurular',
                'value' => Application::query()->where('status', 'new')->count(),
                'tone' => 'gold',
            ],
            [
                'label' => 'İncelenen Başvurular',
                'value' => Application::query()->whereIn('status', ['contacted', 'in_progress'])->count(),
                'tone' => 'info',
            ],
            [
                'label' => 'Tamamlanan Başvurular',
                'value' => Application::query()->where('status', 'completed')->count(),
                'tone' => 'success',
            ],
            [
                'label' => 'Yüklenen Belgeler',
                'value' => count($documents),
                'tone' => 'navy',
            ],
            [
                'label' => 'Yeni Mesajlar',
                'value' => ContactMessage::query()->where('is_read', false)->count(),
                'tone' => 'warning',
            ],
        ];
    }

    private function universityDistribution(): array
    {
        $totalUniversities = University::query()->count();

        if ($totalUniversities === 0) {
            return [];
        }

        return collect(University::countryOptions())
            ->map(function (array $option) use ($totalUniversities): array {
                return [
                    'label' => $option['label'],
                    'value' => $option['count'],
                    'percent' => (int) round(($option['count'] / $totalUniversities) * 100),
                    'slug' => $option['value'],
                ];
            })
            ->sortByDesc('value')
            ->values()
            ->all();
    }

    private function applicationStatus(?string $status): array
    {
        return match ($status) {
            'contacted' => ['key' => 'contacted', 'label' => 'İnceleniyor', 'tone' => 'info'],
            'in_progress' => ['key' => 'in_progress', 'label' => 'İnceleniyor', 'tone' => 'info'],
            'completed' => ['key' => 'completed', 'label' => 'Tamamlandı', 'tone' => 'success'],
            'cancelled' => ['key' => 'cancelled', 'label' => 'İptal', 'tone' => 'danger'],
            default => ['key' => 'new', 'label' => 'Yeni', 'tone' => 'gold'],
        };
    }

    private function documentStatusKey(?string $status): string
    {
        return match ($status) {
            'contacted', 'in_progress' => 'reviewing',
            'completed' => 'approved',
            'cancelled' => 'missing',
            default => 'waiting',
        };
    }

    private function documentStatusLabel(?string $status): string
    {
        return match ($this->documentStatusKey($status)) {
            'reviewing' => 'İnceleniyor',
            'approved' => 'Onaylandı',
            'missing' => 'Eksik',
            default => 'Bekliyor',
        };
    }

    private function looksLikeDocumentField(?string $type, string $value): bool
    {
        if ($type === 'file') {
            return true;
        }

        return (bool) preg_match('/\.(pdf|jpe?g|png|webp|gif|svg|docx?|xlsx?)($|\?)/i', $value) || str_starts_with($value, '/storage/') || str_starts_with($value, 'storage/');
    }

    private function documentTypeKey(string $label): string
    {
        $normalized = Str::lower($label);

        return match (true) {
            str_contains($normalized, 'pasaport') => 'pasaport',
            str_contains($normalized, 'diploma') => 'diploma',
            str_contains($normalized, 'transkript') => 'transkript',
            str_contains($normalized, 'foto') => 'fotograf',
            str_contains($normalized, 'motivasyon') || str_contains($normalized, 'niyet') => 'motivasyon_mektubu',
            str_contains($normalized, 'dil') || str_contains($normalized, 'sertifika') => 'dil_belgesi',
            str_contains($normalized, 'vize') => 'vize_evraki',
            default => Str::slug($label) ?: 'belge',
        };
    }

    private function normalizeDocumentUrl(string $value): ?string
    {
        if (preg_match('/^https?:\/\//i', $value)) {
            return $value;
        }

        if (str_starts_with($value, '/storage/')) {
            return $value;
        }

        if (str_starts_with($value, 'storage/')) {
            return '/'.$value;
        }

        return null;
    }

    private function previewType(?string $previewUrl, string $fallbackValue): string
    {
        $source = $previewUrl ?: $fallbackValue;

        if (preg_match('/\.pdf($|\?)/i', $source)) {
            return 'pdf';
        }

        if (preg_match('/\.(jpe?g|png|webp|gif|svg)($|\?)/i', $source)) {
            return 'image';
        }

        return 'file';
    }
}
