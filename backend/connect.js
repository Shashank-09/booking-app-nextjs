const mongoose = require('mongoose');

async function connectDB(MONGODB_URL){
    try{
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to DB");
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;