import { useParams, Link } from 'react-router-dom'
import { university1Data, university2Data } from '../data/universities'

function CourseDetails() {
  const { courseId } = useParams()
  const { university1Data: u1, university2Data: u2 } = { university1Data, university2Data }
  
  // In a real app, you'd fetch this from an API
  const allCourses = [
    {
      id: 'btech-cs',
      name: 'B.Tech Computer Science',
      university: 'TechVista University',
      duration: '4 Years',
      fees: { annual: '₹2,20,000', total: '₹8,80,000' },
      description: 'Comprehensive program covering software development, algorithms, data structures, and modern technologies.',
      curriculum: [
        'Programming Fundamentals',
        'Data Structures & Algorithms',
        'Database Management Systems',
        'Web Development',
        'Machine Learning',
        'Cloud Computing',
        'Software Engineering'
      ],
      career: ['Software Engineer', 'Full Stack Developer', 'Data Scientist', 'DevOps Engineer'],
      eligibility: '10+2 with Physics, Chemistry, and Mathematics (minimum 60%)'
    },
    {
      id: 'mba',
      name: 'MBA',
      university: 'TechVista University',
      duration: '2 Years',
      fees: { annual: '₹3,00,000', total: '₹6,00,000' },
      description: 'Advanced business management program with specializations in Finance, Marketing, and HR.',
      curriculum: [
        'Business Analytics',
        'Financial Management',
        'Marketing Strategy',
        'Human Resource Management',
        'Operations Management',
        'Strategic Management',
        'Leadership & Ethics'
      ],
      career: ['Business Analyst', 'Marketing Manager', 'HR Manager', 'Operations Manager'],
      eligibility: 'Bachelor\'s degree in any discipline (minimum 50%)'
    }
  ]

  const course = allCourses.find(c => c.id === courseId) || allCourses[0]

  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <h1>{course.name}</h1>
          <p>{course.university}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="course-details-grid">
            <div className="course-main">
              <div className="course-info-card">
                <h2>Course Overview</h2>
                <p>{course.description}</p>
              </div>

              <div className="course-info-card">
                <h2>Curriculum</h2>
                <ul className="curriculum-list">
                  {course.curriculum.map((subject, index) => (
                    <li key={index}>{subject}</li>
                  ))}
                </ul>
              </div>

              <div className="course-info-card">
                <h2>Career Opportunities</h2>
                <div className="career-tags">
                  {course.career.map((role, index) => (
                    <span key={index} className="career-tag">{role}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="course-sidebar">
              <div className="course-card-sidebar">
                <h3>Course Details</h3>
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{course.duration}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Annual Fee:</span>
                  <span className="detail-value">{course.fees.annual}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Fee:</span>
                  <span className="detail-value">{course.fees.total}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Eligibility:</span>
                  <span className="detail-value">{course.eligibility}</span>
                </div>
                <Link to="/" className="btn btn-primary btn-full">
                  Apply Now
                </Link>
              </div>

              <div className="course-card-sidebar">
                <h3>Quick Links</h3>
                <Link to="/" className="sidebar-link">View All Courses</Link>
                <Link to="/about" className="sidebar-link">About University</Link>
                <Link to="/contact" className="sidebar-link">Contact Admissions</Link>
                <Link to="/testimonials" className="sidebar-link">Student Reviews</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CourseDetails

