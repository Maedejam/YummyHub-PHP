// src/components/FormRecipe.js
import React from "react";
import {
    Button,
    TextField,
    Grid,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
} from "@mui/material";

const FormRecipe = ({
    title,
    setTitle,
    coverPhoto,
    setCoverPhoto,
    ingredients,
    setIngredients,
    description,
    setDescription,
    instructions,
    setInstructions,
    cookingTime,
    setCookingTime,
    servings,
    setServings,
    selectedCategory,
    setSelectedCategory,
    categories,
    handleSubmit,
    coverPhotoUrl,
}) => {
    const base_path = (path) => `${window.location.origin}/${path}`;

    return (
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
                    ) : coverPhotoUrl ? (
                        <img
                            src={`${base_path("")}${coverPhotoUrl}`}
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                            label="Category"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
            </Grid>
        </Grid>
    );
};

export default FormRecipe;
