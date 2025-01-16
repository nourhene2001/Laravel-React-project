<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scategorie extends Model
{
    use HasFactory;
    protected $table = 'subcategories'; // Replace 'scategories' with your actual table name

    protected $fillable = [
        "nomscategorie",
        "imagescategorie",
        "category_id"
    ];
    public function categorie()
    {
        return $this->belongsTo(Categorie::class,"categorieID");
    }
    public function article(){
        return $this->hasMany(Book::class, "subcategory_id"); // Corrected the foreign key to match `subcategory_id`
    }
}
