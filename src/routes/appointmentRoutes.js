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


/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all appointments
 */
router.get("/",authMiddleware,roleMiddleware(["admin","barber","customer"]),getAllAppointment);


/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment found
 *       404:
 *         description: Appointment not found
 */
router.get("/:id",authMiddleware,roleMiddleware(["admin","barber","customer"]),getAppointmentById);


/**
 * @swagger
 * /appointments/{id}:
 *   patch:
 *     summary: Update appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *               remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       404:
 *         description: Appointment not found
 */
router.patch("/:id",authMiddleware,roleMiddleware(["admin","barber","customer"]),UpdateAppointment);


/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 */
router.delete("/:id",authMiddleware,roleMiddleware(["admin","customer"]),DeleteAppointment);

module.exports = router;