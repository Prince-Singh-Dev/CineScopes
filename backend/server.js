//Backend sever set up
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT||5000;

//middlewares
app.use(cors());
app.use(express.json());


// Route
const omdbRoutes = require("./routes/omdb");
const authRoutes = require("./routes/auth");
const watchlistRoutes = require("./routes/watchlistRoutes");

app.use("/api/omdb",omdbRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/watchlist", watchlistRoutes);

app.get("/",(req,res)=>{
    res.send("🎬 CineScope Backend API Running");
});

//MongoDB connection

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>
        app.listen(PORT,()=>console.log(`Backend running on port ${PORT}`))
    )
    .catch((err)=>console.error("Mongo Error",err));