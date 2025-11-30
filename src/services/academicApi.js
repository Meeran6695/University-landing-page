// Academic Resources API Service
// Provides university-related products: textbooks, course materials, study resources, etc.

// Academic products related to university courses
const academicProducts = [
  // Engineering Resources
  {
    id: 1,
    title: 'Introduction to Computer Science - Textbook',
    description: 'Comprehensive textbook covering programming fundamentals, data structures, and algorithms. Perfect for B.Tech Computer Science students.',
    price: 1299,
    category: 'Textbooks',
    courseCategory: 'Engineering',
    image: 'https://images.unsplash.com/photo-1532619675605-1ede6c4ed944?w=400&h=400&fit=crop',
    rating: { rate: 4.8, count: 245 },
    author: 'Dr. Sarah Johnson',
    publisher: 'Academic Press',
    edition: '5th Edition',
    isbn: '978-0123456789',
    stock: 50
  },
  {
    id: 2,
    title: 'Data Structures & Algorithms Study Guide',
    description: 'Complete study guide with solved examples, practice problems, and exam preparation tips for DSA courses.',
    price: 599,
    category: 'Study Guides',
    courseCategory: 'Engineering',
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f61?w=400&h=400&fit=crop',
    rating: { rate: 4.6, count: 189 },
    author: 'Prof. Michael Chen',
    publisher: 'TechVista Publications',
    edition: '3rd Edition',
    isbn: '978-0123456790',
    stock: 75
  },
  {
    id: 3,
    title: 'Mechanical Engineering Lab Kit',
    description: 'Complete lab kit with essential tools and components for mechanical engineering practical sessions.',
    price: 3499,
    category: 'Lab Equipment',
    courseCategory: 'Engineering',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
    rating: { rate: 4.7, count: 156 },
    author: 'Lab Supplies Co.',
    publisher: 'Engineering Tools',
    edition: 'Standard Kit',
    isbn: 'LAB-ME-2024',
    stock: 30
  },
  {
    id: 4,
    title: 'Web Development Masterclass - Online Course',
    description: 'Complete online course covering HTML, CSS, JavaScript, React, and Node.js. Includes 50+ hours of video content and projects.',
    price: 2999,
    category: 'Online Courses',
    courseCategory: 'Engineering',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
    rating: { rate: 4.9, count: 523 },
    author: 'TechVista Online',
    publisher: 'Digital Learning',
    edition: '2024 Edition',
    isbn: 'ONLINE-WEB-2024',
    stock: 999
  },
  {
    id: 5,
    title: 'Database Management Systems - Reference Book',
    description: 'Advanced reference book covering SQL, NoSQL, database design, and optimization techniques.',
    price: 1599,
    category: 'Textbooks',
    courseCategory: 'Engineering',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=400&fit=crop',
    rating: { rate: 4.5, count: 312 },
    author: 'Dr. Robert Williams',
    publisher: 'Database Publishers',
    edition: '4th Edition',
    isbn: '978-0123456791',
    stock: 45
  },
  // Business Management Resources
  {
    id: 6,
    title: 'Business Analytics & Strategy - MBA Textbook',
    description: 'Comprehensive guide to business analytics, strategic management, and data-driven decision making for MBA students.',
    price: 1899,
    category: 'Textbooks',
    courseCategory: 'Business',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
    rating: { rate: 4.7, count: 278 },
    author: 'Dr. Emily Davis',
    publisher: 'Business Press',
    edition: '6th Edition',
    isbn: '978-0123456792',
    stock: 60
  },
  {
    id: 7,
    title: 'Financial Management Case Studies',
    description: 'Collection of real-world case studies covering financial analysis, investment decisions, and corporate finance.',
    price: 899,
    category: 'Study Guides',
    courseCategory: 'Business',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
    rating: { rate: 4.6, count: 201 },
    author: 'Prof. James Anderson',
    publisher: 'Case Study Press',
    edition: '2024 Edition',
    isbn: '978-0123456793',
    stock: 85
  },
  {
    id: 8,
    title: 'Marketing Strategy Workbook',
    description: 'Interactive workbook with exercises, templates, and frameworks for developing marketing strategies.',
    price: 699,
    category: 'Study Guides',
    courseCategory: 'Business',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
    rating: { rate: 4.4, count: 167 },
    author: 'Dr. Lisa Martinez',
    publisher: 'Marketing Academy',
    edition: '2nd Edition',
    isbn: '978-0123456794',
    stock: 90
  },
  // Law Resources
  {
    id: 9,
    title: 'Constitutional Law - Complete Reference',
    description: 'Comprehensive reference book covering constitutional law, landmark cases, and legal precedents for law students.',
    price: 2199,
    category: 'Textbooks',
    courseCategory: 'Law',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=400&fit=crop',
    rating: { rate: 4.8, count: 234 },
    author: 'Justice Mark Thompson',
    publisher: 'Legal Publications',
    edition: '7th Edition',
    isbn: '978-0123456795',
    stock: 40
  },
  {
    id: 10,
    title: 'Criminal Law Casebook',
    description: 'Detailed casebook with analysis of major criminal law cases, legal principles, and judicial interpretations.',
    price: 1799,
    category: 'Textbooks',
    courseCategory: 'Law',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=400&fit=crop',
    rating: { rate: 4.7, count: 189 },
    author: 'Prof. David Brown',
    publisher: 'Law Academy',
    edition: '5th Edition',
    isbn: '978-0123456796',
    stock: 55
  },
  // Computer Applications
  {
    id: 11,
    title: 'Programming Fundamentals - BCA Guide',
    description: 'Complete guide to programming fundamentals covering C, C++, Java, and Python for BCA students.',
    price: 1199,
    category: 'Textbooks',
    courseCategory: 'Computer Applications',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop',
    rating: { rate: 4.6, count: 298 },
    author: 'Dr. Kevin Lee',
    publisher: 'Programming Press',
    edition: '4th Edition',
    isbn: '978-0123456797',
    stock: 70
  },
  {
    id: 12,
    title: 'Software Engineering Practices',
    description: 'Guide to modern software engineering practices, agile methodologies, and project management.',
    price: 1399,
    category: 'Textbooks',
    courseCategory: 'Computer Applications',
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=400&fit=crop',
    rating: { rate: 4.5, count: 256 },
    author: 'Dr. Amanda White',
    publisher: 'Software Academy',
    edition: '3rd Edition',
    isbn: '978-0123456798',
    stock: 50
  },
  // University Merchandise
  {
    id: 13,
    title: 'University Official Hoodie',
    description: 'Premium quality university hoodie with official logo. Available in multiple sizes and colors.',
    price: 1299,
    category: 'Merchandise',
    courseCategory: 'General',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    rating: { rate: 4.8, count: 412 },
    author: 'University Store',
    publisher: 'Campus Merchandise',
    edition: '2024 Collection',
    isbn: 'MERCH-HOODIE-001',
    stock: 150
  },
  {
    id: 14,
    title: 'University Laptop Bag',
    description: 'Durable laptop bag with university branding. Fits laptops up to 15.6 inches with multiple compartments.',
    price: 899,
    category: 'Merchandise',
    courseCategory: 'General',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    rating: { rate: 4.6, count: 287 },
    author: 'University Store',
    publisher: 'Campus Merchandise',
    edition: 'Premium Series',
    isbn: 'MERCH-BAG-001',
    stock: 100
  },
  {
    id: 15,
    title: 'Scientific Calculator - Engineering Grade',
    description: 'Advanced scientific calculator with 300+ functions, suitable for engineering and science courses.',
    price: 799,
    category: 'Lab Equipment',
    courseCategory: 'Engineering',
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400&h=400&fit=crop',
    rating: { rate: 4.7, count: 345 },
    author: 'TechCalc Inc.',
    publisher: 'Scientific Instruments',
    edition: 'Pro Model 2024',
    isbn: 'CALC-ENG-2024',
    stock: 200
  },
  {
    id: 16,
    title: 'Machine Learning & AI - Advanced Course',
    description: 'Comprehensive online course on machine learning, deep learning, and AI applications. Includes hands-on projects.',
    price: 3999,
    category: 'Online Courses',
    courseCategory: 'Engineering',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop',
    rating: { rate: 4.9, count: 678 },
    author: 'AI Academy',
    publisher: 'Digital Learning',
    edition: '2024 Edition',
    isbn: 'ONLINE-ML-2024',
    stock: 999
  },
  {
    id: 17,
    title: 'Cloud Computing Fundamentals',
    description: 'Complete guide to cloud computing, AWS, Azure, and GCP. Perfect for students pursuing cloud certifications.',
    price: 2499,
    category: 'Online Courses',
    courseCategory: 'Engineering',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop',
    rating: { rate: 4.8, count: 445 },
    author: 'Cloud Experts',
    publisher: 'Digital Learning',
    edition: '2024 Edition',
    isbn: 'ONLINE-CLOUD-2024',
    stock: 999
  },
  {
    id: 18,
    title: 'Corporate Law Handbook',
    description: 'Essential handbook covering corporate law, business regulations, and legal compliance for BBA LLB students.',
    price: 1699,
    category: 'Textbooks',
    courseCategory: 'Law',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=400&fit=crop',
    rating: { rate: 4.6, count: 198 },
    author: 'Dr. Patricia Green',
    publisher: 'Corporate Law Press',
    edition: '4th Edition',
    isbn: '978-0123456799',
    stock: 65
  }
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Fetch all academic products
export const fetchAcademicProducts = async () => {
  try {
    await delay(800) // Simulate network delay
    return { success: true, data: academicProducts }
  } catch (error) {
    console.error('Error fetching academic products:', error)
    return { success: false, error: error.message }
  }
}

// Fetch single product by ID
export const fetchAcademicProductById = async (id) => {
  try {
    await delay(500) // Simulate network delay
    const product = academicProducts.find(p => p.id === parseInt(id))
    if (!product) {
      return { success: false, error: 'Product not found' }
    }
    return { success: true, data: product }
  } catch (error) {
    console.error('Error fetching academic product:', error)
    return { success: false, error: error.message }
  }
}

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    await delay(600) // Simulate network delay
    const filtered = academicProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    )
    return { success: true, data: filtered }
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return { success: false, error: error.message }
  }
}

// Fetch products by course category
export const fetchProductsByCourseCategory = async (courseCategory) => {
  try {
    await delay(600)
    const filtered = academicProducts.filter(p => 
      p.courseCategory.toLowerCase() === courseCategory.toLowerCase()
    )
    return { success: true, data: filtered }
  } catch (error) {
    console.error('Error fetching products by course category:', error)
    return { success: false, error: error.message }
  }
}

// Get all categories
export const fetchCategories = async () => {
  try {
    await delay(300)
    const categories = [...new Set(academicProducts.map(p => p.category))]
    return { success: true, data: categories }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { success: false, error: error.message }
  }
}

// Get all course categories
export const fetchCourseCategories = async () => {
  try {
    await delay(300)
    const courseCategories = [...new Set(academicProducts.map(p => p.courseCategory))]
    return { success: true, data: courseCategories }
  } catch (error) {
    console.error('Error fetching course categories:', error)
    return { success: false, error: error.message }
  }
}

