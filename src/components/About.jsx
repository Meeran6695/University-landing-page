import { Link } from 'react-router-dom'

function About() {
  const milestones = [
    { year: '2010', title: 'University Founded', description: 'Started with a vision to provide quality education' },
    { year: '2015', title: 'NAAC Accreditation', description: 'Achieved NAAC A grade accreditation' },
    { year: '2018', title: '10,000+ Students', description: 'Reached milestone of 10,000 enrolled students' },
    { year: '2024', title: 'Global Recognition', description: 'Recognized as top private university' }
  ]

  const values = [
    { icon: '🎯', title: 'Excellence', description: 'Commitment to academic and professional excellence' },
    { icon: '🤝', title: 'Integrity', description: 'Upholding highest ethical standards' },
    { icon: '🌍', title: 'Innovation', description: 'Fostering creativity and innovation' },
    { icon: '💡', title: 'Leadership', description: 'Developing future leaders and change-makers' }
  ]

  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Excellence in Education Since 2010</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2010, we have been at the forefront of providing world-class education 
                to students across India. Our commitment to excellence, innovation, and student 
                success has made us one of the leading private universities in the country.
              </p>
              <p>
                With state-of-the-art infrastructure, experienced faculty, and industry-aligned 
                curriculum, we prepare our students to excel in their chosen fields and become 
                leaders in their communities.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <span className="placeholder-icon">🏛️</span>
                <p>University Campus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="cta-section">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of students who have transformed their futures with us</p>
            <div className="cta-buttons">
              <Link to="/" className="btn btn-primary">Apply Now</Link>
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

