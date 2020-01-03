<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Memo;
use App\Category;

class MemoController extends Controller
{
    public function create(Request $request){
      $memo = new Memo();
      $category = Category::findOrFail($request->categoryId);

      $memo->category_id = $request->categoryId;
      $memo->user_id = $request->userId;
      $memo->category_name = $category->category_name;
      $memo->memo_sort_num = 1;
      $memo->memo_title = $request->memoTitle;
      $memo->memo_body = '';
      $memo->memo_is_fav = false;
      $memo->memo_is_trash = false;
      $memo->save();
      return $memo;
    }

    public function update(Request $request){
      //$requestの空文字列がnullになるミドルウェアがあるから
      if($request->memo_body === null){
        $request->memo_body = '';
      }
      $memo = Memo::findOrFail($request->id);
      $memo->memo_body = $request->memo_body;
      $memo->memo_is_fav = $request->memo_is_fav;
      $memo->memo_is_trash = $request->memo_is_trash;
      $memo->save();
      return $memo;
    }

    public function delete(Request $request){
      $memo = Memo::findOrFail($request->id);
      $memo->delete();
      return $request;
    }

    public function clear_trash(Request $request){
      $deleted = DB::delete('delete from memos where memo_is_trash = ?',[1]);
      return $request;
    }
}
