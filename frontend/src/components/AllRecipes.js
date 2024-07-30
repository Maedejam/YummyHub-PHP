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

const AllRecipes = ({ recipes, loading, error }) => {
    return (
        <Box maxWidth="lg" sx={{ my: 5 }}>
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
        </Box>
    );
};

export default AllRecipes;
