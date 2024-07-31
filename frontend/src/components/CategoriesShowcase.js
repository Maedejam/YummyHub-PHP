import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";

const CategoriesShowcase = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) =>
                console.error("Error fetching categories:", error)
            );
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                backgroundImage: "url('/upload/1722215175.jpg')", // Reemplaza con la URL de tu imagen de fondo
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px", // Ajusta la altura según tu necesidad
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Opacidad sobre la imagen de fondo
                    zIndex: 1,
                }}
            />
            <Typography
                variant="h4"
                component="h1"
                sx={{ zIndex: 2, textAlign: "center", mb: 4 }}
            >
                What are you in the mood for today?
            </Typography>
            <Container
                sx={{
                    display: "flex",
                    gap: 3,
                    zIndex: 2,
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {categories.map((category) => (
                    <Box
                        key={category.id}
                        sx={{
                            position: "relative",
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            cursor: "pointer",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgb(213 202 0 / 74%)", // Opacidad sobre la imagen del círculo
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{ color: "white", textAlign: "center" }}
                            >
                                {category.name}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Container>
        </Box>
    );
};

export default CategoriesShowcase;
