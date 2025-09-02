// src/admin/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


import '../../styles/admin/Login.css';

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/auth/login", { username, password });
      if (response.status === 200) {
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (err) {
      const message = err?.response?.data?.error || "Invalid username or password";
      setError(message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Sign in to manage your school website</p>
        </div>
        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>{error}</div>}
        <form className="login-form" onSubmit={handleLogin} autoComplete="off">
          <div className="input-group">
            <label htmlFor="admin_username">Username</label>
            <input
              type="text"
              id="admin_username"
              name="admin_username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="admin_password">Password</label>
            <input
              type="password"
              id="admin_password"
              name="admin_password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <button className="login-button" type="submit">Login</button>
        </form>
        <div className="login-footer">
          <p>&copy; {new Date().getFullYear()} Entebbe Parents Admin Panel</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
