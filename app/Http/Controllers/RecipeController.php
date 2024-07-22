<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    //
    public function index(){
        $recipes = Recipe::all();
        return response()->json($recipes,200);
    }

    public function searchWord(Request $request)
    {
        // Obtener la palabra de búsqueda del parámetro de consulta
        $search = $request->input('search');

        // Si hay una palabra de búsqueda, filtrar los resultados
        if ($search) {
            $recipes = Recipe::where('title', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->orWhere('instructions', 'like', '%' . $search . '%')
                ->get();
        } else {
            // Si no hay palabra de búsqueda, devolver todos los resultados
            $recipes = Recipe::all();
        }

        return response()->json($recipes, 200);
        
    }
}
