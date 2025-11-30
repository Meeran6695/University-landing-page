import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAcademicProducts, fetchCategories, fetchCourseCategories } from '../services/academicApi'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import Card from './Card'
import Button from './Button'

function ProductsList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [courseCategories, setCourseCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCourseCategory, setSelectedCourseCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Fetch products, categories, and course categories in parallel
      const [productsResult, categoriesResult, courseCategoriesResult] = await Promise.all([
        fetchAcademicProducts(),
        fetchCategories(),
        fetchCourseCategories()
      ])

      if (productsResult.success) {
        setProducts(productsResult.data)
      } else {
        setError(productsResult.error)
      }

      if (categoriesResult.success) {
        setCategories(categoriesResult.data)
      }

      if (courseCategoriesResult.success) {
        setCourseCategories(courseCategoriesResult.data)
      }
    } catch (err) {
      setError('Failed to load academic resources. Please try again later.')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Filter products by category, course category, and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesCourseCategory = selectedCourseCategory === 'all' || product.courseCategory === selectedCourseCategory
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.author && product.author.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesCourseCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="page-container">
        <Loader message="Loading products..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <ErrorMessage message={error} onRetry={loadData} />
      </div>
    )
  }

  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <h1>Academic Resources Store</h1>
          <p>Textbooks, study guides, online courses, and educational materials for all university courses</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Search and Filter */}
          <div className="products-controls">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search textbooks, courses, materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="category-filter">
              <label htmlFor="category">Resource Type: </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                <option value="all">All Types</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="category-filter">
              <label htmlFor="courseCategory">Course Category: </label>
              <select
                id="courseCategory"
                value={selectedCourseCategory}
                onChange={(e) => setSelectedCourseCategory(e.target.value)}
                className="category-select"
              >
                <option value="all">All Courses</option>
                {courseCategories.map((courseCat, index) => (
                  <option key={index} value={courseCat}>
                    {courseCat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>No resources found</h3>
              <p>
                {searchTerm || selectedCategory !== 'all' || selectedCourseCategory !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No academic resources available at the moment.'}
              </p>
              {(searchTerm || selectedCategory !== 'all' || selectedCourseCategory !== 'all') && (
                <Button onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedCourseCategory('all')
                }}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="products-header">
                <p className="products-count">
                  Showing {filteredProducts.length} of {products.length} academic resources
                </p>
              </div>

              {/* Products Grid */}
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="product-link"
                  >
                    <Card className="product-card">
                      <div className="product-image-container">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="product-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'
                          }}
                        />
                      </div>
                      <div className="product-info">
                        <h3 className="product-title">{product.title}</h3>
                        <p className="product-category">{product.category} • {product.courseCategory}</p>
                        {product.author && (
                          <p className="product-author">By {product.author}</p>
                        )}
                        <div className="product-rating">
                          <span className="rating-stars">
                            {'⭐'.repeat(Math.round(product.rating?.rate || 0))}
                          </span>
                          <span className="rating-count">
                            ({product.rating?.count || 0} reviews)
                          </span>
                        </div>
                        <div className="product-price">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProductsList

