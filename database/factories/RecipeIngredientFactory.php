<?php

namespace Database\Factories;
use App\Models\Recipe;
use App\Models\Ingredient;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RecipeIngredient>
 */
class RecipeIngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'recipe_id' => Recipe::factory(), // assumes Recipe factory is defined
            'ingredient_id' => Ingredient::factory(), // assumes Ingredient factory is defined
            'quantity' => $this->faker->numberBetween(1,10), // random quantity
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
