// src/pages/AboutPage.js
import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 5, mt: 8 }}>
            <Typography variant="h2" gutterBottom fontWeight={600}>
                About Us
            </Typography>
            <Typography variant="h4" gutterBottom>
                Welcome to YummyHub!
            </Typography>
            <Typography paragraph>
                At YummyHub, we're passionate about bringing people together
                through the joy of cooking and sharing delicious recipes. Our
                platform is designed to inspire home cooks and food enthusiasts
                from around the world to explore, create, and share their
                favorite dishes.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Our Mission
            </Typography>
            <Typography paragraph>
                Our mission is simple: to make cooking enjoyable and accessible
                for everyone. We believe that great food brings people together,
                creates lasting memories, and enriches our lives. Whether you're
                a seasoned chef or just starting out in the kitchen, we provide
                a space where you can discover new recipes, share your culinary
                creations, and connect with a community of like-minded food
                lovers.
            </Typography>
            <Typography variant="h5" gutterBottom>
                What We Offer
            </Typography>
            <Typography paragraph>
                <ul>
                    <li>
                        <strong>A Diverse Collection of Recipes:</strong> From
                        quick weeknight dinners to elaborate holiday feasts, our
                        recipe database has something for everyone. Search by
                        ingredient, cuisine, or meal type to find the perfect
                        dish for any occasion.
                    </li>
                    <li>
                        <strong>User Contributions:</strong> Our community of
                        users can add their own recipes, complete with photos
                        and detailed instructions. Share your culinary
                        masterpieces and get inspired by the creations of
                        others.
                    </li>
                    <li>
                        <strong>Helpful Resources:</strong> Explore our blog for
                        cooking tips, ingredient guides, and meal planning
                        advice. We aim to provide valuable information to help
                        you cook with confidence and creativity.
                    </li>
                </ul>
            </Typography>
            <Typography variant="h5" gutterBottom>
                Meet Our Team
            </Typography>
            <Typography paragraph>
                Our team is made up of passionate food enthusiasts, skilled
                chefs, and dedicated home cooks who love to experiment in the
                kitchen. We come from diverse backgrounds and bring a wealth of
                experience to our platform, ensuring that YummyHub is always
                fresh, engaging, and full of useful content.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Join Us
            </Typography>
            <Typography paragraph>
                We invite you to join our community and be part of our culinary
                journey. Whether you're here to find new recipes, share your own
                creations, or simply enjoy the art of cooking, we're thrilled to
                have you with us.
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button
                    component={Link}
                    to="/recipe/add"
                    variant="contained"
                    color="primary"
                >
                    Add a Recipe
                </Button>
            </Box>
        </Container>
    );
};

export default AboutPage;
