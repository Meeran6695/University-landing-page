import express from 'express'
import Message from '../models/Message.js'

const router = express.Router()

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message })
  }
})

// Get message by ID
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }
    res.json(message)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching message', error: error.message })
  }
})

// Create new message
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message, university } = req.body

    if (!fullName || !email || !phone || !subject || !message || !university) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const newMessage = new Message({
      fullName,
      email,
      phone,
      subject,
      message,
      university,
      status: 'unread'
    })

    await newMessage.save()
    res.status(201).json({ message: 'Message sent successfully', data: newMessage })
  } catch (error) {
    res.status(500).json({ message: 'Error creating message', error: error.message })
  }
})

// Update message status
router.put('/:id', async (req, res) => {
  try {
    const { status, reply, repliedBy } = req.body
    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    if (status) message.status = status
    if (reply) {
      message.reply = reply
      message.repliedAt = new Date()
      message.repliedBy = repliedBy || 'Admin'
      message.status = 'replied'
    }
    message.updatedAt = new Date()

    await message.save()
    res.json({ message: 'Message updated successfully', data: message })
  } catch (error) {
    res.status(500).json({ message: 'Error updating message', error: error.message })
  }
})

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id)
    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }
    res.json({ message: 'Message deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message })
  }
})

export default router
