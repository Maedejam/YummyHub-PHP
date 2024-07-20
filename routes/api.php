<?php

use App\Http\Controllers\RegisterController;
use App\Http\Controllers\CreatorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/creators',[CreatorController::class, 'index']);
Route::post('/register', [RegisterController::class, 'register']);