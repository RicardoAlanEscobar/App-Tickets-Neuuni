<?php

namespace App\Http\Controllers;

use App\Models\Students;
use Illuminate\Http\Request;
use Inertia\Inertia;
class StudentsController extends Controller{

    public function index(){
    $students = Students::all();
    
    return Inertia::render('Students/Index',['students'=>$students]);
    }
    
    public function store(Request $request){
    $request -> validate([
        'Nombre'=>'required|max:100',
        'Email'=>'required|max:100',
        'Tel'=>'required|max:13',
        'Carrera'=>'required|max:100',
    ]);
    $student = new Students($request->input());
    $student -> save();
    return redirect('students');
    }
   
    public function update(Request $request, Students $students, $id){
    $student = Students::find($id);
    $student ->fill($request->input())->saveOrFail();
    return redirect('students');

    }
    
    public function destroy($id){
        $student = Students::find($id);
        $student->delete();
        return redirect('students');
    }

}