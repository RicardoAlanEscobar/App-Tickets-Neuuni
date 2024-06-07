<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TicketsController extends Controller
{
    public function index(){
        $tickets = Tickets::all();
        
        return Inertia::render('Tickets/Index',['tickets'=>$tickets]);
        }
        
        public function store(Request $request){
        $request -> validate([
            'Nombre' => 'required|max:60',
            'Problema' => 'required|max:100',
            'Estado' => 'required|max:20',
            'Prioridad' => 'required|max:20',
            'Creacion' =>'required|max:20',
            'Termino' => 'required|max:20',
            'TipoProblema' => 'required|max:60'
        ]);
        $ticket = new Tickets($request->input());
        $ticket -> save();
        return redirect('tickets');
        }
       
        public function update(Request $request, Tickets $tickets, $id){
        $ticket = Tickets::find($id);
        $ticket ->fill($request->input())->saveOrFail();
        return redirect('tickets');
        }
        public function destroy($id){
            $ticket = Tickets::find($id);
            $ticket->delete();
            return redirect('tickets');
        }
    
    }