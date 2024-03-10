<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //return a list categories
    public function categoryList(Request $request){
        logger($request->key);
        $categories = Category::when(request('key'),function($query){
            $query->where('name','like', '%'.request('key').'%');
        })->orderBy('id','desc')->paginate(9);
        return response()->json([
            'categories' => $categories
        ]);
    }

    //create category
    public function createCategory(Request $request){
        // logger($request->category);
        $request->validate([
            'category' => 'required|min:3',
        ]);

        Category::create([
            'name' => $request->category
        ]);

        return response()->json([
            'created' => true,
        ]);
    }

    //ukpdate category
    public function updateCategory(Request $request){
        // logger($request);

        $request->validate([
            'category' => 'required|min:3',
        ]);

        Category::where('id',$request->id)->update(['name' => $request->category]);

        return response()->json([
            'updated' => true,
        ]);
    }

    //delete category
    public function deleteCategory(Request $request){
        // logger($request);

        Category::where('id', $request->id)->delete();

        return response()->json([
            'deleted' => true,
        ]);
    }
}
