// src/components/AddRecipe.js
import React, { useState, useEffect } from "react";
import {
    Button,
    Container,
    TextField,
    Typography,
    Grid,
    Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const AddRecipe = () => {
    const base_path = (path) => `${window.location.origin}/${path}`;
    const [user, setUser] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [title, setTitle] = useState("");
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [servings, setServings] = useState(1);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID de la URL

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        Accept: "application/json",
                    },
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError("Failed to load user data.");
            }
        };

        const fetchRecipe = async () => {
            if (id) {
                try {
                    const response = await fetch(
                        `http://127.0.0.1:8000/api/recipe/${id}`
                    );
                    const data = await response.json();
                    setRecipe(data);
                    setTitle(data.title);
                    setCoverPhoto(null); // No establecer el archivo aquí para mantener la imagen existente
                    setIngredients(data.ingredients);
                    setDescription(data.description);
                    setInstructions(data.instructions);
                    setCookingTime(data.cooking_time);
                    setServings(data.servings);
                } catch (error) {
                    setError("Failed to load recipe data.");
                }
            }
        };

        fetchUser();
        fetchRecipe();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!user) {
            setError("User data not loaded yet.");
            return;
        }

        const userId = user.id;

        const formData = new FormData();
        formData.append("title", title);
        if (coverPhoto) {
            formData.append("cover_photo_url", coverPhoto);
        }
        formData.append("description", description);
        formData.append("instructions", instructions);
        formData.append("cooking_time", cookingTime);
        formData.append("servings", servings);
        formData.append("user_id", userId);

        fetch(
            `http://127.0.0.1:8000/api/recipe/${id ? `update/${id}` : "add"}`,
            {
                method: id ? "PUT" : "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                },
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.id) {
                    navigate("/profile");
                } else {
                    setError(data.message);
                }
            })
            .catch((error) => setError("Error: Failed to fetch"));
    };

    return (
        <Container maxWidth="lg" sx={{ my: 10 }}>
            <Typography variant="h4" gutterBottom>
                {id ? "Update Recipe" : "Add Recipe"}
            </Typography>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    container
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            width: "100%",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            overflow: "hidden",
                        }}
                    >
                        {coverPhoto ? (
                            <img
                                src={URL.createObjectURL(coverPhoto)}
                                alt="Cover Preview"
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                            />
                        ) : recipe && recipe.cover_photo_url ? (
                            <img
                                src={`${base_path("")}${
                                    recipe.cover_photo_url
                                }`}
                                alt="Cover Preview"
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                            />
                        ) : (
                            <Typography variant="h6" color="textSecondary">
                                No image selected
                            </Typography>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Title"
                            margin="normal"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            type="file"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => setCoverPhoto(e.target.files[0])}
                        />
                        <TextField
                            fullWidth
                            label="Ingredients"
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Instructions"
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Cooking Time (minutes)"
                            margin="normal"
                            variant="outlined"
                            type="number"
                            value={cookingTime}
                            onChange={(e) => setCookingTime(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Servings"
                            margin="normal"
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 1, max: 10 }}
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            {id ? "Update Recipe" : "Add Recipe"}
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddRecipe;
