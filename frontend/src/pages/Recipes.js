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

const Recipes = () => {
    const [categories, setCategories] = useState([]);
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
                setError("no categories");
            }
        };

        fetchCategories();
    }, []);

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
                <Grid item xs={12} md={9}>
                    <AllRecipes />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Recipes;
