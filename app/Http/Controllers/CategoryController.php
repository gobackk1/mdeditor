<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function create(Request $request){
      $category = new Category();
      $category->category_sort_num = 1;
      $category->category_name = $request->name;
      $category->user_id = $request->userId;
      $category->category_icon = '#c5c5c5';
      $category->save();
      return $category;
    }

    public function update(Request $request){
      $category = Category::findOrFail($request->id);
      $category->category_sort_num = $request->category_sort_num;
      $category->category_name = $request->category_name;
      $category->category_icon = $request->category_icon;
      $category->save();
      return $category;
    }

    public function delete(Request $request){
      $category = Category::findOrFail($request->id);
      $category->delete();
      return $request;
    }
}
