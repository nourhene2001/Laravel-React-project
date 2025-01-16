<?php
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ScategorieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Default user route (not related to categories, articles, or books)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route group for categories
Route::group(['middleware' => ['auth:api']], function () {
    Route::resource('categories', CategorieController::class);
});

// Route group for subcategories
Route::group(['middleware' => ['auth:api']], function () {
    Route::resource('scategories', ScategorieController::class);
});

// Route group for articles
Route::group(['middleware' => ['auth:api']], function () {
    Route::resource('articles', BookController::class);
});

// Route to show articles by subcategory (ID-based)
Route::get('/listarticles/{idscat}', [BookController::class, "showArticlesBySCAT"]);

// Route for paginated articles (for large datasets)
Route::get('/articles/art/articlespaginate', [BookController::class, 'articlesPaginate']);

Route::get('/categories/{id}/article', [CategorieController::class, 'getBooksByCategory']);


Route::group([
'middleware' => 'api',
'prefix' => 'users'
], function ($router) {
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/refreshToken', [AuthController::class, 'refresh']);
Route::get('/user-profile', [AuthController::class, 'userProfile']);
});
Route::get('users/verify-email', [AuthController::class, 'verifyEmail'])->name('verify.email');