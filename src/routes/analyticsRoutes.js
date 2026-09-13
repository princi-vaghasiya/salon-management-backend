const express = require("express");

const router = express.Router();

const {TotalEarnings,ServicePerformance,BarberPerformance} = require("../controllers/analyticsController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * /analytics/total-earnings:
 *   get:
 *     summary: Get total earnings
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total earnings calculated from completed appointments
 *         content:
 *           application/json:
 *             example:
 *               - _id: null
 *                 totalEarnings: 4000
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.get(
    "/total-earnings",
    authMiddleware,
    roleMiddleware(["admin"]),
    TotalEarnings
);

/**
 * @swagger
 * /analytics/service-performance:
 *   get:
 *     summary: Get service performance
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Service booking and earnings performance
 *         content:
 *           application/json:
 *             example:
 *               - serviceName: Hair Cut
 *                 totalBookings: 2
 *                 totalEarnings: 1000
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.get(
    "/service-performance",
    authMiddleware,
    roleMiddleware(["admin"]),
    ServicePerformance
);

/**
 * @swagger
 * /analytics/barber-performance:
 *   get:
 *     summary: Get barber performance
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Barber booking and earnings performance
 *         content:
 *           application/json:
 *             example:
 *               - barberName: Jack Johnson
 *                 totalBookings: 2
 *                 totalEarnings: 1000
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.get(
    "/barber-performance",
    authMiddleware,
    roleMiddleware(["admin"]),
    BarberPerformance
);

module.exports = router;