import { useState, useEffect } from 'react'

function FeesModal({ isOpen, onClose, feesData, currentPage }) {
  const [fees, setFees] = useState(feesData.courses)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadFeesData()
    }
  }, [isOpen])

  const loadFeesData = async () => {
    setLoading(true)
    try {
      const apiUrl = currentPage === 'university2' 
        ? '/api/fees/university2' 
        : '/api/fees/university1'
      
      const response = await fetch(apiUrl)
      
      if (response.ok) {
        const data = await response.json()
        setFees(data.courses || feesData.courses)
      } else {
        setFees(feesData.courses)
      }
    } catch (error) {
      console.error('Error loading fees:', error)
      setFees(feesData.courses)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Course-wise Fee Structure</h2>
        <div className="fees-content">
          {loading ? (
            <p>Loading fees...</p>
          ) : fees && fees.length > 0 ? (
            <div className="fees-list">
              {fees.map((course, index) => (
                <div key={index} className="fee-item">
                  <h4>{course.name}</h4>
                  <p><strong>Annual Fee:</strong> {course.annual}</p>
                  <p><strong>Total Fee:</strong> {course.total}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Fee information not available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeesModal

