// src/pages/RecipePage.js
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    console.log(recipe);

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
                <Box
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        zIndex: 1,
                    }}
                >
                    <Typography variant="h6">Cooking time:</Typography>
                    <span>Total Time: {recipe.cooking_time} mins</span>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        zIndex: 1,
                    }}
                >
                    <Typography variant="h6">Category:</Typography>
                    <span>{recipe.category_name} </span>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        zIndex: 1,
                    }}
                >
                    <Typography variant="h6">Servings:</Typography>
                    <span>{recipe.servings} </span>
                </Box>
            </Box>

            <Typography sx={{ pt: 5 }}>
                <h2>Description:</h2>
            </Typography>
            <p>{recipe.description}</p>
            <Typography sx={{ pt: 10 }}>
                <h2>Instructions:</h2>
            </Typography>

            <p>{recipe.instructions}</p>
        </Container>
    );
}

export default Recipe;
