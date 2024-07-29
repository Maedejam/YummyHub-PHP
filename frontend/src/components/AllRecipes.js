// src/components/AllRecipes.js
import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Typography,
    CircularProgress,
    Box,
} from "@mui/material";
import Card from "./Card";

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    "http://localhost:8000/api/recipes"
                );
                if (!response.ok) throw new Error("Failed to fetch recipes");

                const data = await response.json();

                // Ordenar recetas por fecha de creación en orden descendente
                const sortedRecipes = data.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );

                // Mostrar solo las primeras 12 recetas
                setRecipes(sortedRecipes.slice(0, 12));
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ my: 5 }}>
            <Typography variant="h4" gutterBottom>
                All Recipes
            </Typography>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {recipes.map((recipe) => (
                        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                            <Card recipe={recipe} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default AllRecipes;
