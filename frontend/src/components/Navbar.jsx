import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();           // Clear token in App.js
    navigate("/signup");  // Redirect to signup page
  };

  return (
    <nav style={{ backgroundColor: "#111", padding: "10px 20px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2>CineScope</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "#0ff", textDecoration: "none" }}>Search</Link>
        <Link to="/watchlist" style={{ color: "#0ff", textDecoration: "none" }}>Watchlist</Link>
        <button onClick={handleLogout} style={{ background: "transparent", border: "none", color: "#f55", cursor: "pointer", fontSize: "16px" }}>
          🔒 Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#111",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #333",
  },
  logo: {
    color: "#00e5ff",
    margin: 0,
    fontSize: "24px",
    textShadow: "0 0 10px #00e5ff99",
  },
  links: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
  logout: {
    padding: "8px 16px",
    background: "#ff4d4d",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
  }
};

export default Navbar;
