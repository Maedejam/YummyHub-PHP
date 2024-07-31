// src/pages/RecipePage.js
import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import FilterSidebar from "../components/FilterSidebar";
import "./RecipePage.css";

import EggFriedImg from "../img/Egg-Fried.webp";
import InstantPotImg from "../img/instant-pot.jpg";
import FrenchBreadImg from "../img/french-bread.jpg";

const sampleRecipes = [
    {
        id: 1,
        title: "Egg Fried Rice",
        author: "Amanda Suarez",
        cooking_time: 15,
        votes: 18,
        cover_photo_url: EggFriedImg,
        description: "Delicious egg fried rice",
        instructions: "Cook the rice, add eggs, stir-fry with vegetables.",
    },
    {
        id: 2,
        title: "Instant Pot Mac & Cheese",
        author: "Ella Quittner",
        cooking_time: 20,
        votes: 29,
        cover_photo_url: InstantPotImg,
        description: "Creamy and cheesy mac & cheese",
        instructions: "Cook pasta, add cheese, cook in instant pot.",
    },
    {
        id: 3,
        title: "French Bread Pepperoni Pizza",
        author: "Milton Clark",
        cooking_time: 25,
        votes: 11,
        cover_photo_url: FrenchBreadImg,
        description: "Crispy French bread with pepperoni",
        instructions: "Spread sauce on bread, add toppings, bake in oven.",
    },
];

const filters = [
    {
        title: "Cuisine Types",
        options: [
            { label: "Italian", value: "italian" },
            { label: "Mexican", value: "mexican" },
            { label: "Indian", value: "indian" },
            { label: "Asian", value: "asian" },
            { label: "Mediterranean", value: "mediterranean" },
            { label: "American", value: "american" },
            { label: "Middle Eastern", value: "middle-eastern" },
            { label: "African", value: "african" },
            { label: "French", value: "french" },
        ],
    },
    {
        title: "Diet Preference",
        options: [
            { label: "Vegetarian", value: "vegetarian" },
            { label: "Vegan", value: "vegan" },
            { label: "Gluten Free", value: "gluten-free" },
            { label: "Keto", value: "keto" },
        ],
    },
    {
        title: "Meal Type",
        options: [
            { label: "Breakfast", value: "breakfast" },
            { label: "Lunch", value: "lunch" },
            { label: "Dinner", value: "dinner" },
            { label: "Snack", value: "snack" },
        ],
    },
    {
        title: "Ingredients",
        options: [
            { label: "Chicken", value: "chicken" },
            { label: "Beef", value: "beef" },
            { label: "Fish", value: "fish" },
            { label: "Vegetables", value: "vegetables" },
        ],
    },
    {
        title: "Cooking Time",
        options: [
            { label: "Less than 30 minutes", value: "less-30" },
            { label: "30-60 minutes", value: "30-60" },
            { label: "More than 60 minutes", value: "more-60" },
        ],
    },
    {
        title: "Allergies",
        options: [
            { label: "Dairy Free", value: "dairy-free" },
            { label: "Nut Free", value: "nut-free" },
            { label: "Egg Free", value: "egg-free" },
        ],
    },
];

const RecipePage = () => {
    const [recipes, setRecipes] = useState(sampleRecipes);
    const [filteredRecipes, setFilteredRecipes] = useState(sampleRecipes);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setRecipes(sampleRecipes);
        setFilteredRecipes(sampleRecipes);
    }, []);

    const handleFilterChange = (e) => {
        const { value, checked } = e.target;
        let newFilters = [...selectedFilters];

        if (checked) {
            newFilters.push(value);
        } else {
            newFilters = newFilters.filter((filter) => filter !== value);
        }

        setSelectedFilters(newFilters);
        filterRecipes(newFilters, searchTerm);
    };

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        filterRecipes(selectedFilters, value);
    };

    const filterRecipes = (filters, search) => {
        let filtered = recipes;

        if (filters.length > 0) {
            filtered = filtered.filter((recipe) =>
                filters.some(
                    (filter) =>
                        (recipe.cuisine_type || []).includes(filter) ||
                        (recipe.diet_preference || []).includes(filter)
                )
            );
        }

        if (search) {
            filtered = filtered.filter((recipe) =>
                recipe.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredRecipes(filtered);
    };

    return (
        <div className="recipe-page">
            <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
            />
            <div className="recipe-content">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by dish, ingredient..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <RecipeList recipes={filteredRecipes} />
            </div>
        </div>
    );
};

export default RecipePage;
