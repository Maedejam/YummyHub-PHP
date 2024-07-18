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

    public function show($id){
        $creator = Creator::find($id);

        $creator->name=request('name');
        $creator->email=request('email');        
        $creator->password=request('password');
        $creator->save();

        return response()->json($creator,200);
    }

    public function store(){
        $creator = new Creator();

        $creator->name=request('name');
        $creator->email=request('email');        
        $creator->password=request('password');
        $creator->save();

        return response()->json($creator,201);
    }

    public function update($id){
        $creator = Creator::find($id);

        $creator->name=request('name');
        $creator->email=request('email');        
        $creator->password=request('password');
        $creator->save();

        return response()->json($creator,200);
    }

    public function destroy($id){
        $creator = Creator::find($id);
        $creator->delete();

        return response()->json($creator,200);
    }
}
