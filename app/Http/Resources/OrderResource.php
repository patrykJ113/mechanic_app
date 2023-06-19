<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'mechanic' => $this->mechanic,
            'mechanic_id' => $this->mechanic_id,
            'offer' => $this->offer,
            'offer_id' => $this->offer_id,
            'date' => $this->date,
            'request' => $request
        ];
    }
}
