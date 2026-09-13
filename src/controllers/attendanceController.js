const Attendance = require('../models/Attendance');

const createAttendance = async (req,res) => {

    try{
        const checkIn = new Date(req.body.checkIn);

        const checkOut = req.body.checkOut
            ? new Date(req.body.checkOut)
            : null;

        let totalHours = null;

        if (checkOut) {
            const difference = checkOut - checkIn;
            totalHours = difference / (1000 * 60 * 60);
        }

        const result = await Attendance.create({
            ...req.body,
            totalHours: totalHours
        });

        res.status(201).send(result);

    }   
    catch(err){
        res.status(500).send({
            message:err.message
        });
    }   
};

const getAllAttendance = async (req,res) => {

    try{
        const result = await Attendance.find()
            .populate("barber","user") 
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send({
            message:err.message
        });
    }
};

const getAttendanceById = async (req,res) => {

    try{
        const id = req.params.id;   
        const result = await Attendance.findById(id)
        .populate("barber","user");

        if(!result){
            return res.status(404).send({
                message:"Attendance not found"
            });
        }

        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send({
            message:err.message
        });
    }
};

const updateAttendance = async (req,res) => {

    try{
        const id = req.params.id;   
        const result = await Attendance.findByIdAndUpdate(
            id,
            req.body,
            {new:true});

         if(!result){
            res.status(404).send({
                message:"user not found"
            })
        }

        res.status(200).send(result)

    }
    catch(err){
        res.status(500).send({
            message:err.message
        });
    }
};

const deleteAttendance = async (req,res) => {

    try{
        const id = req.params.id;   
        const result = await Attendance.findByIdAndDelete(id);    

        if(!result){
            return res.status(404).send({
                message:"Attendance not found"
            });
        }
     
       res.status(200).send(result)
    }

    catch(err){
        res.status(500).send({
            message:err.message
        });
    }           
};

module.exports = {
    createAttendance,
    getAllAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
};