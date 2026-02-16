import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./LoginRegister.css";
import VerificationModal from "./VerificationModal";

export default function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [showVerifyModal, setShowVerifyModal] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({ username: "", email: "", password: "" });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- API LOGIC ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            // --- LOGIN LOGIC ---
            try {
                // Your backend findByEmail(username) requires email for authentication
                const response = await api.post("/auth/login", {
                    email: formData.email || formData.username, // Fallback if user types email in username box
                    password: formData.password
                });

                // Extract 'token' as defined in your LoginResponse.java
                const token = response.data.token;
                localStorage.setItem("jwt_token", token);

                alert("Login Successful!");
                navigate("/dashboard");

            } catch (error) {
                console.error("Login Error:", error);
                alert("Login Failed: " + (error.response?.data?.message || "Check credentials"));
            }
        } else {
            // --- SIGNUP LOGIC ---
            try {
                // Hits @PostMapping("/signup") in your AuthenticationController
                await api.post("/auth/signup", {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });

                setShowVerifyModal(true);
            } catch (error) {
                console.error("Signup Error:", error);
                alert("Signup Failed: " + (error.response?.data?.message || "Try again"));
            }
        }
    };

    const loginImg = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop";
    const registerImg = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop";

    return (
        <div className="login-component">
            <div className="container">
                <div
                    className={`side ${!isLogin ? "slide-right" : ""}`}
                    style={{ backgroundImage: `url(${isLogin ? loginImg : registerImg})` }}
                >
                    <h2 className="brand-logo">TUTION CREEK</h2>
                </div>

                <div className={`form-container ${isLogin ? "login" : "register"}`}>
                    <div className="form-content">
                        <h2>Welcome to <strong>TUTION CREEK</strong></h2>
                        <p className="subtitle">
                            {isLogin ? "Welcome Back, Please login to your account." : "Join us, Create your account below."}
                        </p>

                        <form onSubmit={handleSubmit}>
                            {/* In Login mode, we use this as Email since backend authenticates by email */}
                            <div className="input-group">
                                <input
                                    type={isLogin ? "email" : "text"}
                                    name={isLogin ? "email" : "username"}
                                    placeholder={isLogin ? "Email Address" : "Username"}
                                    value={isLogin ? formData.email : formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {!isLogin && (
                                <div className="input-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            <div className="input-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {isLogin && (
                                <div className="form-options">
                                    <label><input type="checkbox" /> Remember me</label>
                                    <span className="forgot">Forgot password?</span>
                                </div>
                            )}

                            <div className="button-group">
                                <button type="submit" className="btn-login">
                                    {isLogin ? "Login" : "Sign Up"}
                                </button>
                                <button type="button" className="btn-toggle" onClick={toggleForm}>
                                    {isLogin ? "Create Account" : "Back to Login"}
                                </button>
                            </div>
                        </form>

                        <p className="terms">
                            By signing up you agree to Tution Creek's <br />
                            <span>Terms & Conditions | Privacy Policy</span>
                        </p>
                    </div>
                </div>
            </div>

            <VerificationModal
                isOpen={showVerifyModal}
                email={formData.email}
                onClose={() => setShowVerifyModal(false)}
                onVerified={() => {
                    setShowVerifyModal(false);
                    toggleForm();
                }}
            />
        </div>
    );
}