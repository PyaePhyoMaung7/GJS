<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Brand;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use App\Models\Material;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(100)->create();

        for ($i=0; $i < 20; $i++) {
            Category::create([
                'name' => 'category'.$i
            ]);
        };

        Order::factory(500)->create();

        \App\Models\User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('Superadmin1'),
        ]);

        Product::factory(20)->create();

        for ($i=0; $i < 5; $i++) {
            Brand::create([
                'name' => 'brand'.$i
            ]);
        };

        for ($i=0; $i < 5; $i++) {
            Material::create([
                'name' => 'material'.$i
            ]);
        };


    }
}
