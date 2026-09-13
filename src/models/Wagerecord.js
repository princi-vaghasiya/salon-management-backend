const mongoose = require("mongoose");

const WageRecordSchema = new mongoose.Schema({

    barber:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Barber",
        required:true
    },

    month:{
        type:String,
        required:true
    },

    salary:{
        type:Number,
        default:0
    },

    commission:{
        type:Number,
        default:0
    },

    totalAmount:{
        type:Number,
        required:true
    }

});

module.exports = mongoose.model("WageRecord", WageRecordSchema);