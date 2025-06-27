// SignupForm.jsx
import React, { useState } from "react";
import "./SignupForm.css"; // Make sure to create this CSS file

const SignupForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Signup successful! You can now log in.");
        setForm({ name: "", email: "", password: "" });
      } else {
        setMessage("❌ " + (data.error || "Signup failed"));
      }
    } catch {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="signup-page">
      <div className="glow-bg"></div>
      <form className="signup-box" onSubmit={handleSubmit}>
        <h2>📝 Create Your CineScope Account</h2>
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <i className="fas fa-envelope"></i>
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
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
        {message && <p className="signup-message">{message}</p>}

        <p className="switch-link">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
