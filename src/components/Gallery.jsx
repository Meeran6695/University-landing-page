import { useState } from 'react'

function Gallery() {
  const galleryItems = [
    { id: 1, category: 'Campus', title: 'Main Building', image: '🏛️' },
    { id: 2, category: 'Campus', title: 'Library', image: '📚' },
    { id: 3, category: 'Campus', title: 'Sports Complex', image: '🏋️' },
    { id: 4, category: 'Events', title: 'Annual Day', image: '🎉' },
    { id: 5, category: 'Events', title: 'Tech Fest', image: '💻' },
    { id: 6, category: 'Events', title: 'Graduation', image: '🎓' },
    { id: 7, category: 'Labs', title: 'Computer Lab', image: '💻' },
    { id: 8, category: 'Labs', title: 'Science Lab', image: '🔬' },
    { id: 9, category: 'Labs', title: 'Engineering Lab', image: '⚙️' },
    { id: 10, category: 'Campus', title: 'Hostel', image: '🏠' },
    { id: 11, category: 'Events', title: 'Cultural Fest', image: '🎭' },
    { id: 12, category: 'Campus', title: 'Cafeteria', image: '🍽️' }
  ]

  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', 'Campus', 'Events', 'Labs']

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="container">
          <h1>Gallery</h1>
          <p>Explore our campus and events</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="gallery-item">
                <div className="gallery-image">
                  <span className="gallery-icon">{item.image}</span>
                </div>
                <div className="gallery-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery

