<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    //return revenue amount of each month in year
    public function salesData(){

        $sales = Order::select(DB::raw('count(*) AS order_qty'),DB::raw('sum(total_price) AS monthly_sales') ,DB::raw('YEAR(created_at) year'),DB::raw('MONTH(created_at) month'))
        ->groupBy(DB::raw('year'), DB::raw('month'))
        ->get();


        return response()->json([
            'sales' => $sales
        ]);
    }

    //return the number of each order status
    public function orderStatusData(){

        $statusData = Order::select(DB::raw('count(*) AS status_frequency'), 'status')
        ->groupBy('status')
        ->get();

        return response()->json([
            'statusData' => $statusData
        ]);

    }

    //return all orders
    public function orderList(){
        $orders = Order::select('orders.*','users.name')
        ->join('users','orders.user_id','users.id')
        ->orderBy('orders.id','desc')
        ->paginate(9);

        // logger($orders);
        return response()->json([
            'orders' => $orders,
        ]);
    }
}
