import React from "react";
import { Typography, TextField, Container } from "@mui/material";

function Hero() {
    return (
        <div className="hero-container">
            <div className="overlay" />
            <div className="content">
                <Container>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Welcome to the Home Page
                    </Typography>
                    <TextField
                        className="search-box"
                        variant="outlined"
                        placeholder="Search..."
                        InputProps={{
                            style: {
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                            },
                        }}
                    />
                </Container>
            </div>
        </div>
    );
}

export default Hero;
