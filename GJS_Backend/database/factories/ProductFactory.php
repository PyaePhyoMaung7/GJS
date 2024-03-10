<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => rand(1,5),
            'name' => 'productName',
            'description' => $this->faker->text(500),
            'image' => $this->faker->text(15),
            'price' => rand(100000,10000000),
            'instock' => rand(1,10),
            'view_count' => rand(1,10000),
            'brand_id' => rand(1,5),
        ];
    }
}
