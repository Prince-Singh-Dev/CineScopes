//API Key testings

const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const OMDB_URL = "http://www.omdbapi.com/";

router.get("/movie",async(req,res)=>{
    const {title} = req.query;

    if(!title) return res.status(400).json({error : "Missing movie title"});

    try{
        const response = await axios.get(OMDB_URL,{
            params:{
                t:title,
                apikey:process.env.OMDB_API_KEY,
            },
        });

        if(response.data.Response === "False"){
            return res.status(404).json({error:"Movie not found "});
        }

        res.json(response.data);
    } catch (error) {
        res.status(500).json({error : "OMDB API Failed"});
    }
});

module.exports = router;