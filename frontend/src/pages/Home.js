import React from "react";
import "../css/Home.css";
import Hero from "../components/Hero";
import RecipesCards from "../components/RecipesCards";

function Home() {
    return (
        <>
            <Hero />
            <RecipesCards />
        </>
    );
}

export default Home;
