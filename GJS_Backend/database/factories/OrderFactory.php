<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 2,
            'order_code' => 1111,
            'total_price' => rand(150000,10000000),
            'status' => rand(0,2),
            'created_at' => $this->faker->dateTimeBetween($startDate = '-12 months', $endDate = 'now', $timezone = null)
        ];
    }
}
