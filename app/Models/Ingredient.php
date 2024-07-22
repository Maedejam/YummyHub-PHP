<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Ingredient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    /**
     * Relationship: An ingredient belongs to many recipes.
     */
<<<<<<< HEAD
    public function recipes():BelongsToMany
=======
    public function recipes(): BelongsToMany
>>>>>>> Mae
    {
        return $this->belongsToMany(Recipe::class, 'recipe_ingredients')
                    ->withPivot('quantity', 'unit')
                    ->withTimestamps();
    }
}
