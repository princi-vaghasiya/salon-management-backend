const express = require("express");

const router = express.Router();

const{createService,getAllService,getServiceById,updateService,deleteService} = require("../controllers/serviceController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceName
 *               - duration
 *               - price
 *             properties:
 *               serviceName:
 *                 type: string
 *                 example: Hair Cut
 *               duration:
 *                 type: number
 *                 example: 30
 *               price:
 *                 type: number
 *                 example: 500
 *               description:
 *                 type: string
 *                 example: Professional hair cutting service
 *     responses:
 *       201:
 *         description: Service created successfully
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.post("/",authMiddleware,roleMiddleware(["admin"]),createService);

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Services retrieved successfully
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.get("/",authMiddleware,roleMiddleware(["admin","barber","customer"]),getAllService);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a639611537f88cc297c15d0
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *       404:
 *         description: Service not found
 *       401:
 *         description: No token provided or invalid token
 */
router.get("/:id",authMiddleware,roleMiddleware(["admin","barber","customer"]),getServiceById);

/**
 * @swagger
 * /services/{id}:
 *   patch:
 *     summary: Update a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a639611537f88cc297c15d0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceName:
 *                 type: string
 *                 example: Hair Cut
 *               duration:
 *                 type: number
 *                 example: 30
 *               price:
 *                 type: number
 *                 example: 500
 *               description:
 *                 type: string
 *                 example: Updated service description
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       404:
 *         description: Service not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.patch("/:id",authMiddleware,roleMiddleware(["admin"]),updateService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a639611537f88cc297c15d0
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.delete("/:id",authMiddleware,roleMiddleware(["admin"]),deleteService);

module.exports = router;

