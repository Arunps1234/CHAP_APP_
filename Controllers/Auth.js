const express = require("express");
const Router = express.Router();
const User = require("../Models/AuthModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Registration
Router.post("/signup", async (req, res) => {
    const { firstname, lastname, email, phone, password } = req.body

    if (!firstname || !lastname || !email || !phone || !password) {
        return res.json({ "msg": "All fields are mandatory" })
    }
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
        return res.json({ "msg": "User Already registered with this email address" })
    }

    else {
        const hashpassword = await bcrypt.hash(password, 10)
        const createUser = await User.create({
            firstname,
            lastname,
            email,
            phone,
             password : hashpassword
        });

        if (createUser) {
            return res.status(201).json({ "msg": "User registered successfully" })
        }
        else {
            return res.json({ "msg": "Failed to create your Account" })
        }
    }

})



// Login
Router.post("/login", async(req, res)=>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({"msg":"All fields are mandatory"})
    }

    const checkUser = await User.findOne({email});

    if (checkUser && await bcrypt.compare(password, checkUser.password)){

        const token = jwt.sign({
            id : checkUser._id
        }, process.env.SECRETE_KEY)
         res.cookie("Token", token).json({"msg":"Registerd successfully"}); console.log(req.cookies)

    }

    else {
        return res.json({"msg":"Invalid email address or password"})
    }



})


module.exports = Router