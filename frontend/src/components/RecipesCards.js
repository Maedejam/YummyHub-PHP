// src/components/Recipes.js
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Container,
    Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const apiUrl = "http://localhost:8000/api/category/10";

const StarRating = styled("div")(({ votes }) => ({
    display: "inline-block",
    "&::before": {
        content: `"${"★".repeat(Math.round(votes / 20))}${"☆".repeat(
            5 - Math.round(votes / 20)
        )}"`,
        color: "gold",
    },
}));

const StyledCard = styled(Card)({
    cursor: "pointer", // Cambia el cursor a puntero
});

const RecipesCards = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const limitedRecipes = data.slice(0, 4); // Limitar a las primeras 4 recetas
                setRecipes(limitedRecipes);
            })
            .catch((error) => console.error("Error fetching recipes:", error));
    }, []);

    const handleCardClick = (id) => {
        navigate(`/recipe/${id}`);
    };

    return (
        <Container maxWidth="lg" sx={{ p: 4 }}>
            <Box sx={{ mt: 6, mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Effortless Eats
                        </Typography>
                        <Typography component="h2">
                            Satisfy your cravings in a flash! Explore our Quick
                            & Easy Meals for effortless recipes without
                            compromising on mouthwatering taste.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} alignItems="center">
                        <Typography align="right">
                            <Link href="#" variant="body1" color="primary">
                                VIEW ALL RECIPES{" "}
                            </Link>
                            <ArrowForwardIcon sx={{ ml: 1 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2}>
                {recipes.map((recipe) => (
                    <Grid item xs={12} sm={6} md={3} key={recipe.id}>
                        <StyledCard onClick={() => handleCardClick(recipe.id)}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={recipe.cover_photo_url}
                                alt={recipe.title}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    component="div"
                                    fontWeight={450}
                                >
                                    {recipe.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Total Time: {recipe.cooking_time} mins
                                </Typography>
                                <StarRating votes={recipe.votes}>
                                    ★★★★☆ ({recipe.votes} votes)
                                </StarRating>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default RecipesCards;
