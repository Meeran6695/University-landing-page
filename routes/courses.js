import express from 'express'
import Course from '../models/Course.js'

const router = express.Router()

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 })
    res.json(courses)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create course
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body)
    await course.save()
    res.status(201).json(course)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json(course)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json(course)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json({ message: 'Course deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

