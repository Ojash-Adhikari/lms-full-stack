import Tag from '../models/Tag.js'
import Course from '../models/Course.js'

// Create a new tag
export const createTag = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ message: 'Tag name is required' })

    const existing = await Tag.findOne({ name })
    if (existing) return res.status(409).json({ message: 'Tag already exists' })

    const tag = await Tag.create({ name })
    res.status(201).json(tag)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get all tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 })
    res.json(tags)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get single tag
export const getTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id)
    if (!tag) return res.status(404).json({ message: 'Tag not found' })
    res.json(tag)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update tag
export const updateTag = async (req, res) => {
  try {
    const { name } = req.body
    const tag = await Tag.findById(req.params.id)
    if (!tag) return res.status(404).json({ message: 'Tag not found' })

    if (name) tag.name = name
    await tag.save()
    res.json(tag)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Delete tag and unset from courses that reference it
export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id)
    if (!tag) return res.status(404).json({ message: 'Tag not found' })

    // Remove tag reference from any courses that reference it in their tags array
    await Course.updateMany({ tags: tag._id }, { $pull: { tags: tag._id } })

    await tag.remove()
    res.json({ message: 'Tag deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
