import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CANDIDATE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Signup data:", { name, email, role });

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      console.log("Signup Response:", res.data);

      alert("Signup successful! Please login.");
      navigate("/login");

    } catch (err) {
      console.error("Signup Error:", err);
      
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="page door-page">
    <div className="door open">
      <form className="form" onSubmit={handleSignup}>
        <h2>Signup</h2>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />

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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={loading}
        >
          <option value="CANDIDATE">Candidate</option>
          <option value="HR">HR</option>
        </select>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  </div>
);

}