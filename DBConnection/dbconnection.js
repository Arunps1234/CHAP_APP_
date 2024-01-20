const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/CHAT_APP_").then(res=>{
    console.log("Connected to db successfully!")
}).catch(err=>{
    console.log(`Failed to connect db ${err}`)
})