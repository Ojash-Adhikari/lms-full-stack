import express from 'express'
import {
  createTag,
  getTags,
  getTag,
  updateTag,
  deleteTag
} from '../controllers/tagController.js'

const tagRouter = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Tag
 *     description: Tag management
 */

/**
 * @swagger
 * /api/tag:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: JavaScript
 *     responses:
 *       201:
 *         description: Tag created
 *       400:
 *         description: Tag name is required
 *       409:
 *         description: Tag already exists
 */
tagRouter.post('/', createTag)

/**
 * @swagger
 * /api/tag:
 *   get:
 *     summary: Get list of tags
 *     tags: [Tag]
 *     responses:
 *       200:
 *         description: Array of tags
 */
tagRouter.get('/', getTags)

/**
 * @swagger
 * /api/tag/{id}:
 *   get:
 *     summary: Get a tag by ID
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag object
 *       404:
 *         description: Tag not found
 */
tagRouter.get('/:id', getTag)

/**
 * @swagger
 * /api/tag/{id}:
 *   put:
 *     summary: Update a tag by ID
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Frontend
 *     responses:
 *       200:
 *         description: Updated tag
 *       404:
 *         description: Tag not found
 */
tagRouter.put('/:id', updateTag)

/**
 * @swagger
 * /api/tag/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag deleted
 *       404:
 *         description: Tag not found
 */
tagRouter.delete('/:id', deleteTag)

export default tagRouter
