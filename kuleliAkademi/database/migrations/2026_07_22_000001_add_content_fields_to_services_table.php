<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private array $columns = [
        'subtitle',
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
    ];

    public function up(): void
    {
        Schema::table('services', function (Blueprint $table): void {
            if (! Schema::hasColumn('services', 'subtitle')) {
                $table->text('subtitle')->nullable()->after('title');
            }
            if (! Schema::hasColumn('services', 'intro_eyebrow')) {
                $table->string('intro_eyebrow')->nullable()->after('description');
            }
            if (! Schema::hasColumn('services', 'intro_title')) {
                $table->string('intro_title')->nullable()->after('intro_eyebrow');
            }
            if (! Schema::hasColumn('services', 'process_eyebrow')) {
                $table->string('process_eyebrow')->nullable()->after('intro_title');
            }
            if (! Schema::hasColumn('services', 'process_title')) {
                $table->string('process_title')->nullable()->after('process_eyebrow');
            }
            if (! Schema::hasColumn('services', 'requirements_eyebrow')) {
                $table->string('requirements_eyebrow')->nullable()->after('process_title');
            }
            if (! Schema::hasColumn('services', 'requirements_title')) {
                $table->string('requirements_title')->nullable()->after('requirements_eyebrow');
            }
            if (! Schema::hasColumn('services', 'requirements_description')) {
                $table->text('requirements_description')->nullable()->after('requirements_title');
            }
            if (! Schema::hasColumn('services', 'requirements_note_title')) {
                $table->string('requirements_note_title')->nullable()->after('requirements_description');
            }
            if (! Schema::hasColumn('services', 'requirements_note_text')) {
                $table->text('requirements_note_text')->nullable()->after('requirements_note_title');
            }
            if (! Schema::hasColumn('services', 'requirements_note_icon')) {
                $table->string('requirements_note_icon')->nullable()->after('requirements_note_text');
            }
            if (! Schema::hasColumn('services', 'sidebar_short_info')) {
                $table->text('sidebar_short_info')->nullable()->after('requirements_note_icon');
            }
            if (! Schema::hasColumn('services', 'cta_eyebrow')) {
                $table->string('cta_eyebrow')->nullable()->after('sidebar_short_info');
            }
            if (! Schema::hasColumn('services', 'cta_title')) {
                $table->string('cta_title')->nullable()->after('cta_eyebrow');
            }
            if (! Schema::hasColumn('services', 'cta_text')) {
                $table->text('cta_text')->nullable()->after('cta_title');
            }
            if (! Schema::hasColumn('services', 'cta_button_text')) {
                $table->string('cta_button_text')->nullable()->after('cta_text');
            }
            if (! Schema::hasColumn('services', 'cta_href')) {
                $table->text('cta_href')->nullable()->after('cta_button_text');
            }
            if (! Schema::hasColumn('services', 'whatsapp_key')) {
                $table->string('whatsapp_key', 100)->nullable()->after('cta_href');
            }
            if (! Schema::hasColumn('services', 'detail_page_note')) {
                $table->text('detail_page_note')->nullable()->after('whatsapp_key');
            }
            if (! Schema::hasColumn('services', 'detail_object_position')) {
                $table->string('detail_object_position', 50)->nullable()->after('detail_page_note');
            }
            if (! Schema::hasColumn('services', 'homepage_button_text')) {
                $table->string('homepage_button_text')->nullable()->after('detail_object_position');
            }
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table): void {
            foreach ($this->columns as $column) {
                if (Schema::hasColumn('services', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
