function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  type = 'button',
  className = '',
  fullWidth = false 
}) {
  const baseClass = 'btn'
  const variantClass = `btn-${variant}`
  const widthClass = fullWidth ? 'btn-full' : ''
  
  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button

