<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //send user list to client
    public function userList(){
        $users = User::select(['id','name','email','phone','gender','role','image','address'])
        ->orderBy('id','desc')
        ->paginate(8);
        return response()->json([
            'users' => $users
        ]);
    }

    //change the role of user
    public function changeRole(Request $request){
        // logger($request);
        User::where('id', $request->id)->update(['role' => $request->role]);

        return response()->json([
            'role_updated' => true,
        ]);
    }
}
