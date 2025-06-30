import React, { useEffect, useState } from "react";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const res = await fetch("https://cinescope-backend-n7jh.onrender.com/api/watchlist", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      setWatchlist(data);
    } catch (err) {
      console.error(err);
      alert("❌ Error fetching watchlist");
    }
  };

  const removeMovie = async (id) => {
    try {
      await fetch(`https://cinescope-backend-n7jh.onrender.com/api/watchlist/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setWatchlist((prev) => prev.filter((movie) => movie._id !== id));
    } catch (err) {
      console.error(err);
      alert("❌ Error removing movie");
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", marginTop: "40px" }}>
      <h2>🎞️ My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies saved yet. Add some from Search! 🔍</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "20px",
          }}
        >
          {watchlist.map((movie) => (
            <div
              key={movie._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={
                  movie.poster !== "N/A"
                    ? movie.poster
                    : "https://via.placeholder.com/150"
                }
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />
              <h4>{movie.title}</h4>
              <p>{movie.year}</p>
              <button onClick={() => removeMovie(movie._id)}>❌ Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
