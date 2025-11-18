import express from 'express'
import { addUserRating, getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from '../controllers/userController.js';

const userRouter = express.Router()

/**
 * @swagger
 * /api/user/data:
 *   get:
 *     summary: Get user profile data
 *     description: Retrieve the authenticated user's profile information
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
userRouter.get('/data', getUserData)

/**
 * @swagger
 * /api/user/purchase:
 *   post:
 *     summary: Purchase a course
 *     description: Purchase a course using Stripe payment
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course to purchase
 *     responses:
 *       200:
 *         description: Purchase successful
 *       400:
 *         description: Bad request - Missing or invalid parameters
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRouter.post('/purchase', purchaseCourse)

/**
 * @swagger
 * /api/user/enrolled-courses:
 *   get:
 *     summary: Get user's enrolled courses
 *     description: Retrieve all courses the user is enrolled in
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of enrolled courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRouter.get('/enrolled-courses', userEnrolledCourses)

/**
 * @swagger
 * /api/user/update-course-progress:
 *   post:
 *     summary: Update course progress
 *     description: Update the user's progress in a course
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *               lessonId:
 *                 type: string
 *               isCompleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Progress updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRouter.post('/update-course-progress', updateUserCourseProgress)

/**
 * @swagger
 * /api/user/get-course-progress:
 *   post:
 *     summary: Get course progress
 *     description: Get the user's progress in a specific course
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course progress retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRouter.post('/get-course-progress', getUserCourseProgress)

/**
 * @swagger
 * /api/user/add-rating:
 *   post:
 *     summary: Add or update course rating
 *     description: Add or update a rating for a course
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               review:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rating added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRouter.post('/add-rating', addUserRating)

export default userRouter;