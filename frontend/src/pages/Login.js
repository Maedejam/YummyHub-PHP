import React, { useState } from "react";
import {
    Button,
    TextField,
    Grid,
    Paper,
    Typography,
    Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            navigate("/profile");
        } else {
            // Handle login error
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <Container maxWidth="md">
            <Grid
                container
                spacing={2}
                sx={{ minHeight: "100vh", alignItems: "center" }}
            >
                <Grid item xs={12} md={6}>
                    <Paper elevation={6} sx={{ p: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
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
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
            </Grid>
        </Container>
    );
};

export default Login;
