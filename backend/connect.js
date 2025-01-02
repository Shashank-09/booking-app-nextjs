const mongoose = require('mongoose');

async function connectDB(Url){
    try{
        await mongoose.connect(Url);
        console.log("Connected to DB");
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;