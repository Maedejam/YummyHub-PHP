<?php

use App\Http\Controllers\CateroryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\RecipeIngredientController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Get recipes by category ID
Route::get('/category/{id}', [CateroryController::class, 'getRecipesByCategory']);
//Gett all recipes
Route::get('/recipes', [RecipeController::class, 'index']);
//Search for a word in recipes
Route::get('/recipes', [RecipeController::class, 'searchWord']);



Route::put('/comments/{id}', [CommentController::class, 'update']);
Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
Route::get('/recipes/{id}/comments', [CommentController::class, 'getCommentsByRecipe']);

Route::post('/votes', [VoteController::class, 'store']);
Route::put('/votes/{id}', [VoteController::class, 'update']);
Route::delete('/votes/{id}', [VoteController::class, 'destroy']);
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
