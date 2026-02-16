import React, { useState } from "react";
import api from "../../api/axiosConfig";
import "./VerificationModal.css"; // We will create this next

export default function VerificationModal({ isOpen, email, onClose, onVerified }) {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            // Hits your backend: @PostMapping("/verify")
            await api.post("/auth/verify", {
                email: email,
                verificationCode: code
            });

            alert("Account Verified Successfully! You can now login.");
            onVerified(); // Closes modal and switches to login view
        } catch (err) {
            setError(err.response?.data?.message || "Invalid verification code.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Verify Your Account</h2>
                <p>Enter the 6-digit code sent to <strong>{email}</strong></p>

                <form onSubmit={handleVerify}>
                    <input
                        type="text"
                        placeholder="Enter Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength="6"
                        required
                    />

                    {error && <p className="error-msg">{error}</p>}

                    <button type="submit">Verify Account</button>
                    <button type="button" className="close-btn" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}