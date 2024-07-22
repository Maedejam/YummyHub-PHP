<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function index() {
        $ingredients = Ingredient::all();
        return response()->json($ingredients, 200);
    }

    public function show($id) {
        $ingredient = Ingredient::find($id);

        if (!$ingredient) {
            return response()->json(['message' => 'Ingredient not found'], 404);
        }

        return response()->json($ingredient, 200);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255|unique:ingredients,name',
        ]);

        $ingredient = Ingredient::create([
            'name' => $request->input('name'),
        ]);

        return response()->json($ingredient, 201);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string|max:255|unique:ingredients,name,' . $id,
        ]);

        $ingredient = Ingredient::find($id);

        if (!$ingredient) {
            return response()->json(['message' => 'Ingredient not found'], 404);
        }

        $ingredient->name = $request->input('name');
        $ingredient->save();

        return response()->json($ingredient, 200);
    }

    public function destroy($id) {
        $ingredient = Ingredient::find($id);

        if (!$ingredient) {
            return response()->json(['message' => 'Ingredient not found'], 404);
        }

        $ingredient->delete();

        return response()->json(['message' => 'Ingredient deleted successfully'], 200);
    }
}

