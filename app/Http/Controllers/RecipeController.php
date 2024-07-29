<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    
    public function index(User $user){
        return response()->json(Auth::user()->recipes,200);
    }
/*
    public function index(){
        $recipes = Recipe::all();
        return response()->json($recipes,200);
    }
*/
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

    public function store(Request $request): JsonResponse
    {
        // Validar los datos de entrada
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'cover_photo_url' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'description' => 'nullable|string',
            'instructions' => 'nullable|string',
            'cooking_time' => 'required|integer|min:1',
            'servings' => 'nullable|integer|min:1|max:10',
            'category_id' => 'required|integer',
        ]);

        // Guardar la imagen en la carpeta public/upload
        if ($request->hasFile('cover_photo_url')) {
            $file = $request->file('cover_photo_url');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(base_path('/frontend/public/upload'), $filename);
            $validated['cover_photo_url'] = 'upload/' . $filename;
        }


        // Crear una nueva receta
        $recipe = new Recipe();
        $recipe->title = $validated['title'];
        $recipe->cover_photo_url = $validated['cover_photo_url'];
        $recipe->description = $validated['description'];
        $recipe->instructions = $validated['instructions'];
        $recipe->cooking_time = $validated['cooking_time'];
        $recipe->servings = $validated['servings'];
        $recipe->category_id=$validated['category_id'];
        $recipe->user_id = auth()->id(); // Asocia la receta con el usuario actualmente autenticado
        $recipe->save();

        // Retornar la respuesta
        return response()->json($recipe, 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        // Validar los datos de entrada
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'cover_photo_url' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'description' => 'required|string',
            'instructions' => 'required|string',
            'cooking_time' => 'required|integer|min:1',
            'servings' => 'nullable|integer|min:1|max:10',
        ]);

        // Encontrar la receta existente
        $recipe = Recipe::findOrFail($id);

        // Actualizar los atributos de la receta
        $recipe->title = $validated['title'];
        $recipe->description = $validated['description'];
        $recipe->instructions = $validated['instructions'];
        $recipe->cooking_time = $validated['cooking_time'];
        $recipe->servings = $validated['servings'];
        // Mantener la categoría y el usuario actual
        $recipe->category_id = 1;  // Puedes ajustar esto según tu lógica
        $recipe->user_id = auth()->id();  // Asocia la receta con el usuario actualmente autenticado

        // Manejar la carga de una nueva imagen si se proporciona
        if ($request->hasFile('cover_photo_url')) {
            // Eliminar la imagen anterior si existe
            if ($recipe->cover_photo_url && file_exists(public_path($recipe->cover_photo_url))) {
                unlink(public_path($recipe->cover_photo_url));
            }

            $file = $request->file('cover_photo_url');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('upload'), $filename);
            $recipe->cover_photo_url = 'upload/' . $filename;
        }

        // Guardar la receta actualizada
        $recipe->save();

        // Retornar la respuesta
        return response()->json($recipe, 200);
    }


    public function destroy($id)
    {
        // Verificar si el usuario está autenticado
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Obtener la receta por ID
        $recipe = Recipe::find($id);

        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        // Verificar si el usuario autenticado es el propietario de la receta
        if ($recipe->user_id !== Auth::id()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Eliminar la receta
        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted successfully'], 200);
    }


   

}
