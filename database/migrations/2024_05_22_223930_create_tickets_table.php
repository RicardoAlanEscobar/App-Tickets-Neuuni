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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('Nombre', 60);
            $table->string('Problema', 100);
            $table->string('Estado', 20);  
            $table->string('Prioridad', 20); 
            $table->string('Creacion', 10);
            $table->string('Termino', 10);
            $table->string('TipoProblema', 60);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
