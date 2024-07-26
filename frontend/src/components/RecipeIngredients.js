import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

function RecipeIngredients({ recipeId }) {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the ingredients for the given recipe
        fetch(`http://localhost:8000/api/recipe/${recipeId}/ingredients`)
            .then((response) => response.json())
            .then((data) => {
                setIngredients(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [recipeId]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" color="error">
                    Error loading ingredients.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Ingredients
            </Typography>
            <List>
                {ingredients.map((ingredient, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`${
                                ingredient.quantity
                                    ? ingredient.quantity +
                                      " " +
                                      (ingredient.unit || "")
                                    : ""
                            } ${ingredient.name}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default RecipeIngredients;
