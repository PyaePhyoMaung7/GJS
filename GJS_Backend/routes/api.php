<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\RegisterController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [LoginController::class, 'login']);

Route::middleware([
    'auth:sanctum',
])->group(function () {
    //read data
    Route::post('user/list', [UserController::class, 'userList']);
    Route::get('sales/data', [OrderController::class, 'salesData']);
    Route::get('order/status', [OrderController::class, 'orderStatusData']);
    Route::get('order/list', [OrderController::class, 'orderList']);

    //admin profile
    Route::post('profile/update', [ProfileController::class, 'updateProfile']);
    Route::post('password/update', [ProfileController::class, 'updatePassword']);

    //user
    Route::post('user/role/change', [UserController::class, 'changeRole']);


    //category
    Route::post('category/list', [CategoryController::class, 'categoryList']);
    Route::post('category/create',[CategoryController::class, 'createCategory']);
    Route::post('category/update',[CategoryController::class, 'updateCategory']);
    Route::post('category/delete',[CategoryController::class, 'deleteCategory']);

    //product
    Route::post('product/list', [ProductController::class, 'productList']);
    Route::post('product/create', [ProductController::class, 'createProduct']);
    Route::post('product/delete',[ProductController::class, 'deleteProduct']);
    Route::post('product/update', [ProductController::class, 'updateProduct']);
    Route::get('product/brand/list', [ProductController::class, 'getBrandList']);
    Route::get('product/category/list', [ProductController::class, 'getCategoryList']);

    //brand
    Route::post('brand/list', [BrandController::class, 'brandList']);
    Route::post('brand/create', [BrandController::class, 'createBrand']);
    Route::post('brand/update', [BrandController::class, 'updateBrand']);
    Route::post('brand/delete',[BrandController::class, 'deleteBrand']);

    //material
    Route::post('material/list', [MaterialController::class, 'materialList']);
    Route::post('material/create', [MaterialController::class, 'createMaterial']);
    Route::post('material/update', [MaterialController::class, 'updateMaterial']);
    Route::post('material/delete', [MaterialController::class, 'deleteMaterial']);


});
