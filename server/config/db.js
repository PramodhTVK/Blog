require("dotenv").config();
const mongoose = require('mongoose');

const connectToDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }
    catch{
        console.log("Failed to connect")
    }
}

module.exports = connectToDB;