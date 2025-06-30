import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom"; // 👈 Add this
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 👈 Get the navigate function

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://cinescope-backend-n7jh.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("✅ Login Successful!");
        onLogin?.(); // Notify App to setToken
        navigate("/"); // 👈 Redirect to search page
      } else {
        setMessage("❌ " + (data.error || "Invalid credentials"));
      }
    } catch {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="glow-bg"></div>
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>🎬 Welcome Back to CineScope</h2>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">🔓 Log In</button>
        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
