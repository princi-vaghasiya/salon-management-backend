const express = require("express");

const router = express.Router();

const {createAppointment,getAllAppointment,getAppointmentById,UpdateAppointment,DeleteAppointment} = require("../controllers/appointmentController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer
 *               - barber
 *               - service
 *               - appointmentDate
 *             properties:
 *               customer:
 *                 type: string
 *                 example: 6a6dba3d085b54fdfbadfa25
 *               barber:
 *                 type: string
 *                 example: 6a6334fac9529059dafe01bd
 *               service:
 *                 type: string
 *                 example: 6a639611537f88cc297c15d0
 *               appointmentDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-08-21T10:00:00.000+05:30"
 *               remarks:
 *                 type: string
 *                 example: Regular appointment
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Appointment outside working hours or salon holiday
 *       404:
 *         description: Barber or service not found
 *       409:
 *         description: Barber is already booked at this time
 */
router.post("/",authMiddleware,roleMiddleware(["customer","admin"]),createAppointment);


router.post("/",authMiddleware,roleMiddleware(["customer","admin"]),createAppointment);
router.get("/",authMiddleware,roleMiddleware(["admin","barber","customer"]),getAllAppointment);
router.get("/:id",authMiddleware,roleMiddleware(["admin","barber","customer"]),getAppointmentById);
router.patch("/:id",authMiddleware,roleMiddleware(["admin","barber","customer"]),UpdateAppointment);
router.delete("/:id",authMiddleware,roleMiddleware(["admin","customer"]),DeleteAppointment);

module.exports = router;