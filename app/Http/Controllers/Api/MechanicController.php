<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mechanic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class MechanicController extends Controller
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

        return Mechanic::where('user_id', $user->id)->get();
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
            'last_name' => 'required',
            'name' => 'required',
            'phone' => 'required',
            'nip' => 'required'
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $data['user_id'] = $user->id;

        $mechanic = Mechanic::create($data);
        return response($data, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Mechanic  $mechanic
     * @return \Illuminate\Http\Response
     */
    public function show(Mechanic $mechanic)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return Mechanic::where('user_id', $user->id)->where('id', $mechanic->id)->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Mechanic  $mechanic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Mechanic $mechanic)
    {
        $data = $request->validate([
            'last_name' => 'required',
            'name' => 'required',
            'phone' => 'required',
            'nip' => 'required'
        ]);
        $mechanic->update($data);

        return $mechanic;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Mechanic  $mechanic
     * @return \Illuminate\Http\Response
     */
    public function destroy(Mechanic $mechanic)
    {
        $mechanic->delete();
        return response("", 204);
    }
}
