const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true
    },

    phone:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        unique:true
    },

    gender:{
        type:String,
        enum:["Male" , "Female" , "other"]
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Customer",CustomerSchema)