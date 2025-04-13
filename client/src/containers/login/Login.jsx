import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/Api"; 

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            setError("Email and Password are required.");
            return;
        }

        try {
            const response = await loginUser({ email: trimmedEmail, password: trimmedPassword });

            console.log("Login Response:", response);

            if (response?.token) {  
                localStorage.setItem("token", response.token);
                
                // ✅ Redirect to Landing Page after login
                navigate("/landing", { replace: true });
            } else {
                setError(response?.error || "Invalid credentials.");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.error || "Login failed. Try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-4 rounded shadow-lg w-25">
                <h2 className="text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Login
                    </button>
                </form>
                <p className="mt-3 text-center">Don't have an account?</p>
                <Link to="/register" className="btn btn-outline-secondary w-100">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;
