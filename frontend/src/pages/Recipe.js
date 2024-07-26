// src/pages/RecipePage.js
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeIngredients from "../components/RecipeIngredients";

function Recipe() {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams(); // Obtén el ID de la URL

    useEffect(() => {
        const apiUrl = `http://localhost:8000/api/recipe/${id}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setRecipe(data))
            .catch((error) => console.error("Error fetching recipe:", error));
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <Container maxWidth="lg" sx={{ padding: 4 }}>
            <h1>{recipe.title}</h1>
            <img src={recipe.cover_photo_url} alt={recipe.title} />
            <p>Total Time: {recipe.cooking_time} mins</p>
            <RecipeIngredients recipeId={id} />
            <h3>Description</h3>
            <p>{recipe.description}</p>
            <p>{recipe.instructions}</p>
        </Container>
    );
}

export default Recipe;
