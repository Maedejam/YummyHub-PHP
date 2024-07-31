import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Card,
    CardMedia,
    Link,
    Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function RecipeWeek() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the latest recipe from the backend
        fetch("http://127.0.0.1:8000/api/latest-recipe")
            .then((response) => response.json())
            .then((data) => {
                setRecipe(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleClick = () => {
        if (recipe) {
            navigate(`/recipe/${recipe.id}`);
        }
    };

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
                    Error loading recipe.
                </Typography>
            </Box>
        );
    }

    if (!recipe) {
        return (
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6">No recipes found.</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ pt: 5, mb: 10 }}>
            <Typography variant="h5" component="h5" gutterBottom sx={{ pb: 3 }}>
                Recipe of the Week
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Card sx={{ maxWidth: 600, mr: 2 }} onClick={handleClick}>
                    <CardMedia
                        component="img"
                        image={recipe.cover_photo_url}
                        alt="Recipe cover"
                    />
                </Card>
                <Box>
                    <Typography variant="h6" component="h2" gutterBottom>
                        <Link
                            href={`/recipe/${recipe.id}`}
                            color="inherit"
                            underline="hover"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick();
                            }}
                        >
                            {recipe.title}
                        </Link>
                    </Typography>
                    <Typography variant="body1">
                        <strong>Cooking Time:</strong> {recipe.cooking_time}{" "}
                        minutes
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        {recipe.description}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default RecipeWeek;
