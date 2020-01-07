<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{any?}', 'IndexController@index')->where('any','.+');

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
Route::group(['middleware' => ['api']], function(){
  // 初回のデータを返す
  Route::post('userdata','ApiController@userdata');

  Route::post('create/category', 'CategoryController@create');
  Route::post('update/category', 'CategoryController@update');
  Route::post('delete/category', 'CategoryController@delete');

  Route::post('create/memo', 'MemoController@create');
  Route::post('update/memo', 'MemoController@update');
  Route::post('delete/memo', 'MemoController@delete');
  Route::post('clear/trash', 'MemoController@clear_trash');

  Route::post('/register', 'Auth\RegisterController@register');
  Route::post('/login', 'Auth\LoginController@login');
  Route::post('/logout', 'Auth\LoginController@logout');
});

Route::get('/user', function () {
    return Auth::user();
})->name('user');
