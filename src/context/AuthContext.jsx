import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        if (data.token) {
          localStorage.setItem('token', data.token)
        }
        return { success: true }
      } else {
        // Fallback to localStorage if API fails
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const foundUser = users.find(u => u.email === email && u.password === password)
        
        if (foundUser) {
          const userData = { ...foundUser }
          delete userData.password
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
          return { success: true }
        }
        return { success: false, error: data.error || 'Invalid email or password' }
      }
    } catch (error) {
      // Fallback to localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const foundUser = users.find(u => u.email === email && u.password === password)
      
      if (foundUser) {
        const userData = { ...foundUser }
        delete userData.password
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return { success: true }
      }
      return { success: false, error: 'Invalid email or password' }
    }
  }

  const signup = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        if (data.token) {
          localStorage.setItem('token', data.token)
        }
        return { success: true }
      } else {
        // Fallback to localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        
        if (users.find(u => u.email === userData.email)) {
          return { success: false, error: 'Email already registered' }
        }

        const newUser = {
          id: Date.now().toString(),
          ...userData,
          createdAt: new Date().toISOString()
        }
        
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        
        const userWithoutPassword = { ...newUser }
        delete userWithoutPassword.password
        setUser(userWithoutPassword)
        localStorage.setItem('user', JSON.stringify(userWithoutPassword))
        
        return { success: true }
      }
    } catch (error) {
      // Fallback to localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      if (users.find(u => u.email === userData.email)) {
        return { success: false, error: 'Email already registered' }
      }

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString()
      }
      
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      const userWithoutPassword = { ...newUser }
      delete userWithoutPassword.password
      setUser(userWithoutPassword)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      
      return { success: true }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

