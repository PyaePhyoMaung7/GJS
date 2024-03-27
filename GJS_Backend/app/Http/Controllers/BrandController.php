<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    //return a list brands
    public function brandList(Request $request){
        logger(request('key'));
        $brands = Brand::when(request('key'),function($query){
            $query->where('name','like','%'.request('key').'%');
        })->orderBy('id','desc')->paginate(9);
        // logger($brands);
        return response()->json([
            'brands' => $brands
        ]);
    }

    //create brand
    public function createBrand(Request $request){
        // logger($request);

        $request->validate([
            'brand' => 'required|min:3'
        ]);

        Brand::create([
            'name' => $request->brand
        ]);

        return response()->json([
            'created' => true,
        ]);

    }

    //update brand
    public function updateBrand(Request $request){
        // logger($request);
        $request->validate([
            'brand' => 'required|min:3',
        ]);

        Brand::where('id',$request->id)->update(['name' => $request->brand]);

        return response()->json([
            'updated' => true,
        ]);
    }
    //delete brand
    public function deleteBrand(Request $request){
        // logger($request);
        Brand::where('id',$request->id)->delete();

        return response()->json([
            'deleted' => true,
        ]);
    }
}
