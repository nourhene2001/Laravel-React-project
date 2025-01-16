<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubcategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('subcategories')->insert([
            ['nomscategorie' => 'Fantasy', 'imagescategorie' => 'fantasy.png', 'category_id' => 1],
            ['nomscategorie' => 'Science Fiction', 'imagescategorie' => 'scifi.png', 'category_id' => 1],
            ['nomscategorie' => 'Biographies', 'imagescategorie' => 'biographies.png', 'category_id' => 2],
            ['nomscategorie' => 'Self-Help', 'imagescategorie' => 'selfhelp.png', 'category_id' => 2],
            ['nomscategorie' => 'Picture Books', 'imagescategorie' => 'picturebooks.png', 'category_id' => 3],
            ['nomscategorie' => 'Thriller', 'imagescategorie' => 'thriller.png', 'category_id' => 1],

            ['nomscategorie' => 'Young Adult', 'imagescategorie' => 'youngadult.png', 'category_id' => 3],
        ]);
    }
}
