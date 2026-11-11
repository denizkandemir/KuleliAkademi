<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adds the program the visitor picked (see App\Support\StudyPrograms) to both public forms.
     * Nullable so existing rows stay valid.
     */
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->string('program', 50)->nullable()->after('service_id')->index();
        });

        Schema::table('contact_messages', function (Blueprint $table) {
            $table->string('program', 50)->nullable()->after('phone')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropIndex(['program']);
            $table->dropColumn('program');
        });

        Schema::table('contact_messages', function (Blueprint $table) {
            $table->dropIndex(['program']);
            $table->dropColumn('program');
        });
    }
};
