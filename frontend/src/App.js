// src/App.js
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Login from "./pages/Login";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import AddRecipe from "./pages/AddRecipe";
import Recipes from "./pages/Recipes";
import UpdateRecipe from "./pages/UpdateRecipe";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Importa el archivo del tema
import AboutPage from "./components/About";

function AppContent() {
    const location = useLocation();
    const showHeader =
        location.pathname !== "/login" && location.pathname !== "/register";

    return (
        <>
            {showHeader && <Header />}
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipe/:id" element={<Recipe />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/recipe/add" element={<AddRecipe />} />
                    <Route path="/recipe/edit/:id" element={<UpdateRecipe />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </div>
            {showHeader && <Footer />}
        </>
    );
}

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                {" "}
                {/* Envuelve tu contenido con ThemeProvider */}
                <AppContent />
            </ThemeProvider>
        </Router>
    );
}

export default App;
