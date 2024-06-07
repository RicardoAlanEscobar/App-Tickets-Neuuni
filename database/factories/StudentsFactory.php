<?php

namespace Database\Factories;

use App\Models\Students;
use Illuminate\Database\Eloquent\Factories\Factory as FactoriesFactory;

class StudentsFactory extends FactoriesFactory
{
  
  public function definition()
  {
    $TelColor=['red','yelow', 'blue'];
   return[
        'Nombre'=> $this -> faker -> company,
         'Email'=> $this ->faker -> text(15),
         'Carrera'=> $this ->faker -> text(15),
         'Tel' => $this ->faker -> randomElement($TelColor)
   ];
  } 
}