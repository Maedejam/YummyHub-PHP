// src/components/Recipes.js
import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import AllRecipes from "../components/AllRecipes";
import RecipeSearch from "../components/RecipeSearch";

const Recipes = () => {
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/categories"
                );
                if (!response.ok) throw new Error("Failed to fetch categories");

                const data = await response.json();
                setCategories(data); // Assuming the response is an array of categories
            } catch (error) {
                setError("No categories found");
            }
        };

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

        fetchCategories();
        fetchRecipes();
    }, []);

    const handleSearch = async (searchTerm) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `http://localhost:8000/api/recipes?search=${searchTerm}`
            );
            if (!response.ok) throw new Error("Failed to fetch recipes");

            const data = await response.json();
            console.log(data);
            setRecipes(data); // Assuming the response is an array of recipes
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("No recipes found");
        }
    };

    return (
        <Container maxWidth="lg" sx={{ my: 10 }}>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Box
                        sx={{
                            p: 2,
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Categories
                        </Typography>
                        <List>
                            {categories.map((category) => (
                                <ListItem
                                    key={category.id}
                                    component={Link}
                                    to={`/category/${category.name}`}
                                    button
                                >
                                    <ListItemText primary={category.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9} mt={2}>
                    <RecipeSearch onSearch={handleSearch} />
                    <AllRecipes
                        recipes={recipes}
                        loading={loading}
                        error={error}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Recipes;
