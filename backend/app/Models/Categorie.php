<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;
    protected $table = 'categories'; // Replace 'scategories' with your actual table name

    protected $fillable = [
        'nomcategorie','imagecategorie'
    ];

    public function scategorie(){
        return $this->hasMany(Scategorie::class,"category_id");
    }
}
