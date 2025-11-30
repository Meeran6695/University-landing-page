function Card({ children, className = '', onClick }) {
  const cardClass = onClick ? 'card clickable-card' : 'card'
  
  return (
    <div className={`${cardClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card

