<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    //authenticatee user
    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if(Auth::attempt($request->only('email','password'))){
            return response()->json([
                'user' => Auth::user()]);
        }

        throw ValidationException::withMessages([
            'fail' => 'The provided credentails are incorrect!'
        ]);


    }
}
