import { Link } from 'react-router-dom'

function Courses({ courses }) {
  const getCourseId = (courseName) => {
    const mapping = {
      'Engineering': 'btech-cs',
      'Business Management': 'mba',
      'Computer Applications': 'bca',
      'Law': 'ba-llb',
      'Engineering (AI & Data Science)': 'btech-ai',
      'Architecture & Design': 'barch',
      'Pharmacy': 'bpharm'
    }
    return mapping[courseName] || 'btech-cs'
  }

  return (
    <section className="section courses">
      <div className="container">
        <h2 className="section-title">Our Courses</h2>
        <div className="courses-grid">
          {courses.map((course, index) => (
            <Link 
              key={index} 
              to={`/courses/${getCourseId(course.name)}`}
              className="course-card"
            >
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <span className="duration">{course.duration}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Courses

