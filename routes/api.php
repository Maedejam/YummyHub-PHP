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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->apiResource('user.recipes', RecipeController::class);


Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
//Register new user
Route::post('/register', [UserController::class, 'register']);

Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Get recipes by category ID
Route::get('/category/{id}', [CateroryController::class, 'getRecipesByCategory']);
//Get all categories
Route::get('/categories', [CateroryController::class, 'index']);



//Gett all recipes
Route::get('/recipes', [RecipeController::class, 'index']);
//Search for a word in recipes
Route::get('/recipes', [RecipeController::class, 'searchWord']);
Route::get('/recipe/{id}', [RecipeController::class, 'show']);
Route::get('/latest-recipe', [RecipeController::class, 'latest']);

//create new recipe
Route::middleware('auth:sanctum')->post('/recipe/add', [RecipeController::class, 'store']);
Route::middleware('auth:sanctum')->put('/recipe/update/{id}', [RecipeController::class, 'update']);
//Route::put('/recipe/update/{id}', [RecipeController::class, 'update']);
//delete recipe
Route::middleware('auth:sanctum')->delete('/recipe/{id}', [RecipeController::class, 'destroy']);

//get all categories
Route::get('/categories', [CateroryController::class, 'index']);
//get by id
Route::get('/category/{id}', [CateroryController::class, 'getRecipesByCategory']);


