<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function memos(){
      return $this->hasMany('App\Memo');
    }
    public function categories(){
      return $this->belongsTo('App\User');
    }
}
