<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'recipe_id',
        'rating'
    ];

    /**
     * Relationship: A vote belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: A vote belongs to a recipe.
     */
    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
