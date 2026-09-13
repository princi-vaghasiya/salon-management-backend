const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({

    barber:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Barber",
        required:true
    },

    checkIn:{
        type:Date,
        required:true
    },

    checkOut:{
        type:Date
    },

    date:{
        type:Date,  
        required:true
    },
    
    totalHours:{
    type:Number
    },

});

module.exports = mongoose.model("Attendance", AttendanceSchema);