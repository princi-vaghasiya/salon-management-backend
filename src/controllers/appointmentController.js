const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const Barber = require('../models/Barber');
const Holiday = require('../models/Holiday');

const createAppointment = async(req,res)=>{

    try{

        // 1. Find service
        const service = await Service.findById(req.body.service);

        if (!service) {
            return res.status(404).send({
                message: "Service not found"
            });
        }


        // 2. Find barber
        const barber = await Barber.findById(req.body.barber);

        if (!barber) {
            return res.status(404).send({
                message: "Barber not found"
            });
        }


        // 3. Calculate appointment start and end
        const startTime = new Date(req.body.appointmentDate);

        // Check if the appointment date is a holiday
        const holidayDate = startTime.toISOString().split("T")[0];

        const holiday = await Holiday.findOne({
            date: holidayDate
        });

        if (holiday) {
            return res.status(400).send({
            message: `Salon is closed on this date: ${holiday.reason}`
        });
}


        const endTime = new Date(
            startTime.getTime() +
            service.duration * 60 * 1000
        );


        // 4. Convert barber working hours to numbers
        const [startHour, startMinute] =
            barber.workingHoursStart.split(":").map(Number);

        const [endHour, endMinute] =
            barber.workingHoursEnd.split(":").map(Number);


        const barberStartMinutes =
            startHour * 60 + startMinute;

        const barberEndMinutes =
            endHour * 60 + endMinute;


        // 5. Convert appointment time to numbers
        const appointmentStartMinutes =
            startTime.getHours() * 60 +
            startTime.getMinutes();

        const appointmentEndMinutes =
            endTime.getHours() * 60 +
            endTime.getMinutes();


        // 6. Check barber working hours
        if (
            appointmentStartMinutes < barberStartMinutes ||
            appointmentEndMinutes > barberEndMinutes
        ) {
            return res.status(400).send({
                message: "Appointment is outside barber working hours"
            });
        }


        // 7. Find existing appointments for same barber
        const existingAppointments = await Appointment.find({
            barber: req.body.barber
        });


        // 8. Check overlap
        for (const appointment of existingAppointments) {

            const existingService =
                await Service.findById(appointment.service);

            const existingStartTime =
                new Date(appointment.appointmentDate);

            const existingEndTime = new Date(
                existingStartTime.getTime() +
                existingService.duration * 60 * 1000
            );


            if (
                startTime < existingEndTime &&
                endTime > existingStartTime
            ) {
                return res.status(409).send({
                    message: "Barber is already booked at this time"
                });
            }
        }


        // 9. Create appointment
        const result = await Appointment.create(req.body);

        res.status(201).send(result);


    }catch(err){

        res.status(500).send({
            message: err.message
        });

    }
};

const getAllAppointment = async(req,res)=>{

    try{

        const result = await Appointment.find()
            .populate("customer")
            .populate("barber")
            .populate("service")

        res.status(200).send(result)

    }catch(err){
        res.status(500).send({
            message:err.message
        });

    }
};


const getAppointmentById = async(req,res)=>{

    try{
         const id = req.params.id


        const result = await Appointment.findById(id)
            .populate("customer")
            .populate("barber")
            .populate("service")

        if(!result){
            res.status(404).send({
                message:"appointment not found"
            })
        }

        res.status(200).send(result)

    }catch(err){

        res.status(500).send({
            message:err.message
        });

    }
};

const UpdateAppointment = async(req,res)=>{
    try{
        const id = req.params.id

        const result = await Appointment.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        )

        if(!result){

            res.status(404).send({
                message:"appointment not found"
            })
        }

        res.status(200).send(result)

    }catch(err){

        res.status(500).send({
            message:err.message
        });

    }
};

const DeleteAppointment = async(req,res)=>{
    try{
        const id = req.params.id

        const result = await Appointment.findByIdAndDelete(id)

        if(!result){
            res.status(404).send({
                message:"appointment not found"
            })
        }

        res.status(200).send(result)

    }catch(err){

        res.status(500).send({
            message:err.message
        });

    }
};

module.exports = {
    createAppointment,
    getAllAppointment,
    getAppointmentById,
    UpdateAppointment,
    DeleteAppointment
}