<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    //register a user
    public function register(Request $request){

        $request->validate([
            'user_name' => 'required|min:4|max:15',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|regex:/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+).+$/|',
            'confirm_password' => 'required|same:password'
        ],[
            'password.regex' => 'Password must contain at least one small letter, one capital letter and a number',
        ]);

        //for special charcater (?=.[!$#%])

        User::create([
            'name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'user' => Auth::user()
        ]);
    }
}
