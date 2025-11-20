import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function Admin() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [users, setUsers] = useState([])
  const [applications, setApplications] = useState([])
  const [courses, setCourses] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [showAddCourse, setShowAddCourse] = useState(false)
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    duration: '',
    annualFee: '',
    totalFee: '',
    eligibility: '',
    curriculum: [],
    careerOpportunities: [],
    status: 'active'
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Try to load from MongoDB API
      try {
        const [usersRes, appsRes, coursesRes, messagesRes] = await Promise.all([
          fetch('/api/users').catch(() => null),
          fetch('/api/applications').catch(() => null),
          fetch('/api/courses').catch(() => null),
          fetch('/api/messages').catch(() => null)
        ])

        if (usersRes?.ok) {
          const usersData = await usersRes.json()
          setUsers(usersData)
        } else {
          // Fallback to localStorage
          const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
          setUsers(storedUsers)
        }

        if (appsRes?.ok) {
          const appsData = await appsRes.json()
          setApplications(appsData)
        } else {
          // Fallback to localStorage
          const storedApplications = JSON.parse(localStorage.getItem('formSubmissions') || '[]')
          setApplications(storedApplications)
        }

        if (coursesRes?.ok) {
          const coursesData = await coursesRes.json()
          setCourses(coursesData)
        } else {
          // Fallback to default courses
          const allCourses = [
            { _id: 1, name: 'B.Tech Computer Science', studentsEnrolled: 150, status: 'active' },
            { _id: 2, name: 'MBA', studentsEnrolled: 80, status: 'active' },
            { _id: 3, name: 'BBA', studentsEnrolled: 120, status: 'active' },
            { _id: 4, name: 'BCA', studentsEnrolled: 90, status: 'active' }
          ]
          setCourses(allCourses)
        }

        if (messagesRes?.ok) {
          const messagesData = await messagesRes.json()
          setMessages(messagesData)
        } else {
          // Fallback to localStorage
          const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]')
          setMessages(storedMessages)
        }
      } catch (apiError) {
        // Fallback to localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
        setUsers(storedUsers)

        const storedApplications = JSON.parse(localStorage.getItem('formSubmissions') || '[]')
        setApplications(storedApplications)

        const allCourses = [
          { _id: 1, name: 'B.Tech Computer Science', studentsEnrolled: 150, status: 'active' },
          { _id: 2, name: 'MBA', studentsEnrolled: 80, status: 'active' },
          { _id: 3, name: 'BBA', studentsEnrolled: 120, status: 'active' },
          { _id: 4, name: 'BCA', studentsEnrolled: 90, status: 'active' }
        ]
        setCourses(allCourses)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          const updatedUsers = users.filter(u => u._id !== userId && u.id !== userId)
          setUsers(updatedUsers)
        } else {
          // Fallback to localStorage
          const updatedUsers = users.filter(u => u.id !== userId && u._id !== userId)
          setUsers(updatedUsers)
          localStorage.setItem('users', JSON.stringify(updatedUsers))
        }
      } catch (error) {
        // Fallback to localStorage
        const updatedUsers = users.filter(u => u.id !== userId && u._id !== userId)
        setUsers(updatedUsers)
        localStorage.setItem('users', JSON.stringify(updatedUsers))
      }
    }
  }

  const deleteApplication = async (appId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        const response = await fetch(`/api/applications/${appId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          const updatedApplications = applications.filter(a => 
            a._id !== appId && a.timestamp !== appId
          )
          setApplications(updatedApplications)
        } else {
          // Fallback to localStorage
          const updatedApplications = applications.filter(a => a.timestamp !== appId && a._id !== appId)
          setApplications(updatedApplications)
          localStorage.setItem('formSubmissions', JSON.stringify(updatedApplications))
        }
      } catch (error) {
        // Fallback to localStorage
        const updatedApplications = applications.filter(a => a.timestamp !== appId && a._id !== appId)
        setApplications(updatedApplications)
        localStorage.setItem('formSubmissions', JSON.stringify(updatedApplications))
      }
    }
  }

  const updateApplicationStatus = async (appId, status) => {
    try {
      const app = applications.find(a => a._id === appId || a.timestamp === appId)
      if (!app) return

      const response = await fetch(`/api/applications/${app._id || appId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...app, status })
      })

      if (response.ok) {
        const updatedApplications = applications.map(a => 
          (a._id === appId || a.timestamp === appId) ? { ...a, status } : a
        )
        setApplications(updatedApplications)
      } else {
        // Fallback to localStorage
        const updatedApplications = applications.map(a => 
          (a.timestamp === appId || a._id === appId) ? { ...a, status } : a
        )
        setApplications(updatedApplications)
        localStorage.setItem('formSubmissions', JSON.stringify(updatedApplications))
      }
    } catch (error) {
      // Fallback to localStorage
      const updatedApplications = applications.map(a => 
        (a.timestamp === appId || a._id === appId) ? { ...a, status } : a
      )
      setApplications(updatedApplications)
      localStorage.setItem('formSubmissions', JSON.stringify(updatedApplications))
    }
  }

  const sendReply = async (messageId) => {
    if (!replyText.trim()) {
      alert('Please enter a reply message')
      return
    }

    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reply: replyText,
          repliedBy: user?.fullName || 'Admin'
        })
      })

      if (response.ok) {
        const updatedMessages = messages.map(m =>
          m._id === messageId ? { ...m, reply: replyText, status: 'replied', repliedBy: user?.fullName } : m
        )
        setMessages(updatedMessages)
        setReplyingTo(null)
        setReplyText('')
        alert('Reply sent successfully!')
      } else {
        alert('Error sending reply')
      }
    } catch (error) {
      console.error('Error sending reply:', error)
      alert('Error sending reply')
    }
  }

  const deleteMessage = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch(`/api/messages/${messageId}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          const updatedMessages = messages.filter(m => m._id !== messageId)
          setMessages(updatedMessages)
        }
      } catch (error) {
        console.error('Error deleting message:', error)
      }
    }
  }

  const addCourse = async () => {
    if (!newCourse.name || !newCourse.description || !newCourse.duration || !newCourse.annualFee) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse)
      })

      if (response.ok) {
        const createdCourse = await response.json()
        setCourses([...courses, createdCourse])
        setNewCourse({
          name: '',
          description: '',
          duration: '',
          annualFee: '',
          totalFee: '',
          eligibility: '',
          curriculum: [],
          careerOpportunities: [],
          status: 'active'
        })
        setShowAddCourse(false)
        alert('Course added successfully!')
      } else {
        alert('Error adding course')
      }
    } catch (error) {
      console.error('Error adding course:', error)
      alert('Error adding course')
    }
  }

  const deleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`/api/courses/${courseId}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          const updatedCourses = courses.filter(c => c._id !== courseId)
          setCourses(updatedCourses)
        }
      } catch (error) {
        console.error('Error deleting course:', error)
      }
    }
  }

  const stats = {
    totalUsers: users.length,
    totalApplications: applications.length,
    pendingApplications: applications.filter(a => !a.status || a.status === 'pending').length,
    totalCourses: courses.length
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.fullName || 'Admin'}</p>
      </div>

      <div className="admin-layout">
        <div className="admin-sidebar">
          <button 
            className={`admin-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button 
            className={`admin-tab ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            📝 Applications
          </button>
          <button 
            className={`admin-tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            📚 Courses
          </button>
          <button 
            className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            💬 Messages ({messages.filter(m => m.status === 'unread').length})
          </button>
          <button 
            className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </div>

        <div className="admin-content">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="admin-dashboard">
                  <h2>Overview</h2>
                  <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                      <div className="stat-icon">👥</div>
                      <div>
                        <h3>{stats.totalUsers}</h3>
                        <p>Total Users</p>
                      </div>
                    </div>
                    <div className="admin-stat-card">
                      <div className="stat-icon">📝</div>
                      <div>
                        <h3>{stats.totalApplications}</h3>
                        <p>Total Applications</p>
                      </div>
                    </div>
                    <div className="admin-stat-card">
                      <div className="stat-icon">⏳</div>
                      <div>
                        <h3>{stats.pendingApplications}</h3>
                        <p>Pending Applications</p>
                      </div>
                    </div>
                    <div className="admin-stat-card">
                      <div className="stat-icon">📚</div>
                      <div>
                        <h3>{stats.totalCourses}</h3>
                        <p>Active Courses</p>
                      </div>
                    </div>
                  </div>

                  <div className="admin-recent">
                    <h3>Recent Applications</h3>
                    <div className="recent-list">
                      {applications.slice(0, 5).map((app, index) => (
                        <div key={index} className="recent-item">
                          <div>
                            <strong>{app.fullName}</strong>
                            <p>{app.course} • {app.email}</p>
                          </div>
                          <span className={`status-badge ${app.status || 'pending'}`}>
                            {app.status || 'pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="admin-section">
                  <div className="section-header">
                    <h2>User Management</h2>
                    <button className="btn btn-primary">Add User</button>
                  </div>
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Joined</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u._id || u.id}>
                            <td>{u.fullName}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                            <td>
                              <button 
                                className="btn-danger"
                                onClick={() => deleteUser(u._id || u.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="admin-section">
                  <div className="section-header">
                    <h2>Application Management</h2>
                  </div>
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Course</th>
                          <th>State</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((app, index) => (
                          <tr key={app._id || app.timestamp || index}>
                            <td>{app.fullName}</td>
                            <td>{app.email}</td>
                            <td>{app.phone}</td>
                            <td>{app.course}</td>
                            <td>{app.state}</td>
                            <td>
                              <select
                                value={app.status || 'pending'}
                                onChange={(e) => updateApplicationStatus(app._id || app.timestamp, e.target.value)}
                                className="status-select"
                              >
                                <option value="pending">Pending</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </td>
                            <td>
                              <button 
                                className="btn-danger"
                                onClick={() => deleteApplication(app._id || app.timestamp)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="admin-section">
                  <div className="section-header">
                    <h2>Course Management ({courses.length})</h2>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowAddCourse(!showAddCourse)}
                    >
                      {showAddCourse ? '✕ Cancel' : '+ Add Course'}
                    </button>
                  </div>

                  {showAddCourse && (
                    <div className="add-course-form">
                      <h3>Add New Course</h3>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Course Name *</label>
                          <input
                            type="text"
                            placeholder="e.g., B.Tech Computer Science"
                            value={newCourse.name}
                            onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Duration *</label>
                          <input
                            type="text"
                            placeholder="e.g., 4 years"
                            value={newCourse.duration}
                            onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Annual Fee *</label>
                          <input
                            type="text"
                            placeholder="e.g., ₹2,00,000"
                            value={newCourse.annualFee}
                            onChange={(e) => setNewCourse({...newCourse, annualFee: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Total Fee</label>
                          <input
                            type="text"
                            placeholder="e.g., ₹8,00,000"
                            value={newCourse.totalFee}
                            onChange={(e) => setNewCourse({...newCourse, totalFee: e.target.value})}
                          />
                        </div>
                        <div className="form-group full-width">
                          <label>Description *</label>
                          <textarea
                            placeholder="Course description"
                            value={newCourse.description}
                            onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                            rows="3"
                          />
                        </div>
                        <div className="form-group full-width">
                          <label>Eligibility</label>
                          <input
                            type="text"
                            placeholder="e.g., 12th with PCM (60% or above)"
                            value={newCourse.eligibility}
                            onChange={(e) => setNewCourse({...newCourse, eligibility: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="form-actions">
                        <button className="btn btn-primary" onClick={addCourse}>Save Course</button>
                        <button className="btn btn-secondary" onClick={() => setShowAddCourse(false)}>Cancel</button>
                      </div>
                    </div>
                  )}

                  <div className="courses-admin-grid">
                    {courses.length === 0 ? (
                      <div className="empty-state full-width">
                        <p>No courses available. Click "Add Course" to create one.</p>
                      </div>
                    ) : (
                      courses.map((course) => (
                        <div key={course._id || course.id} className="course-admin-card">
                          <h3>{course.name}</h3>
                          <p className="course-detail">
                            <strong>Duration:</strong> {course.duration || 'N/A'}
                          </p>
                          <p className="course-detail">
                            <strong>Annual Fee:</strong> {course.annualFee || 'N/A'}
                          </p>
                          <p className="course-detail">
                            <strong>Students Enrolled:</strong> {course.studentsEnrolled || 0}
                          </p>
                          <p>
                            Status: <span className={`status-badge ${course.status || 'active'}`}>
                              {course.status || 'active'}
                            </span>
                          </p>
                          <div className="course-actions">
                            <button className="btn btn-secondary">Edit</button>
                            <button 
                              className="btn btn-danger"
                              onClick={() => deleteCourse(course._id || course.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="admin-section">
                  <div className="section-header">
                    <h2>Messages ({messages.length})</h2>
                    <p className="text-muted">Unread: {messages.filter(m => m.status === 'unread').length}</p>
                  </div>
                  <div className="messages-container">
                    {messages.length === 0 ? (
                      <div className="empty-state">
                        <p>No messages yet</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div key={msg._id} className="message-card">
                          <div className="message-header">
                            <div>
                              <h3>{msg.fullName}</h3>
                              <p className="text-muted">{msg.email} • {msg.phone}</p>
                            </div>
                            <span className={`status-badge ${msg.status}`}>{msg.status}</span>
                          </div>
                          <div className="message-subject">
                            <strong>Subject:</strong> {msg.subject}
                          </div>
                          <div className="message-body">
                            <strong>Message:</strong>
                            <p>{msg.message}</p>
                          </div>
                          <div className="message-date">
                            <small>{new Date(msg.createdAt).toLocaleString()}</small>
                          </div>

                          {msg.reply && (
                            <div className="reply-section">
                              <div className="reply-header">
                                <strong>Your Reply:</strong>
                                <small>{new Date(msg.repliedAt).toLocaleString()}</small>
                              </div>
                              <p>{msg.reply}</p>
                              <small>Replied by: {msg.repliedBy}</small>
                            </div>
                          )}

                          {replyingTo === msg._id ? (
                            <div className="reply-form">
                              <textarea
                                placeholder="Type your reply here..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows="4"
                              />
                              <div className="reply-actions">
                                <button 
                                  className="btn btn-primary"
                                  onClick={() => sendReply(msg._id)}
                                >
                                  Send Reply
                                </button>
                                <button 
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    setReplyingTo(null)
                                    setReplyText('')
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="message-actions">
                              <button 
                                className="btn btn-primary"
                                onClick={() => setReplyingTo(msg._id)}
                              >
                                Reply
                              </button>
                              <button 
                                className="btn btn-danger"
                                onClick={() => deleteMessage(msg._id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="admin-section">
                  <h2>Settings</h2>
                  <div className="settings-form">
                    <div className="form-group">
                      <label>University Name</label>
                      <input type="text" defaultValue="TechVista University" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" defaultValue="admin@university.edu" />
                    </div>
                    <div className="form-group">
                      <label>MongoDB Connection String</label>
                      <input type="text" placeholder="mongodb://localhost:27017/university" />
                    </div>
                    <button className="btn btn-primary">Save Settings</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin

