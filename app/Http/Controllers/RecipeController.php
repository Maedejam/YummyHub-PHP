<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    /*
    public function index(User $user){
        return response()->json(Auth::user()->recipes,200);
    }
*/
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

    public function show($id)
    {
        // Find the category by ID
        $recipe = Recipe::find($id);

        // Check if category exists
        if (!$recipe) {
            return response()->json(['message' => 'Not found'], 404);
        }

        // Return recipes as JSON response
        return response()->json($recipe,200);
    }

    public function latest(): JsonResponse
    {
        $recipe = Recipe::latest()->first();
        return response()->json($recipe);
    }
   

}
