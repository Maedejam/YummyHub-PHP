import React from "react";
import "../css/Home.css";
import Hero from "../components/Hero";
import RecipesCards from "../components/RecipesCards";
import RecipeWeek from "../components/RecipeWeek";

function Home() {
    return (
        <>
            <Hero />
            <RecipesCards />
            <RecipeWeek />
        </>
    );
}

export default Home;
