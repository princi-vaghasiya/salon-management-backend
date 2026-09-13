const mongoose = require("mongoose");

const BarberSchema = new mongoose.Schema({

    user:{
        type:String,
        ref:"User",
        required:true
    },

    specialization:{
        type:String
    },

    commissionPercentage:{
        type:Number,
        required:true
    },

    joiningDate:{
        type:Date,
        required:true
    },

    workingHoursStart: {
    type: String,
    required: true
    },

    workingHoursEnd: {
    type: String,
    required: true
    },

});

module.exports = mongoose.model("Barber", BarberSchema);

