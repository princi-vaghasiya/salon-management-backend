const roleMiddleware = require("../middlewares/roleMiddleware");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");



const { createCustomer , getAllCustomers , getCustomerById , updateCustomer , deleteCustomer} = require("../controllers/customerController");


/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             name: Jack Rehus
 *             email: jack@gmail.com
 *             password: "1234"
 *             role: customer
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.post("/",authMiddleware,roleMiddleware(["admin","barber","customer"]), createCustomer);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.get("/",authMiddleware, roleMiddleware(["admin","barber"]),getAllCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a6dba3d085b54fdfbadfa25
 *     responses:
 *       200:
 *         description: Customer retrieved successfully
 *       404:
 *         description: Customer not found
 */
router.get("/:id",authMiddleware,roleMiddleware(["admin","barber","customer"]),getCustomerById);
/**
 * @swagger
 * /customers/{id}:
 *   patch:
 *     summary: Update customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a6dba3d085b54fdfbadfa25
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jack Rehus
 *               email:
 *                 type: string
 *                 example: jack@gmail.com
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */

router.patch("/:id" ,authMiddleware,roleMiddleware(["admin","customer"]), updateCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a6dba3d085b54fdfbadfa25
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.delete("/:id",authMiddleware,roleMiddleware(["admin"]),deleteCustomer);


module.exports = router;