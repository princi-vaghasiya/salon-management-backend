const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({

    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        required:true
    },

    barber:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Barber",
        required:true
    },

    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required:true
    },

    appointmentDate:{
        type:Date,
        required:true
    },

    status:{
        type:String,
        enum:["Pending","Confirmed","In Progress","Completed","Cancelled"],
        default:"Pending"
    },

    remarks:{
        type:String
    }
});


AppointmentSchema.index({barber:1});
AppointmentSchema.index({appointmentDate:1});
AppointmentSchema.index({status:1});


module.exports = mongoose.model("Appointment", AppointmentSchema);