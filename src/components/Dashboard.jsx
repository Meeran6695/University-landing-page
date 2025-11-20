import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Dashboard() {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      // Fetch applications
      const appRes = await fetch('/api/applications')
      if (appRes.ok) {
        const appData = await appRes.json()
        setApplications(appData || [])
      }

      // Fetch courses
      const courseRes = await fetch('/api/courses')
      if (courseRes.ok) {
        const courseData = await courseRes.json()
        setCourses(courseData || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { label: 'Applications', value: applications.length.toString(), icon: '📝' },
    { label: 'Courses Enrolled', value: courses.length.toString(), icon: '📚' },
    { label: 'Documents', value: (user?.documents?.length || 0).toString(), icon: '📄' },
    { label: 'Messages', value: (user?.messages?.length || 0).toString(), icon: '💬' }
  ]

  const recentActivity = [
    ...(applications.slice(0, 2).map(app => ({
      action: 'Application Submitted',
      course: app.courseName || 'Course',
      date: new Date(app.submittedAt || app.createdAt).toLocaleDateString(),
      status: app.status || 'pending'
    })) || []),
    { action: 'Profile Updated', course: '-', date: new Date(user?.updatedAt || user?.createdAt).toLocaleDateString(), status: 'completed' }
  ]

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.fullName || 'Student'}!</h1>
          <p>Here's your academic dashboard</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/" className="btn btn-secondary">Browse Courses</Link>
          <Link to="/contact" className="btn btn-primary">Contact Support</Link>
        </div>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-dashboard">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>My Applications</h2>
          <div className="applications-list">
            {applications.length > 0 ? (
              applications.slice(0, 3).map((app, index) => (
                <div key={index} className="application-item">
                  <div>
                    <h4>{app.courseName || 'Course Name'}</h4>
                    <p className="text-muted">
                      Submitted on {new Date(app.submittedAt || app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`status-badge ${app.status || 'pending'}`}>
                    {app.status || 'pending'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-muted">No applications yet</p>
            )}
            <Link to="/" className="view-all-link">View All Applications →</Link>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    {activity.action.includes('Application') && '📝'}
                    {activity.action.includes('Document') && '📄'}
                    {activity.action.includes('Profile') && '👤'}
                  </div>
                  <div className="activity-content">
                    <h4>{activity.action}</h4>
                    <p>{activity.course} • {activity.date}</p>
                  </div>
                  <span className={`status-badge ${activity.status}`}>{activity.status}</span>
                </div>
              ))
            ) : (
              <p className="text-muted">No recent activity</p>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/" className="action-btn">
              <span className="action-icon">📋</span>
              <span>Apply for Course</span>
            </Link>
            <Link to="/contact" className="action-btn">
              <span className="action-icon">📞</span>
              <span>Contact Advisor</span>
            </Link>
            <Link to="/gallery" className="action-btn">
              <span className="action-icon">🖼️</span>
              <span>View Gallery</span>
            </Link>
            <Link to="/testimonials" className="action-btn">
              <span className="action-icon">⭐</span>
              <span>Read Testimonials</span>
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Profile Information</h2>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Full Name:</span>
              <span className="info-value">{user?.fullName || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{user?.phone || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Role:</span>
              <span className="info-value">{user?.role || 'Student'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since:</span>
              <span className="info-value">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Updated:</span>
              <span className="info-value">
                {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

