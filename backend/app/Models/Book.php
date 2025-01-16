<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $table = 'books'; 

    protected $fillable = ['title', 'author', 'status', 'description', 'isbn', 'subcategory_id'];

    public function scategorie(){
        return $this->belongsTo(Scategorie::class, "subcategory_id"); // Match foreign key `subcategory_id`
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
