<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Memo extends Model
{
    public function categories(){
      return $this->belongsTo('App\Category');
    }
}
