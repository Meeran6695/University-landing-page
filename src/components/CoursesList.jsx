import { Link } from 'react-router-dom'
import { university1Data, university2Data } from '../data/universities'

function CoursesList() {
  // Combine courses from both universities
  const allCourses = [
    ...university1Data.courses,
    ...university2Data.courses.filter(c => 
      !university1Data.courses.some(uc => uc.name === c.name)
    )
  ]

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
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <h1>All Courses</h1>
          <p>Explore our comprehensive range of programs</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="courses-grid">
            {allCourses.map((course, index) => (
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
    </div>
  )
}

export default CoursesList

