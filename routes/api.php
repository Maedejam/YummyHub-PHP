<?php

use App\Http\Controllers\CreatorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/creators',[CreatorController::class, 'index']);
Route::post('/creators',[CreatorController::class, 'store']);
Route::put('/creators/{id}',[CreatorController::class, 'update']);
Route::delete('/creators/{id}',[CreatorController::class, 'destroy']);