// src/pages/RecipePage.js
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card"; // Asegúrate de que la ruta sea correcta
import Comments from "../components/Comments";

function Recipe() {
    const [recipe, setRecipe] = useState(null);
    const [relatedRecipes, setRelatedRecipes] = useState([]);
    const { id } = useParams(); // Obtén el ID de la URL

    useEffect(() => {
        const fetchRecipe = async () => {
            const apiUrl = `http://localhost:8000/api/recipe/${id}`;
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };

        const fetchRelatedRecipes = async () => {
            const apiUrl = `http://localhost:8000/api/related-recipes/${id}`;
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setRelatedRecipes(data);
            } catch (error) {
                console.error("Error fetching related recipes:", error);
            }
        };

        fetchRecipe();
        fetchRelatedRecipes();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <Container maxWidth="lg" sx={{ py: 10 }}>
            <h1>{recipe.title}</h1>
            <Box sx={{ width: "100%" }}>
                <img
                    src={`../${recipe.cover_photo_url}`}
                    alt={recipe.title}
                    style={{ width: "100%", height: "auto" }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    backgroundColor: "#f5f5f5",
                    width: "100%",
                    height: "100px",
                    borderRadius: "8px",
                    alignItems: "center",
                    padding: "0 16px",
                    boxSizing: "border-box",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ flex: 1, textAlign: "center", zIndex: 1 }}>
                    <Typography variant="h6">Cooking time:</Typography>
                    <span>Total Time: {recipe.cooking_time} mins</span>
                </Box>
                <Box sx={{ flex: 1, textAlign: "center", zIndex: 1 }}>
                    <Typography variant="h6">Category:</Typography>
                    <span>{recipe.category_name}</span>
                </Box>
                <Box sx={{ flex: 1, textAlign: "center", zIndex: 1 }}>
                    <Typography variant="h6">Servings:</Typography>
                    <span>{recipe.servings}</span>
                </Box>
            </Box>

            <Typography sx={{ pt: 5 }}>
                <h2>Description:</h2>
            </Typography>
            <p>{recipe.description}</p>
            <Typography sx={{ pt: 1 }}>
                <h2>Instructions:</h2>
            </Typography>
            <p>{recipe.instructions}</p>

            <Typography sx={{ pt: 10 }}>
                <h2>Related Recipes:</h2>
            </Typography>
            <Grid container spacing={2}>
                {relatedRecipes.map((relatedRecipe) => (
                    <Grid item xs={12} sm={6} md={3} key={relatedRecipe.id}>
                        <Card recipe={relatedRecipe} />
                    </Grid>
                ))}
            </Grid>

            <Comments recipeId={recipe.id} />
        </Container>
    );
}

export default Recipe;
