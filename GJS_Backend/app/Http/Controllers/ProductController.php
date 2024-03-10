<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    //return all products
    public function productList(Request $request){
        $products = Product::select('products.*','categories.name AS category','brands.name AS brand')
        ->join('categories','products.category_id','categories.id')
        ->join('brands','products.brand_id','brands.id')
        ->when(request('key'),function($query){
            $query->where('products.name','like', '%'.request('key').'%')
                ->orWhere('description', 'like', '%'.request('key').'%')
                ->orWhere('categories.name', 'like', '%'.request('key').'%')
                ->orWhere('brands.name', 'like', '%'.request('key').'%')
                ->orWhere('instock', 'like', '%'.request('key').'%')
                ->orWhere('price', 'like', '%'.request('key').'%')
                ->orWhere('view_count', 'like', '%'.request('key').'%');
        })
        ->orderBy('products.id','desc')
        ->paginate(5);
        // $products = Product::get();
        // logger($products);

        return response()->json([
            'products' => $products,
        ]);
    }

    //create product
    public function createProduct(Request $request){
        logger($request);
        // logger($request->file('image'));

        $this->validateProduct($request);

        $data = $this->getProductData($request);

        if($request->hasFile('image')){

            // 1. old image name => check ? delete: no-delete => store
            // $dbImage = User::where('id',$id)->first()->image;
            // if($dbImage != null){
            //     Storage::delete('public/'.$dbImage);
            // }
            $fileName = $this->processProductImage($request->file('image'));
            $data['image'] = $fileName;
        }

        logger($data);
        Product::create($data);

        return response()->json([
            'created' => true,
        ]);
    }

    //update product
    public function updateProduct(Request $request){
        // logger($request);
        $this->validateProduct($request);

        $data = $this->getProductData($request);

        if($request->hasFile('image')){

            // 1. old image name => check ? delete: no-delete => store
            $dbImage = Product::where('id',$request->id)->first()->image;
            if($dbImage != null){
                File::delete(public_path().'/products/'.$dbImage);
            }

            $fileName = $this->processProductImage($request->file('image'));
            $data['image'] = $fileName;
        }

        // logger($data);
        Product::where('id', $request->id)->update($data);

        return response()->json([
            'updated' => true,
        ]);
    }

    //delete product
    public function deleteProduct(Request $request){
        // logger($request);
        Product::where('id', $request->id)->delete();

        return response()->json([
            'deleted' => true,
        ]);
    }

    //get all brands
    public function getBrandList(){
        $brands = Brand::get();

        return response()->json([
            'brands' => $brands,
        ]);
    }

    //get all categories
    public function getCategoryList(){
        $categories = Category::get();

        return response()->json([
            'categories' => $categories,
        ]);
    }

    //get product data to stroe in database
    private function getProductData($request){
        return [
            'name' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category,
            'brand_id' => $request->brand,
            'price' => $request->price,
            'instock' => $request->instock,
        ];
    }

    //validate product
    private function validateProduct($request){
        $request->validate([
            'title' => 'required|min:3',
            'description' => 'required|min:5',
            'brand' => 'required',
            'category' => 'required',
            'image' => 'mimes:jpg,jpeg,png,svg,webp|max:1000',
            'price' => 'required|min:0',
            'instock' => 'required|min:1',
        ],[
            'brand.required' => 'Please choose a brand',
            'category.required' => 'Please choose a category',
        ]);
    }

    //process product image
    private function processProductImage($file){

        $fileName = uniqid().'_'.$file->getClientOriginalName();
        $file->move(public_path().'/products',$fileName);

        return $fileName;
    }
}
