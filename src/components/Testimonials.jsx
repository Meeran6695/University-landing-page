import { useState } from 'react'

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      course: 'B.Tech Computer Science',
      year: '2023',
      rating: 5,
      text: 'The university provided excellent facilities and faculty support. The placement cell helped me secure a job at a top tech company.',
      image: '👨‍💼'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      course: 'MBA',
      year: '2022',
      rating: 5,
      text: 'Amazing learning experience! The industry exposure and practical knowledge I gained here was invaluable for my career growth.',
      image: '👩‍💼'
    },
    {
      id: 3,
      name: 'Amit Patel',
      course: 'B.Tech Mechanical',
      year: '2023',
      rating: 5,
      text: 'Great infrastructure and labs. The professors are highly qualified and always ready to help. Highly recommend!',
      image: '👨‍🔧'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      course: 'BCA',
      year: '2024',
      rating: 5,
      text: 'The curriculum is industry-relevant and the placement assistance is outstanding. I got placed in my dream company!',
      image: '👩‍💻'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      course: 'BBA LLB',
      year: '2023',
      rating: 5,
      text: 'Excellent faculty and modern facilities. The moot court sessions and internships prepared me well for my legal career.',
      image: '👨‍⚖️'
    },
    {
      id: 6,
      name: 'Ananya Das',
      course: 'MCA',
      year: '2022',
      rating: 5,
      text: 'The university focuses on both theoretical knowledge and practical skills. The coding competitions and hackathons were amazing!',
      image: '👩‍🎓'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <h1>Student Testimonials</h1>
          <p>Hear from our alumni and students</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.image}</div>
                  <div className="testimonial-info">
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.course} • {testimonial.year}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="testimonial-carousel">
            <div className="carousel-controls">
              <button onClick={prevTestimonial} className="carousel-btn">‹</button>
            </div>
            <div className="carousel-content">
              <div className="testimonial-card featured">
                <div className="testimonial-header">
                  <div className="testimonial-avatar large">
                    {testimonials[currentIndex].image}
                  </div>
                  <div className="testimonial-info">
                    <h3>{testimonials[currentIndex].name}</h3>
                    <p>{testimonials[currentIndex].course} • {testimonials[currentIndex].year}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {'⭐'.repeat(testimonials[currentIndex].rating)}
                </div>
                <p className="testimonial-text">"{testimonials[currentIndex].text}"</p>
              </div>
            </div>
            <div className="carousel-controls">
              <button onClick={nextTestimonial} className="carousel-btn">›</button>
            </div>
          </div>
          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials

