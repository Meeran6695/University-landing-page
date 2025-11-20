import express from 'express'
import Application from '../models/Application.js'

const router = express.Router()

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 })
    res.json(applications)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create application
router.post('/', async (req, res) => {
  try {
    const application = new Application(req.body)
    await application.save()
    res.status(201).json(application)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get application by ID
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }
    res.json(application)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update application
router.put('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }
    res.json(application)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete application
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id)
    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }
    res.json({ message: 'Application deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

