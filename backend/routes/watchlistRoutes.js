const express = require("express");
const router = express.Router();
const Watchlist = require("../models/Watchlist");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

//MiddleWare to verify JWT and extract user

function verifyToken(req,res,next){
    const token = req.headers.authorization;

    if(!token)
        return res.status(401).json({error : "No token , access denied"});

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ error : "Invalid token "});
    }
}

module.exports = verifyToken;

// Add to WatchList 

router.post("/",verifyToken ,async(req,res) => {
    const {imdbID , title , poster , year} = req.body;

    try{
        //checking for duplications 
        const exists = await Watchlist.findOne({imdbID,userId:req.user.id});
        if ( exists) return res.status(409).json({ error : " Already in WatchList "});

        const newItem = new Watchlist({
            userId : req.user.id,
            imdbID,
            title,
            poster,
            year,
        });

        await newItem.save();
        res.json(newItem);
    } catch ( err){
        res.status(500).json({ error : "Server Error"});
    }
});

//Getting User's Watchlist : 

router.get("/",verifyToken,async(req,res)=>{
    try{
        const list = await Watchlist.find({userId : req.user.id});
        res.json(list);
    } catch (err){
        res.status(500).json({ error : " Server Error"});
    }
});

// To delete any movie from the user watchlist 

router.delete("/:id",verifyToken,async(req,res)=>{
    try{
        await Watchlist.findByIdAndDelete(req.params.id);
        res.json({ message : "Removed From Watchlist"});
    } catch(err){
        res.status(500).json({ error : "Server Error"});
    }
});

module.exports = router;