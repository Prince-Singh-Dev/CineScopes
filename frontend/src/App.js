import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import SearchForm from "./components/SearchForm";
import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Listen to changes in localStorage (for multi-tab sync if needed)
  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token") || "");
    };
    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  const handleLogin = () => {
    setToken(localStorage.getItem("token"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <Router>
      {token && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={token ? <SearchForm /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={!token ? <SignupForm /> : <Navigate to="/" />} />
        <Route path="/login" element={!token ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/watchlist" element={token ? <Watchlist /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
