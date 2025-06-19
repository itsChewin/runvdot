<?php

namespace App\Http\Controllers;

use App\Models\VdotHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VdotHistoryController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            VdotHistory::where('user_id', $request->user()->id)->latest()->get()
        );
    }

    public function store(Request $request)
    {

        \Log::info('VDOT store request:', $request->all());
        $request->validate([
            'distance' => 'required|numeric',
            'time' => 'required|string',
            'vdot' => 'required|numeric',
        ]);

        $history = VdotHistory::create([
            'user_id' => $request->user()->id,
            'distance' => $request->distance,
            'time' => $request->time,
            'vdot' => $request->vdot,
        ]);

        return response()->json($history, 201);
    }

    public function destroy(VdotHistory $vdotHistory)
    {
        // optional: check if belongs to authenticated user
        if ($vdotHistory->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $vdotHistory->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
