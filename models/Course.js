import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  annualFee: {
    type: String,
    required: true
  },
  totalFee: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  curriculum: [{
    type: String
  }],
  careerOpportunities: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  studentsEnrolled: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Course', courseSchema)

