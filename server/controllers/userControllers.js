const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const signin = async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});

        if (!existingUser) return res.status(404).json({ message: "user doesn't exist"});
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials"});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, "test", {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});
        
    } catch (error) {
        res.status(500).json({message: "something went wrong."});
    }
}

const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;
    console.log(req.body);

    try {
        const existingUser = await User.findOne({email});
        
        if (existingUser) return res.status(400).json({message: "user already exists"});
        
        if (password !== confirmPassword) return res.status.json({message: "passwords don't match"});

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const result = await User.create({email, hashedPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({ email: result.email, id: result._id}, "test", {expiresIn: "1h"});
        res.status(200).json({result, token});

    } catch (error) {
        res.status(500).json({message: "something went wrong."});
    }
}

module.exports = {signin, signup};