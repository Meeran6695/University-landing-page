import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import UniversityPage from './components/UniversityPage'
import Navigation from './components/Navigation'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Contact from './components/Contact'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import CourseDetails from './components/CourseDetails'
import CoursesList from './components/CoursesList'
import Admin from './components/Admin'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Footer from './components/Footer'
import { university1Data, university2Data } from './data/universities'

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/login" element={<><Navigation universityName="University" /><Login /></>} />
          <Route path="/signup" element={<><Navigation universityName="University" /><Signup /></>} />
          <Route path="/about" element={<><Navigation universityName="TechVista University" /><About /></>} />
          <Route path="/contact" element={<><Navigation universityName="TechVista University" /><Contact /></>} />
          <Route path="/gallery" element={<><Navigation universityName="TechVista University" /><Gallery /></>} />
          <Route path="/testimonials" element={<><Navigation universityName="TechVista University" /><Testimonials /></>} />
          <Route path="/courses" element={<><Navigation universityName="TechVista University" /><CoursesList /></>} />
          <Route path="/courses/:courseId" element={<><Navigation universityName="TechVista University" /><CourseDetails /></>} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Navigation universityName="TechVista University" />
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <Navigation universityName="TechVista University" />
                <Admin />
              </AdminRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              <>
                <Navigation universityName={university1Data.name} />
                <UniversityPage data={university1Data} />
              </>
            } 
          />
          <Route 
            path="/university1" 
            element={
              <>
                <Navigation universityName={university1Data.name} />
                <UniversityPage data={university1Data} />
              </>
            } 
          />
          <Route 
            path="/university2" 
            element={
              <>
                <Navigation universityName={university2Data.name} />
                <UniversityPage data={university2Data} />
              </>
            } 
          />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App

