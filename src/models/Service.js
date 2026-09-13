const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({

    serviceName:{
        type:String,
        required:true
    },

    duration:{
        type:Number,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    description:{
        type:String,
    }

})

module.exports = mongoose.model("Service",ServiceSchema);

