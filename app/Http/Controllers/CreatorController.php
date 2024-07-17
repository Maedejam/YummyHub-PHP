<?php

namespace App\Http\Controllers;

use App\Models\Creator;
use Illuminate\Http\Request;

class CreatorController extends Controller
{
    public function index(){
        $creators = Creator::all();

        return response()->json(@$creators,200);
    }
}
