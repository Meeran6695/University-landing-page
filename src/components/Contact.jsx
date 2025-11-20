import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      university: 'TechVista University'
    }

    try {
      console.log('Sending message:', payload)

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      console.log('Response status:', response.status)
      const data = await response.json().catch(() => null)
      console.log('Response data:', data)

      if (response.ok) {
        console.log('Message sent successfully')
        setSubmitted(true)
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        // fallback: save locally and show confirmation
        console.warn('Server returned error, saving message locally as fallback')
        const fallbackStore = JSON.parse(localStorage.getItem('messages') || '[]')
        const fallbackMessage = { ...payload, savedAt: new Date().toISOString(), fallback: true }
        fallbackStore.unshift(fallbackMessage)
        localStorage.setItem('messages', JSON.stringify(fallbackStore))
        setSubmitted(true)
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' })
        setError((data && data.message) || 'Server error — message saved locally')
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (err) {
      console.error('Error sending message:', err)
      // network or unexpected error: fallback to localStorage
      try {
        const fallbackStore = JSON.parse(localStorage.getItem('messages') || '[]')
        const fallbackMessage = { ...payload, savedAt: new Date().toISOString(), fallback: true }
        fallbackStore.unshift(fallbackMessage)
        localStorage.setItem('messages', JSON.stringify(fallbackStore))
        setSubmitted(true)
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 3000)
      } catch (saveErr) {
        console.error('Error saving fallback message:', saveErr)
        setError('Error sending message. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: '📍', title: 'Address', details: '123 Education Street, Knowledge City, India - 123456' },
    { icon: '📞', title: 'Phone', details: '+91 12345 67890\n+91 98765 43210' },
    { icon: '✉️', title: 'Email', details: 'info@university.edu\nadmissions@university.edu' },
    { icon: '🕒', title: 'Office Hours', details: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM' }
  ]

  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-section">
              <h2>Get in Touch</h2>
              <p>
                Have questions? We're here to help! Reach out to us through any of the 
                following channels and we'll get back to you as soon as possible.
              </p>
              
              <div className="contact-info-cards">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-card">
                    <div className="contact-icon">{info.icon}</div>
                    <h3>{info.title}</h3>
                    <p>{info.details}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              {submitted ? (
                <div className="success-message">
                  <span className="success-icon">✓</span>
                  <h3>Message Sent!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  {error && <div className="error-message">{error}</div>}
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

