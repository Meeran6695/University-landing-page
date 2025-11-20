import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

function Navigation({ universityName }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => {
    if (path === '/courses') {
      return location.pathname.startsWith('/courses')
    }
    return location.pathname === path
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">{universityName}</span>
        </Link>
        
        <button 
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={isActive('/') || isActive('/university1') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={isActive('/about') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/courses" 
              className={isActive('/courses') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link 
              to="/gallery" 
              className={isActive('/gallery') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link 
              to="/testimonials" 
              className={isActive('/testimonials') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={isActive('/contact') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          {user ? (
            <>
              {(user.email?.includes('admin') || user.role === 'admin' || user.email === 'admin@university.edu') ? (
                <li>
                  <Link 
                    to="/admin" 
                    className={isActive('/admin') ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link 
                    to="/dashboard" 
                    className={isActive('/dashboard') ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Dashboard
                  </Link>
                </li>
              )}
              <li>
                <button className="nav-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/login" 
                  className="nav-login-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/signup" 
                  className="nav-signup-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

