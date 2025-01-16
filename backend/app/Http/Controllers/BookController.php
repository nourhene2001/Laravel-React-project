<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      try {
        $articles=Book::with("scategorie")->get();
        return response()->json($articles);
      } catch (\Exception $e) {
        return response()->json($e->getMessage(),$e->getCode());
        //throw $th;
      }
    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
    
            // Create a new Book entry
            $article = new Book([
              
                "title" => $request->input("title"),
                "author" => $request->input("author"),
                "status" => $request->input("status"),
                "isbn" => $request->input("isbn"),
                
                "description" => $request->input("description"),
                "subcategory_id" => $request->input("subcategory_id"),

            ]);
    
            // Save the book entry to the database
            $article->save();
    
            return response()->json([
                "message" => "Book saved successfully",
                "book" => $article
            ], 201);  // Return a 201 status code for successful creation
        } catch (\Illuminate\Database\QueryException $e) {
          // Database-related exception (e.g., unique constraint violation)
          return response()->json([
              'error' => 'Database Error',
              'message' => 'There was an issue with the database, please try again later.'
          ], 500);  // 500 Internal Server Error
        }
        catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage()
            ], 500);  // Return 500 if there's an error
        }
    }
    
    

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $article=Book::with("scategorie")->findOrFail($id);
            return response()->json($article);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),$e->getCode());
            //throw $th;
          }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $article=Book::findOrFail($id);
            $article->update($request->all());
            return response()->json($article);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),$e->getCode());
            //throw $th;
          }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $article=Book::findOrFail($id);
            $article->delete();
            return response()->json("The book was deleted successfully");
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),$e->getCode());
            //throw $th;
          }
    }
    public function showArticlesBySCAT($idscat){
        try {
            $articles=Book::where("subcategory_id",$idscat)->with("scategorie")->get();
            return response()->json($articles);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),$e->getCode());
            //throw $th;
          }
    }
    public function articlesPaginate()
    {

        try {
           $perPage = request()->input('pageSize', 10); 
              // Récupère la valeur dynamique pour la pagination
            $articles = Book::with('scategorie')->paginate($perPage);
  
            // Retourne le résultat en format JSON API
            return response()->json([
            'products' => $articles->items(), // Les articles paginés
            'totalPages' =>  $articles->lastPage(), // Le nombre de pages
          ]);
        } catch (\Exception $e) {
            return response()->json("Selection impossible {$e->getMessage()}");
        }
    
}

}
