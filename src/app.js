const express = require('express');

const mongoose = require('mongoose');

require('dotenv').config();

const customerRoutes = require('./routes/customerRoutes');
const barberRoutes = require('./routes/barberRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes   = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const wageRecordRoutes = require('./routes/wageRecordRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/customers",customerRoutes);
app.use("/barbers",barberRoutes);
app.use("/services",serviceRoutes);
app.use("/users",userRoutes);
app.use("/appointments",appointmentRoutes);
app.use("/attendances",attendanceRoutes);
app.use("/wageRecords",wageRecordRoutes);
app.use("/analytics",analyticsRoutes);



mongoose.connect(process.env.MONGO_URI, )
.then(()=>{
    console.log('connected to Mongodb');
})
.catch((err)=>{
    console.log(err);
});

app.get('/' , (req,res)=>{
    res.send('Salon Management Backend is Runnin');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});