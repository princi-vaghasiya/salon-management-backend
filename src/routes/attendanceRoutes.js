const express = require('express');
const router = express.Router();

const {createAttendance,getAllAttendance,getAttendanceById,updateAttendance,deleteAttendance} = require("../controllers/attendanceController");
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /attendances:
 *   post:
 *     summary: Create attendance record
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - barber
 *               - checkIn
 *               - date
 *             properties:
 *               barber:
 *                 type: string
 *                 example: 6a6334fac9529059dafe01bd
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-08-21T09:00:00.000+05:30"
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-08-21T18:00:00.000+05:30"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-08-21T00:00:00.000+05:30"
 *     responses:
 *       201:
 *         description: Attendance created successfully
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */

router.post("/",authMiddleware,roleMiddleware(["admin","barber  "]),createAttendance);


/**
 * @swagger
 * /attendances:
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance records retrieved successfully
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */

router.get("/",authMiddleware,roleMiddleware(["admin","barber"]),getAllAttendance);
/**
 * @swagger
 * /attendances/{id}:
 *   get:
 *     summary: Get attendance record by ID
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a6334fac9529059dafe01bd
 *     responses:
 *       200:
 *         description: Attendance record retrieved successfully
 *       404:
 *         description: Attendance record not found
 *       401:
 *         description: No token provided or invalid token
 */
router.get("/:id",authMiddleware, roleMiddleware(["admin","barber"]),getAttendanceById);
/**
 * @swagger
 * /attendances/{id}:
 *   patch:
 *     summary: Update an attendance record
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a6334fac9529059dafe01bd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *       404:
 *         description: Attendance record not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.patch("/:id",authMiddleware,roleMiddleware(["admin"]),updateAttendance);
/**
 * @swagger
 * /attendances/{id}:
 *   delete:
 *     summary: Delete an attendance record
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a6334fac9529059dafe01bd
 *     responses:
 *       200:
 *         description: Attendance record deleted successfully
 *       404:
 *         description: Attendance record not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.delete("/:id",authMiddleware,roleMiddleware(["admin"]),deleteAttendance);

module.exports = router;