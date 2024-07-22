<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller {
    public function store(Request $request) {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'recipe_id' => 'required|exists:recipes,id',
            'rating' => 'required|integer|between:1,5',
        ]);

        $vote = Vote::create([
            'user_id' => $request->input('user_id'),
            'recipe_id' => $request->input('recipe_id'),
            'rating' => $request->input('rating'),
        ]);

        return response()->json($vote, 201);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'rating' => 'required|integer|between:1,5',
        ]);

        $vote = Vote::find($id);

        if (!$vote) {
            return response()->json(['message' => 'Vote not found'], 404);
        }

        $vote->rating = $request->input('rating');
        $vote->save();

        return response()->json($vote, 200);
    }

    public function destroy(Request $request) {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'recipe_id' => 'required|exists:recipes,id',
        ]);

        $vote = Vote::where('user_id', $request->input('user_id'))
                    ->where('recipe_id', $request->input('recipe_id'))
                    ->first();

        if (!$vote) {
            return response()->json(['message' => 'Vote not found'], 404);
        }

        $vote->delete();

        return response()->json(['message' => 'Vote removed successfully'], 200);
    }

    public function countVotes($recipeId) {
        $votesCount = Vote::where('recipe_id', $recipeId)->count();

        return response()->json(['votes_count' => $votesCount]);
    }

    public function averageRating($recipeId) {
        $averageRating = Vote::where('recipe_id', $recipeId)->avg('rating');

        return response()->json(['average_rating' => $averageRating]);
    }
}