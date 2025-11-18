import express from 'express'
import { getRecommendedCourses } from '../controllers/recommendationController.js'

const recommendedRouter = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Recommendation
 *     description: Course recommendation endpoints
 */

/**
 * @swagger
 * /api/recommendation/recommendations:
 *   get:
 *     summary: Get recommended courses
 *     description: Retrieve personalized course recommendations based on user tags and preferences
 *     tags: [Recommendation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Maximum number of recommendations to return
 *     responses:
 *       200:
 *         description: List of recommended courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   courseTitle:
 *                     type: string
 *                   courseDescription:
 *                     type: string
 *                   coursePrice:
 *                     type: number
 *                   courseThumbnail:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: object
 *                   similarity:
 *                     type: number
 *       401:
 *         description: Unauthorized - Authentication required
 *       500:
 *         description: Server error
 */
recommendedRouter.get('/recommendations', getRecommendedCourses)

export default recommendedRouter