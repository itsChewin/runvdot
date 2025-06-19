<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('vdot_histories', function (Blueprint $table) {
        $table->float('vdot')->after('time');
    });
}

public function down(): void
{
    Schema::table('vdot_histories', function (Blueprint $table) {
        $table->dropColumn('vdot');
    });
}
};
