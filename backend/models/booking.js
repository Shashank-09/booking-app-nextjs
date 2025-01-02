const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date : {
        type : Date,
        required : true
    },
    time : {
       type : String,
       required : true
    },
    guests : {
        type : String,
        required : true
    },
    name  : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    email : {
        type : String,
    }

})

const Booking = mongoose.model("Booking" , bookingSchema)
module.exports = Booking