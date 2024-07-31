// src/components/UpdateRecipe.js
import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import FormRecipe from "../components/FormRecipe";

const UpdateRecipe = () => {
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
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();
    const { id } = useParams();

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
                    if (response.ok) {
                        const data = await response.json();
                        setRecipe(data);
                        setTitle(data.title);
                        setIngredients(data.ingredients);
                        setDescription(data.description);
                        setInstructions(data.instructions);
                        setCookingTime(data.cooking_time);
                        setServings(data.servings);
                        setSelectedCategory(data.category_id);
                    } else {
                        setError("Recipe not found.");
                    }
                } catch (error) {
                    setError("Failed to load recipe data.");
                }
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/categories"
                );
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError("Failed to load categories.");
            }
        };

        // Set loading to true before fetching
        setLoading(true);
        fetchUser();
        fetchRecipe();
        fetchCategories().finally(() => setLoading(false)); // Set loading to false after fetching
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!user) {
            setError("User data not loaded yet.");
            return;
        }

        const userId = user.id;

        // Construir el objeto JSON
        const jsonData = {
            title: title,
            description: description,
            instructions: instructions,
            cooking_time: cookingTime,
            servings: servings,
            category_id: selectedCategory,
            user_id: userId,
        };

        // Añadir la imagen si está presente
        if (coverPhoto) {
            // Convertir la imagen en un objeto de tipo FormData para enviar como archivo
            const formData = new FormData();
            formData.append("cover_photo_url", coverPhoto);

            // Añadir los otros datos al FormData
            for (const key in jsonData) {
                formData.append(key, jsonData[key]);
            }

            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/recipe/update/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                            Accept: "application/json",
                        },
                        body: formData,
                    }
                );

                const data = await response.json();
                console.log("Datos recibidos del servidor:", data);

                if (response.ok) {
                    navigate("/profile");
                } else {
                    setError(data.message || "Unknown error occurred");
                    console.error(data); // Para depuración
                }
            } catch (error) {
                setError("Error: Failed to fetch");
            }
        } else {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/recipe/update/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                            Accept: "application/json",
                            "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido como JSON
                        },
                        body: JSON.stringify(jsonData),
                    }
                );

                const data = await response.json();
                console.log("Datos recibidos del servidor:", data);

                if (response.ok) {
                    navigate("/profile");
                } else {
                    setError(data.message || "Unknown error occurred");
                    console.error(data); // Para depuración
                }
            } catch (error) {
                setError("Error: Failed to fetch");
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ my: 10 }}>
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh", // Ensure full viewport height
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            ) : recipe ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        Update Recipe
                    </Typography>
                    <FormRecipe
                        title={title}
                        setTitle={setTitle}
                        coverPhoto={coverPhoto}
                        setCoverPhoto={setCoverPhoto}
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                        description={description}
                        setDescription={setDescription}
                        instructions={instructions}
                        setInstructions={setInstructions}
                        cookingTime={cookingTime}
                        setCookingTime={setCookingTime}
                        servings={servings}
                        setServings={setServings}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        categories={categories}
                        handleSubmit={handleSubmit}
                        coverPhotoUrl={recipe.cover_photo_url} // Pass existing cover photo URL
                    />
                </>
            ) : (
                <Typography variant="h6" color="textSecondary">
                    Recipe not found
                </Typography>
            )}
        </Container>
    );
};

export default UpdateRecipe;
