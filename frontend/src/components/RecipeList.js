// src/components/RecipeList.js
import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const StyledCard = styled(Card)({
    cursor: "pointer",
    height: "100%",
    display: "flex",
    flexDirection: "column",
});

const StarRating = ({ votes }) => {
    const stars = [];
    const filledStars = Math.round(votes / 20);
    for (let i = 0; i < 5; i++) {
        if (i < filledStars) {
            stars.push(<StarIcon key={i} style={{ color: "gold" }} />);
        } else {
            stars.push(<StarBorderIcon key={i} style={{ color: "gold" }} />);
        }
    }
    return <div>{stars}</div>;
};

const RecipeList = ({ recipes }) => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/recipe/${id}`);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={4}>
                {recipes.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
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
                                    variant="h5"
                                    component="div"
                                >
                                    {recipe.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Total time: {recipe.cooking_time} mins
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    By {recipe.author}
                                </Typography>
                                <StarRating votes={recipe.votes} />
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default RecipeList;
