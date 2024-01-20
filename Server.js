const express = require("express")
const app = express()
require("dotenv").config()
const User = require("./Models/AuthModels")
const dbconnection = require("./DBConnection/dbconnection")
const Auth = require("./Controllers/Auth")
const cookieparser = require("cookie-parser")

// Middleares
app.use(express.json())
app.use(cookieparser())

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`App is running at port : ${PORT}`)
})

app.use("/mychat/Auth", Auth)