import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchAcademicProductById } from '../services/academicApi'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import Card from './Card'
import Button from './Button'

function ProductDetails() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProduct()
  }, [productId])

  const loadProduct = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchAcademicProductById(productId)
      
      if (result.success) {
        setProduct(result.data)
      } else {
        setError(result.error || 'Resource not found')
      }
    } catch (err) {
      setError('Failed to load resource details. Please try again.')
      console.error('Error loading resource:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <Loader message="Loading resource details..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <ErrorMessage message={error} onRetry={loadProduct} />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button onClick={() => navigate('/products')}>
            Back to Academic Resources
          </Button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h3>Resource not found</h3>
          <Button onClick={() => navigate('/products')}>
            Back to Academic Resources
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/products')}
            className="back-button"
          >
            ← Back to Academic Resources
          </Button>
          <h1>{product.title}</h1>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            <span className="product-category-badge">{product.category}</span>
            <span className="product-category-badge" style={{ background: '#7c3aed' }}>
              {product.courseCategory}
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="product-details-grid">
            <div className="product-details-main">
              <Card className="product-image-card">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-detail-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x500?text=No+Image'
                  }}
                />
              </Card>

              <Card className="product-description-card">
                <h2>Description</h2>
                <p className="product-description">{product.description}</p>
              </Card>
            </div>

            <div className="product-details-sidebar">
              <Card className="product-info-card">
                <h3>Resource Information</h3>
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value price">₹{product.price?.toLocaleString('en-IN')}</span>
                </div>
                {product.author && (
                  <div className="detail-item">
                    <span className="detail-label">Author:</span>
                    <span className="detail-value">{product.author}</span>
                  </div>
                )}
                {product.publisher && (
                  <div className="detail-item">
                    <span className="detail-label">Publisher:</span>
                    <span className="detail-value">{product.publisher}</span>
                  </div>
                )}
                {product.edition && (
                  <div className="detail-item">
                    <span className="detail-label">Edition:</span>
                    <span className="detail-value">{product.edition}</span>
                  </div>
                )}
                {product.isbn && (
                  <div className="detail-item">
                    <span className="detail-label">ISBN/Code:</span>
                    <span className="detail-value" style={{ fontSize: '0.9rem' }}>{product.isbn}</span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">
                    {product.category}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Course:</span>
                  <span className="detail-value">{product.courseCategory}</span>
                </div>
                {product.stock !== undefined && (
                  <div className="detail-item">
                    <span className="detail-label">Stock:</span>
                    <span className="detail-value" style={{ color: product.stock > 10 ? 'green' : 'orange' }}>
                      {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                    </span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">Rating:</span>
                  <span className="detail-value">
                    <span className="rating-stars">
                      {'⭐'.repeat(Math.round(product.rating?.rate || 0))}
                    </span>
                    <span className="rating-number">
                      {product.rating?.rate?.toFixed(1) || 'N/A'} / 5.0
                    </span>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Reviews:</span>
                  <span className="detail-value">{product.rating?.count || 0} reviews</span>
                </div>
                <Button variant="primary" className="btn-full" style={{ marginTop: '20px' }}>
                  Add to Cart
                </Button>
              </Card>

              <Card className="product-links-card">
                <h3>Quick Links</h3>
                <Link to="/products" className="sidebar-link">
                  View All Resources
                </Link>
                <Link to="/courses" className="sidebar-link">
                  Browse Courses
                </Link>
                <Link to="/contact" className="sidebar-link">
                  Contact Us
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails

