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
import RecipePage from "./pages/RecipePage";
import Register from "./pages/Register";
import Footer from "./components/Footer";

function AppContent() {
    const location = useLocation();
    const showHeader = location.pathname !== "/login";

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
                    <Route path="/recipes" element={<RecipePage />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
