<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\RecipeIngredientController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/votes', [VoteController::class, 'store']);
Route::put('/votes/{id}', [VoteController::class, 'update']);
Route::delete('/votes', [VoteController::class, 'destroy']);
Route::get('/recipes/{id}/votes', [VoteController::class, 'countVotes']);
Route::get('/recipes/{id}/average-rating', [VoteController::class, 'averageRating']);

Route::get('/ingredients', [IngredientController::class, 'index']);
Route::get('/ingredients/{id}', [IngredientController::class, 'show']);
Route::post('/ingredients', [IngredientController::class, 'store']);
Route::put('/ingredients/{id}', [IngredientController::class, 'update']);
Route::delete('/ingredients/{id}', [IngredientController::class, 'destroy']);

Route::get('/recipes/{recipeId}/ingredients', [RecipeIngredientController::class, 'index']);
Route::post('/recipes/{recipeId}/ingredients', [RecipeIngredientController::class, 'store']);
Route::put('/recipes/{recipeId}/ingredients/{ingredientId}', [RecipeIngredientController::class, 'update']);
Route::delete('/recipes/{recipeId}/ingredients/{ingredientId}', [RecipeIngredientController::class, 'destroy']);
