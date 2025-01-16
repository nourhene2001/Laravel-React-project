<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $categories=Categorie::all();
            return response()->json($categories);

        } catch (\Exception $e) {
            return response()->json("impossible de récupérer les catégories");
        }
    }
// Fetch all books in subcategories of the category
public function getBooksByCategory($id)
{
    try {
        // Log the ID to confirm it's now treated as an integer

        // Explicitly cast to integer
        $id = (int) $id;

        // Find the category by ID and load the subcategories and their articles
        $category = Categorie::with('scategorie.article')->findOrFail($id);

        $books = [];
        foreach ($category->scategorie as $subcategory) {
            foreach ($subcategory->article as $book) {
                $books[] = $book;
            }
        }

        return response()->json($books);
    } catch (\Exception $e) {
        return response()->json($e->getMessage(),500);
        //throw $th;
      }
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $categorie= new Categorie([
                "nomcategorie"=>$request->input("nomcategorie"),
                "imagecategorie"=>$request->input("imagecategorie")
            ]);
                $categorie->save();
                return response()->json($categorie,200);
        } catch (\Exception $e) {
            return response()->json("ajout impossible");
            //throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $categorie=Categorie::findOrFail($id);
            return response()->json($categorie,200);
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
            $categorie=Categorie::findOrFail($id);
            $categorie->update($request->all());
            return response()->json($categorie);

        } catch (\Exception $e) {
            return response()->json($e->getMessage(),$e->getCode());
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
           $categorie=Categorie::findOrfail($id);
           $categorie->delete();
           return response()->json("categorie supprimée avec succées",200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(),$e->getCode());
            //throw $th;
        }
    }
}
