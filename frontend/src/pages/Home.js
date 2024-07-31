import React from "react";
import "../css/Home.css";
import Hero from "../components/Hero";
import RecipesCards from "../components/RecipesCards";
import RecipeWeek from "../components/RecipeWeek";
import CategoriesShowcase from "../components/CategoriesShowcase";

function Home() {
    return (
        <>
            <Hero />
            <RecipesCards />
            <RecipeWeek />
            <CategoriesShowcase />
        </>
    );
}

export default Home;
