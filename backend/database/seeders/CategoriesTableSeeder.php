<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['nomcategorie' => 'Fiction', 'imagecategorie' => 'fiction.png'],
            ['nomcategorie' => 'Non-Fiction', 'imagecategorie' => 'nonfiction.png'],
            ['nomcategorie' => 'Children\'s Books', 'imagecategorie' => 'children.png'],
        ]);
    }
}
