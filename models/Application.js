import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  intakeYear: {
    type: String,
    required: true
  },
  consent: {
    type: Boolean,
    required: true,
    default: false
  },
  university: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Application', applicationSchema)

