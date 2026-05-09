import React, { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", res.data);

      // ✅ USE CONTEXT LOGIN (THIS TRIGGERS RE-RENDER)
      const user = login(res.data);

      console.log("User logged in:", user);

      // ✅ NAVIGATE IMMEDIATELY (NO DELAY NEEDED)
      if (user.role === "HR") {
        navigate("/hr/dashboard", { replace: true });
      } else {
        navigate("/candidate/dashboard", { replace: true });
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="page door-page">
    <div className="door open">
      <form className="form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  </div>
);

}