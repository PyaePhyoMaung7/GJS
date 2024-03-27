<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class ProfileController extends Controller
{
    //update admin profile
    public function updateProfile(Request $request){
        // logger($request);
        $this->validateProfile($request);

        $data = $this->getProfileData($request);

        if($request->hasFile('image')){

            // 1. old image name => check ? delete: no-delete => store
            $dbImage = User::where('id',$request->id)->first()->image;
            if($dbImage != null){
                File::delete(public_path().'/profile_images/'.$dbImage);
            }

            $fileName = $this->processProfileImage($request->file('image'));
            $data['image'] = $fileName;
        }

        // logger($data);
        User::where('id', $request->id)->update($data);

        $user = User::where('id',$request->id)->first();

        return response()->json([
            'updated' => true,
            'user' => $user,
        ]);
    }

    //update password
    public function updatePassword(Request $request){
        // logger($request);
        $request->validate([
            'oldPassword' => ['required', 'min:8', function ($attribute, $value, $fail) use ($request) {
                $oldPassword = User::where('id', $request->id)->first()->password;
                if (!Hash::check($value, $oldPassword)) {
                    $fail('The old password is incorrect.');
                }
            },],
            'newPassword' => 'required|min:8|regex:/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+).+$/|',
            'confirmPassword' => 'required|same:newPassword',
        ],[
            'newPassword.regex' => 'Password must contain at least one small letter, one capital letter and a number',
        ]);

        User::where('id',$request->id)->update(['password' => Hash::make($request-> newPassword)]);

        return response()->json([
            'passwordChanged' => true,
        ]);

    }

    //validate profile data
    private function validateProfile($request){
        $request->validate([
            'name' => 'required|min:3',
            'email' => 'required|email',
            'phone' => 'required|min:7',
            'role' => 'required',
            'gender' => 'required|min:4',
            'address' => 'required|min:10'
        ]);
    }

    //get profile data to stroe in database
    private function getProfileData($request){
        return [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'role' => $request->role,
            'gender' => $request->gender,
            'address' => $request->address,
        ];
    }

    //process profile image
    private function processProfileImage($file){

        $fileName = uniqid().'_'.$file->getClientOriginalName();
        $file->move(public_path().'/profile_images',$fileName);

        return $fileName;
    }
}
