const express = require("express");

const router = express.Router();

const {
    createWageRecord,
    getAllWageRecords,
    getWageRecordById,
    updateWageRecord,
    deleteWageRecord
} = require("../controllers/wageRecordController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


/**
 * @swagger
 * /wageRecords:
 *   post:
 *     summary: Create wage record with automatic commission calculation
 *     tags: [Wage Records]
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
 *               - month
 *             properties:
 *               barber:
 *                 type: string
 *                 example: 6a6334fac9529059dafe01bd
 *               month:
 *                 type: string
 *                 example: August
 *               salary:
 *                 type: number
 *                 example: 1000
 *     responses:
 *       201:
 *         description: Wage record created successfully
 *       404:
 *         description: Barber not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.post("/", authMiddleware,roleMiddleware(["admin"]),createWageRecord);

/**
 * @swagger
 * /wageRecords:
 *   get:
 *     summary: Get all wage records
 *     tags: [Wage Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wage records retrieved successfully
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.get("/", authMiddleware,roleMiddleware(["admin"]),getAllWageRecords);

/**
 * @swagger
 * /wageRecords/{id}:
 *   get:
 *     summary: Get wage record by ID
 *     tags: [Wage Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6aa5159f82ffcd044edeae9b
 *     responses:
 *       200:
 *         description: Wage record retrieved successfully
 *       404:
 *         description: Wage record not found
 *       401:
 *         description: No token provided or invalid token
 */
router.get("/:id", authMiddleware, roleMiddleware(["admin"]), getWageRecordById);

/**
 * @swagger
 * /wageRecords/{id}:
 *   patch:
 *     summary: Update wage record
 *     tags: [Wage Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6aa5159f82ffcd044edeae9b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               salary:
 *                 type: number
 *                 example: 1500
 *               month:
 *                 type: string
 *                 example: August
 *     responses:
 *       200:
 *         description: Wage record updated successfully
 *       404:
 *         description: Wage record not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.patch("/:id", authMiddleware,roleMiddleware(["admin"]),updateWageRecord);

/**
 * @swagger
 * /wageRecords/{id}:
 *   delete:
 *     summary: Delete wage record
 *     tags: [Wage Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6aa5159f82ffcd044edeae9b
 *     responses:
 *       200:
 *         description: Wage record deleted successfully
 *       404:
 *         description: Wage record not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.delete("/:id", authMiddleware,roleMiddleware(["admin"]),deleteWageRecord);

module.exports = router;