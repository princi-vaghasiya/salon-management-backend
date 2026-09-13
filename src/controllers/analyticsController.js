const Appointment = require("../models/Appointment");

const TotalEarnings = async (req, res) => {
    try {
        const result = await Appointment.aggregate([

            {
                $match: {
                    status: "completed"
                }
            },

            {
                $lookup: {
                    from: "services",
                    localField: "service",
                    foreignField: "_id",
                    as: "serviceData"
                }
            },

            {
                $unwind: "$serviceData"
            },

            {
                $group: {
                    _id: null,
                    totalEarnings: {
                        $sum: "$serviceData.price"
                    }
                }
            }

        ]);

        res.status(200).send(result);

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};


const ServicePerformance = async (req, res) => {

    try {
        const result = await Appointment.aggregate([

            {
                $match: {
                    status: "completed"
                }
            },

            {
                $lookup: {
                    from: "services",
                    localField: "service",
                    foreignField: "_id",
                    as: "serviceData"
                }
            },

            {
                $unwind: "$serviceData"
            },

            {
                $group: {
                    _id: "$serviceData.ServiceName",
                    totalBookings:{
                        $sum:1
                    },
                    totalEarnings: {
                        $sum: "$serviceData.price"
                    }
                    
                }
            },

                        {
                $project: {
                    _id: 0,
                    serviceName: "$_id",
                    totalBookings: 1,
                    totalEarnings: 1
                }
            },

            {
                $sort: {
                    totalEarnings: -1
                }
            }

        ]);

        res.status(200).send(result);

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    } 
    
}

const BarberPerformance = async (req, res) => {
    try {
        const result = await Appointment.aggregate([

            {
                $match: {
                    status: "completed"
                }
            },

            {
                $lookup: {
                    from: "barbers",
                    localField: "barber",
                    foreignField: "_id",
                    as: "barberData"
                }
            },

            {
                $unwind: "$barberData"
            },

            {
                $lookup: {
                    from: "services",
                    localField: "service",
                    foreignField: "_id",
                    as: "serviceData"
                }
            },

            {
                $unwind: "$serviceData"
            },

            {
                $group: {
                    _id: "$barberData.user",
                    totalBookings: {
                        $sum: 1
                    },
                    totalEarnings: {
                        $sum: "$serviceData.price"
                    }
                }
            },

            {
                $project: {
                _id: 0,
                barberName: "$_id",
                totalBookings: 1,
                totalEarnings: 1
                }
            },

            {
                $sort: {
                    totalEarnings: -1
                }
            }

        ]);

        res.status(200).send(result);

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

module.exports = { TotalEarnings,ServicePerformance,BarberPerformance };