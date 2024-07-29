// src/components/Card.js
import React from "react";
import {
    Card as MUICard,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";

const Card = ({ recipe }) => {
    const { cover_photo_url, title, cooking_time } = recipe;

    return (
        <MUICard>
            <CardMedia
                component="img"
                height="140"
                image={cover_photo_url}
                alt={title}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Cooking Time: {cooking_time} minutes
                </Typography>
            </CardContent>
        </MUICard>
    );
};

export default Card;
