<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    //return a list materials
    public function materialList(Request $request){
        $materials = Material::when(request('key'),function($query){
            $query->where('name','like','%'.request('key').'%');
        })->orderBy('id','desc')->paginate(9);
        // logger($materials);
        return response()->json([
            'materials' => $materials
        ]);
    }

    //create material
    public function createMaterial(Request $request){
        // logger($request);

        $request->validate([
            'material' => 'required|min:3',
        ]);

        Material::create([
            'name' => $request->material
        ]);

        return response()->json([
            'created' => true,
        ]);
    }

    //update material
    public function updateMaterial(Request $request){
        // logger($request);

        $request->validate([
            'material' => 'required|min:3',
        ]);

        Material::where('id',$request->id)->update(['name' => $request->material]);

        return response()->json([
            'updated' => true,
        ]);
    }

    //delete material
    public function deleteMaterial(Request $request){
        Material::where('id', $request->id)->delete();

        return response()->json([
            'deleted' => true,
        ]);
    }
}
