// src/pages/Login.js
import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Agregar estado para mensajes de error
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(""); // Limpiar el mensaje de error

        fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    // Almacena el token en localStorage
                    localStorage.setItem("token", data.token);
                    navigate("/profile");
                } else {
                    setError("Invalid credentials. Please try again.");
                }
            })
            .catch((error) => setError("Error: Failed to fetch"));
    };

    return (
        <Grid container sx={{ minHeight: "100vh" }}>
            <Grid item xs={12} md={6}>
                <Box
                    sx={{
                        backgroundImage: "url(food.jpg)", // Asegúrate de poner la ruta correcta
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100%",
                    }}
                />
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
            >
                <Container maxWidth="xs">
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                    {error && (
                        <Typography color="error" gutterBottom>
                            {error}
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Submit
                        </Button>
                    </form>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Login;
