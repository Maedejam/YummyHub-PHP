// src/components/RegistrationForm.js
import React, { useState } from "react";
import axios from "axios";
import "../css/Register.css";

const RegistrationForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            name: name,
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/api/users",
                user
            );
            console.log(response.data);
            // Handle successful registration
        } catch (error) {
            console.error(error);
            // Handle registration error
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-left">
                <h2>Embark on a culinary journey with us!</h2>
                <p>
                    Sign up to unlock a world of delicious recipes, and
                    personalized cooking experiences.
                </p>
            </div>
            <div className="registration-right">
                <div className="registration-form">
                    <h2>Create an Account</h2>
                    <div className="social-signin">
                        <button className="btn social-btn">
                            Sign up with Facebook
                        </button>
                        <button className="btn social-btn">
                            Sign up with Google
                        </button>
                    </div>
                    <p className="or">OR</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>E-mail Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn">
                            Create Account
                        </button>
                    </form>
                    <p>
                        Already have an account? <a href="/login">Log In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
