const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const watchlistSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    imdbID : {
        type : String,
        required : true,
    },
    title : String,
    poster : String,
    year : String,
});

module.exports = mongoose.model("Watchlist",watchlistSchema);