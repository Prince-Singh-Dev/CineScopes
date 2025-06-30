import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch(`http://www.omdbapi.com/?apikey=cdb0adc5&s=${query}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        alert("❌ No movies found!");
      }
    } catch (err) {
      alert("⚠️ Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async (movie) => {
    try {
      const res = await fetch("https://cinescope-backend-n7jh.onrender.com/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          imdbID: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Added to Watchlist!");
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      alert("❌ Server Error");
    }
  };

  return (
    <div className="search-page">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🎥 Search your favorite movies..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "⏳" : "🔍"}
        </button>
      </form>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={movie.Title}
            />
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
            <button
              className="add-btn"
              onClick={() => handleAddToWatchlist(movie)}
            >
              ➕ Add to Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;
