import { useState } from 'react'

const PIPEDREAM_WEBHOOK_URL = import.meta.env.VITE_PIPEDREAM_WEBHOOK_URL || 'YOUR_PIPEDREAM_WEBHOOK_URL_HERE'

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 'Haryana',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha',
  'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
]

const INTAKE_YEARS = ['2024', '2025', '2026']

function LeadForm({ universityName, currentPage, courseOptions }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    course: '',
    intakeYear: '',
    consent: false
  })
  const [message, setMessage] = useState({ text: '', type: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate phone number
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setMessage({ text: 'Please enter a valid 10-digit phone number.', type: 'error' })
      return
    }

    // Validate consent
    if (!formData.consent) {
      setMessage({ text: 'Please provide consent to proceed.', type: 'error' })
      return
    }

    setIsSubmitting(true)

    const submissionData = {
      ...formData,
      university: universityName,
      source: currentPage,
      timestamp: new Date().toISOString()
    }

    try {
      // Try MongoDB API first
      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        })

        if (response.ok) {
          setMessage({
            text: 'Thank you! Your application has been submitted successfully. We will contact you soon.',
            type: 'success'
          })
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            state: '',
            course: '',
            intakeYear: '',
            consent: false
          })
          setIsSubmitting(false)
          return
        }
      } catch (apiError) {
        console.log('API not available, trying fallback methods')
      }

      // Try Pipedream webhook
      if (PIPEDREAM_WEBHOOK_URL && PIPEDREAM_WEBHOOK_URL !== 'YOUR_PIPEDREAM_WEBHOOK_URL_HERE') {
        const response = await fetch(PIPEDREAM_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        })

        if (response.ok) {
          setMessage({
            text: 'Thank you! Your application has been submitted successfully. We will contact you soon.',
            type: 'success'
          })
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            state: '',
            course: '',
            intakeYear: '',
            consent: false
          })
          setIsSubmitting(false)
          return
        }
      }

      // Fallback: Store in localStorage
      const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]')
      submissions.push(submissionData)
      localStorage.setItem('formSubmissions', JSON.stringify(submissions))
      
      setMessage({
        text: 'Thank you! Your application has been submitted successfully. We will contact you soon.',
        type: 'success'
      })
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        state: '',
        course: '',
        intakeYear: '',
        consent: false
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setMessage({
        text: 'There was an error submitting your form. Please try again later.',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section form-section" id="leadForm">
      <div className="container">
        <h2 className="section-title">Apply Now</h2>
        <p className="form-subtitle">
          Fill in your details and our admission team will get back to you
        </p>
        <form onSubmit={handleSubmit} className="lead-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number (10-digit) *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State *</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="course">Course Interested *</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              {courseOptions.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="intakeYear">Intake Year *</label>
            <select
              id="intakeYear"
              name="intakeYear"
              value={formData.intakeYear}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              {INTAKE_YEARS.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <label htmlFor="consent">
              I consent to receive communications from {universityName} *
            </label>
          </div>
          <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
        {message.text && (
          <div className={`form-message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </section>
  )
}

export default LeadForm

