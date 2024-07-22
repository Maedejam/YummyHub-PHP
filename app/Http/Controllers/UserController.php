<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json($users,200);
    }

    public function show($id){
        
        $user = User::find($id);
        return response()->json($user,200);
    }

    public function store(){
        $user = new User();

        $user->name=request('name');
        $user->email=request('email');        
        $user->password=request('password');

        $user->save();

        return response()->json($user,201);
    }

    public function update($id){
        $user = User::find($id);

        $user->name=request('name');
        $user->email=request('email');        
        $user->password=request('password');
        $user->save();

        return response()->json($user,200);
    }

    public function destroy($id){
        $user = User::find($id);
        $user->delete();

        return response()->json($user,200);
    }
    
}
