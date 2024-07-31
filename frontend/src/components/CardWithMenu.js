// src/components/CardWithMenu.js
import React from "react";
import {
    Card as MUICard,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const CardWithMenu = ({ recipe, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/recipe/edit/${recipe.id}`); // Redirige a la página de edición con el ID de la receta
    };

    const handleView = () => {
        navigate(`/recipe/${recipe.id}`); // Redirige a la página de detalles con el ID de la receta
    };

    const handleDelete = (e) => {
        e.stopPropagation(); // Evita que el clic en el botón de eliminar propague el evento al card
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            onDelete(recipe);
        }
    };

    return (
        <MUICard
            sx={{ position: "relative", cursor: "pointer" }}
            onClick={handleView}
        >
            <CardMedia
                component="img"
                height="140"
                image={recipe.cover_photo_url}
                alt={recipe.title}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Cooking Time: {recipe.cooking_time} minutes
                </Typography>
                <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation(); // Evita que el clic en el botón de editar propague el evento al card
                            handleEdit();
                        }}
                        color="primary"
                        sx={{ mr: 1 }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </MUICard>
    );
};

export default CardWithMenu;
