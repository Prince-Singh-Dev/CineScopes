const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async(req,res) => {
    const{name , email , password}=req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({error : "User Already Exists"});

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({ name , email , password : hashedPassword});

        const token = jwt.sign({ id: newUser._id},process.env.JWT_SECRET,{
            expiresIn : "7d",
        });

        res.json({token, user:{id : newUser._id , name : newUser.name} });
    }   catch (err){
        res.status(500).json({error : "Sign UP Failed"});
    }
};

exports.login = async (req,res) => {
    const { email , password } =req.body;

    try{
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({ error : "Invalid email or password "});

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch)
            return res.status(400).json({error : "Invalid email or password"});

        const token = jwt.sign({ id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });

        res.json({token , user:{id:user._id, name : user.name} });
    }   catch(err){
        res.status(500).json({ error : "Login Failed"});
    }
};