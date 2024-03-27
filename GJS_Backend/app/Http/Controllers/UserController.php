<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //send user list to client
    public function userList(Request $request){
        // logger(request('key'));
        $users = User::when(request('key'),function($query){
            $query->where('name','like','%'.request('key').'%')
            ->orWhere('email','like','%'.request('key').'%')
            ->orWhere('phone','like','%'.request('key').'%')
            ->orWhere('gender','like',request('key'))
            ->orWhere('address','like','%'.request('key').'%')
            ->orWhere('role','like',request('key'));
        })
        ->select(['id','name','email','phone','gender','role','image','address'])
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
