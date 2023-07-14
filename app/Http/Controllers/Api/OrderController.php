<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return OrderResource::collection(Order::where('user_id', $user->id)->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'mechanic_id' => 'required',
            'offer_id' => 'required',
            'date' => 'required'
        ]);

        
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $data['user_id'] = $user->id;

        $order = Order::create($data);

        return response($data, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
         /** @var \App\Models\User $user */
         $user = Auth::user();
        return OrderResource::collection(Order::where('user_id', $user->id)->where('id', $order->id)->get());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        $data = $request->validate([
            'mechanic_id' => 'required',
            'offer_id' => 'required',
            'date' => 'required'
        ]);
        $order->update($data);

        return $order;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return response("", 204);
    }
}
