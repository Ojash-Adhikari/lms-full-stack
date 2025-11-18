import express from 'express'
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router()

/**
 * @swagger
 * /api/educator/update-role:
 *   get:
 *     summary: Update user role to educator
 *     description: Convert a regular user to an educator
 *     tags:
 *       - Educator
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
educatorRouter.get('/update-role', updateRoleToEducator)


/**
 * @swagger
 * /api/educator/add-course:
 *   post:
 *     summary: Create a new course
 *     description: Create a new course with course details and image
 *     tags:
 *       - Educator
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               level:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - Must be an educator
 *       500:
 *         description: Server error
 */
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)


/**
 * @swagger
 * /api/educator/courses:
 *   get:
 *     summary: Get educator's courses
 *     description: Retrieve all courses created by the authenticated educator
 *     tags:
 *       - Educator
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses
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
educatorRouter.get('/courses', protectEducator, getEducatorCourses)


/**
 * @swagger
 * /api/educator/dashboard:
 *   get:
 *     summary: Get educator dashboard data
 *     description: Retrieve dashboard statistics and analytics for the educator
 *     tags:
 *       - Educator
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)


/**
 * @swagger
 * /api/educator/enrolled-students:
 *   get:
 *     summary: Get enrolled students data
 *     description: Retrieve data about all students enrolled in the educator's courses
 *     tags:
 *       - Educator
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of enrolled students
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData)

export default educatorRouter;