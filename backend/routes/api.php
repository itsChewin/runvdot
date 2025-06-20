<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VdotHistoryController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/vdot-history', [VdotHistoryController::class, 'index']);
    Route::post('/vdot-history', [VdotHistoryController::class, 'store']);
    Route::delete('/vdot-history/{vdotHistory}', [VdotHistoryController::class, 'destroy']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

    Route::get('/cors-test', function () {
    return response()->json(['message' => 'CORS is working!']);
});

