const express = require("express")

const router = express.Router();

const { createBarber,getAllBarbers,getBarberById,updateBarber,deleteBarber} = require("../controllers/barberController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


/**
 * @swagger
 * /barbers:
 *   post:
 *     summary: Create a new barber
 *     tags: [Barbers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: 6a7a0da691d29d85ccc75b49
 *               specialization:
 *                 type: string
 *                 example: Hair Cutting
 *               commissionPercentage:
 *                 type: number
 *                 example: 10
 *               joiningDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-01"
 *               workingHoursStart:
 *                 type: string
 *                 example: "09:00"
 *               workingHoursEnd:
 *                 type: string
 *                 example: "18:00"
 *     responses:
 *       201:
 *         description: Barber created successfully
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.post("/",authMiddleware,roleMiddleware(["admin"]),createBarber);

/**
 * @swagger
 * /barbers:
 *   get:
 *     summary: Get all barbers
 *     tags: [Barbers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Barbers retrieved successfully
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.get("/",authMiddleware,roleMiddleware(["admin","barber"]),getAllBarbers);

/**
 * @swagger
 * /barbers/{id}:
 *   get:
 *     summary: Get barber by ID
 *     tags: [Barbers]
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
 *         description: Barber retrieved successfully
 *       404:
 *         description: Barber not found
 *       401:
 *         description: No token provided or invalid token
 */
router.get("/:id",authMiddleware,roleMiddleware(["admin","barber"]),getBarberById);

/**
 * @swagger
 * /barbers/{id}:
 *   patch:
 *     summary: Update barber
 *     tags: [Barbers]
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
 *               specialization:
 *                 type: string
 *                 example: Head Massage
 *               commissionPercentage:
 *                 type: number
 *                 example: 10
 *               workingHoursStart:
 *                 type: string
 *                 example: "09:00"
 *               workingHoursEnd:
 *                 type: string
 *                 example: "18:00"
 *     responses:
 *       200:
 *         description: Barber updated successfully
 *       404:
 *         description: Barber not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.patch("/:id",authMiddleware,roleMiddleware(["admin"]),updateBarber);

/**
 * @swagger
 * /barbers/{id}:
 *   delete:
 *     summary: Delete barber
 *     tags: [Barbers]
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
 *         description: Barber deleted successfully
 *       404:
 *         description: Barber not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.delete("/:id",authMiddleware,roleMiddleware(["admin"]),deleteBarber);

module.exports = router;