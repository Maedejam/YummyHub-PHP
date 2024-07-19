<?php

use App\Http\Controllers\CateroryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users',[UserController::class, 'index']);
Route::get('/users/{id}',[UserController::class, 'show']);
Route::post('/users',[UserController::class, 'store']);
Route::put('/users/{id}',[UserController::class, 'update']);
Route::delete('/users/{id}',[UserController::class, 'destroy']);

//Get recipes by categorie ID
Route::get('/category/{id}', [CateroryController::class, 'index']);
Route::get('/categories/{id}', [CateroryController::class, 'getRecipesByCategory']);


Route::get('/recipes', [RecipeController::class, 'index']);
Route::put('/comments/{id}', [CommentController::class, 'update']);
Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
Route::get('/recipes/{id}/comments', [CommentController::class, 'getCommentsByRecipe']);
