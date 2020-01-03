<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CategoryLarge;
use App\Category;
use App\Memo;

class ApiController extends Controller
{
    //
    public function userdata(Request $request){
      $items = [
        'category' => Category::where('user_id',$request->id)->get(),
        'memo' => Memo::where('user_id',$request->id)->get()
      ];
      $json = json_encode($items);
      return $json;
    }
}
