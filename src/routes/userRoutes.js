const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


const {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
} = require("../controllers/UserController");


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: princee@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful and JWT token returned
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: barber
 *     responses:
 *       201:
 *         description: User created successfully
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.post("/",authMiddleware, roleMiddleware(["admin"]),createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.get("/",authMiddleware,roleMiddleware(["admin"]),getAllUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a6e18374392914b0a235c79
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.get("/:id", authMiddleware,roleMiddleware(["admin"]) ,getUserById);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a6e18374392914b0a235c79
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               role:
 *                 type: string
 *                 example: barber
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.patch("/:id", authMiddleware,roleMiddleware(["admin"]),updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a6e18374392914b0a235c79
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Access denied
 */
router.delete("/:id",authMiddleware, roleMiddleware(["admin"]),deleteUser);

module.exports = router;