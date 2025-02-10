import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/User.js";
import SiteProfile from "../models/SiteProfile.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

//Register User
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const saltRounds = 10;

        if (!email || !password) {
            return res.status(400).json({error: "Email and password are required"});
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: "Email already in use"});
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword});
        await newUser.save();
        
        res.status(201).json({message: "User Registered!"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({error: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) return res.status(400).json({error: "Password does not match"});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h"});

        res.json({token, user});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/dashboard", async (req, res) => {
    const {website, username, password} = req.body;


})

export default router;