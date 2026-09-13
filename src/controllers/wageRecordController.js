const WageRecord = require("../models/WageRecord");
const Appointment = require("../models/Appointment");
const Barber = require("../models/Barber");

const createWageRecord = async (req, res) => {
    try {

        const barber = await Barber.findById(req.body.barber);

        if(!barber){
            return res.status(404).send({
                message:"barber not found"
            });
        }

        const completedAppointments = await Appointment.find({
            barber:req.body.barber,
            status:"completed"
        }).populate("service");

        let commission = 0;

        for(const appointment of completedAppointments){

            const servicePrice = appointment.service.price;
            commission +=(servicePrice * barber.commissionPercentage) / 100;

        }

        const salary = req.body.salary || 0;

        const totalAmount = salary + commission;

        const result = await WageRecord.create({

            barber:req.body.barber,
            month:req.body.month,
            salary: salary,
            commission: commission,
            totalAmount: totalAmount

        });

        res.status(201).send(result);
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

const getAllWageRecords = async (req, res) => {
    try {
        const result = await WageRecord.find()
            .populate("barber","user");

        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

const getWageRecordById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await WageRecord.findById(id)
            .populate("barber","user");

        if (!result) {
            return res.status(404).send({
                message: "Wage record not found"
            });
        }

        res.status(200).send(result);

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

const updateWageRecord = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await WageRecord.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!result) {
            return res.status(404).send({
                message: "Wage record not found"
            });
        }

        res.status(200).send(result);

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

const deleteWageRecord = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await WageRecord.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({
                message: "Wage record not found"
            });
        }

        res.status(200).send(result);

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

module.exports = {
    createWageRecord,
    getAllWageRecords,
    getWageRecordById,
    updateWageRecord,
    deleteWageRecord
};