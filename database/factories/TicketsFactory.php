<?php

namespace Database\Factories;

use App\Models\Tickets;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tickets>
 */
class TicketsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $estado = ['Abierto','Cerrado','seguimiento'];
        $prioridad = ['Normal','Urgente'];
        $tipoProblema = ['Neuuni','Gedux','Clase'];

        return [
            'Nombre' => $this-> faker-> company,
            'Problema' => $this-> faker ->text(100),
            'Estado' => $this-> faker ->random_bytes($estado),
            'Prioridad' => $this-> faker ->random_bytes($prioridad),
            'Creacion' => $this-> faker ->text(20),
            'Termino' => $this-> faker ->text(20),
            'TipoProblema' => $this-> faker ->random_bytes($tipoProblema)

        ];
    }
}
