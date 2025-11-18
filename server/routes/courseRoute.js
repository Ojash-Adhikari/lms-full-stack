import express from 'express'
import { getAllCourse, getCourseId } from '../controllers/courseController.js';

const courseRouter = express.Router()

/**
 * @swagger
 * /api/course/all:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve a list of all available courses
 *     tags:
 *       - Course
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter courses by category
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *         description: Filter courses by level
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of all courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Server error
 */
courseRouter.get('/all', getAllCourse)


/**
 * @swagger
 * /api/course/{id}:
 *   get:
 *     summary: Get course by ID
 *     description: Retrieve detailed information about a specific course
 *     tags:
 *       - Course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
courseRouter.get('/:id', getCourseId)

export default courseRouter;