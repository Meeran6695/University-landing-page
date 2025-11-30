# External API Integration Documentation

## 📡 API Overview

This project integrates with a **custom Academic Resources API** that provides university-related educational products. The API service (`academicApi.js`) provides academic resources including textbooks, study guides, online courses, lab equipment, and university merchandise - all related to the courses offered by the university.

**API Service**: `src/services/academicApi.js`

## 🔌 API Functions Used

### 1. Get All Academic Products
- **Function**: `fetchAcademicProducts()`
- **Description**: Fetches all available academic resources
- **Response**: Array of academic resource objects
- **Used in**: `ProductsList` component

### 2. Get Single Academic Product
- **Function**: `fetchAcademicProductById(id)`
- **Description**: Fetches details of a specific academic resource by ID
- **Response**: Single academic resource object
- **Used in**: `ProductDetails` component

### 3. Get Products by Category
- **Function**: `fetchProductsByCategory(category)`
- **Description**: Fetches resources filtered by resource type (Textbooks, Study Guides, etc.)
- **Response**: Array of academic resource objects
- **Used in**: `ProductsList` component (filtering)

### 4. Get Products by Course Category
- **Function**: `fetchProductsByCourseCategory(courseCategory)`
- **Description**: Fetches resources filtered by course category (Engineering, Business, Law, etc.)
- **Response**: Array of academic resource objects
- **Used in**: `ProductsList` component (course category filtering)

### 5. Get All Categories
- **Function**: `fetchCategories()`
- **Description**: Fetches all available resource types
- **Response**: Array of category strings (Textbooks, Study Guides, Online Courses, etc.)
- **Used in**: `ProductsList` component (category filter)

### 6. Get All Course Categories
- **Function**: `fetchCourseCategories()`
- **Description**: Fetches all available course categories
- **Response**: Array of course category strings (Engineering, Business, Law, etc.)
- **Used in**: `ProductsList` component (course category filter)

## 📁 File Structure

```
src/
├── services/
│   └── api.js              # API service functions
├── components/
│   ├── ProductsList.jsx    # List page (displays all products)
│   ├── ProductDetails.jsx  # Detail page (shows single product)
│   ├── Loader.jsx          # Reusable loading component
│   ├── ErrorMessage.jsx    # Reusable error component
│   ├── Button.jsx          # Reusable button component
│   └── Card.jsx             # Reusable card component
```

## 🛠️ Implementation Details

### API Service (`src/services/academicApi.js`)

The API service provides six main functions:

1. **`fetchAcademicProducts()`** - Fetches all academic resources
2. **`fetchAcademicProductById(id)`** - Fetches a single academic resource
3. **`fetchProductsByCategory(category)`** - Fetches resources by resource type
4. **`fetchProductsByCourseCategory(courseCategory)`** - Fetches resources by course category
5. **`fetchCategories()`** - Fetches all resource types
6. **`fetchCourseCategories()`** - Fetches all course categories

All functions return a consistent response format:
```javascript
{
  success: boolean,
  data: Array/Object,
  error: string (if failed)
}
```

### Error Handling

The API service includes comprehensive error handling:
- Network errors
- HTTP status errors
- JSON parsing errors
- All errors are caught and returned in a consistent format

### State Management

Both `ProductsList` and `ProductDetails` components use React hooks for state management:
- `useState` for data, loading, and error states
- `useEffect` for data fetching on component mount
- `useParams` (in ProductDetails) for URL parameter extraction
- `useNavigate` for programmatic navigation

## 🎨 Features Implemented

### ✅ Required Features

1. **API Integration**
   - ✅ Uses Fetch API
   - ✅ Handles success states
   - ✅ Handles error states
   - ✅ Handles empty data states
   - ✅ Shows results dynamically

2. **Routing**
   - ✅ Home → List → Detail navigation
   - ✅ URL parameters (`/products/:productId`)
   - ✅ Back navigation button

3. **Reusable Components**
   - ✅ Button component
   - ✅ Card component
   - ✅ Loader component
   - ✅ ErrorMessage component
   - ✅ Navbar (already existed)

4. **State Handling**
   - ✅ Local state with React hooks
   - ✅ Loading states
   - ✅ Error states
   - ✅ Empty states

5. **UI/UX Requirements**
   - ✅ Responsive design (mobile/tablet/desktop)
   - ✅ Clean layout
   - ✅ Proper spacing & alignment
   - ✅ Loading spinner
   - ✅ Error messages
   - ✅ Active state in navbar

### 🎁 Bonus Features

1. **Search Functionality**
   - Search products by title or description
   - Real-time filtering

2. **Category Filtering**
   - Filter products by category
   - Dropdown selector

3. **Product Count Display**
   - Shows filtered vs total product count

4. **Image Error Handling**
   - Fallback placeholder images
   - Graceful degradation

## 📱 Routes

### Academic Resources List Page
- **Route**: `/products`
- **Component**: `ProductsList`
- **Features**:
  - Displays all academic resources in a grid
  - Search functionality (by title, description, or author)
  - Resource type filtering (Textbooks, Study Guides, Online Courses, etc.)
  - Course category filtering (Engineering, Business, Law, etc.)
  - Empty state handling
  - Loading state
  - Error state with retry

### Academic Resource Detail Page
- **Route**: `/products/:productId`
- **Component**: `ProductDetails`
- **Features**:
  - Shows detailed resource information
  - Resource image
  - Description
  - Price (in ₹), rating, category
  - Author, Publisher, Edition, ISBN
  - Course category
  - Stock availability
  - Back navigation button
  - Loading state
  - Error state with retry

## 🔄 Data Flow

```
User visits /products
    ↓
ProductsList component mounts
    ↓
useEffect triggers fetchAcademicProducts()
    ↓
API service returns academic resources data
    ↓
Response handled (success/error)
    ↓
State updated (products, loading, error)
    ↓
Component re-renders with data
    ↓
User clicks resource
    ↓
Navigate to /products/:id
    ↓
ProductDetails component mounts
    ↓
useEffect triggers fetchAcademicProductById(id)
    ↓
API service returns academic resource details
    ↓
Resource details displayed
```

## 🧪 Testing the API Integration

### Manual Testing Steps

1. **Test Products List**:
   - Navigate to `/products`
   - Verify products load
   - Test search functionality
   - Test category filtering
   - Test empty search results

2. **Test Product Details**:
   - Click on any product
   - Verify product details load
   - Test back navigation
   - Test with invalid product ID

3. **Test Error Handling**:
   - Disable network (DevTools → Network → Offline)
   - Navigate to `/products`
   - Verify error message appears
   - Test retry functionality

4. **Test Loading States**:
   - Throttle network (DevTools → Network → Slow 3G)
   - Navigate to `/products`
   - Verify loading spinner appears

## 📊 API Response Example

### Academic Resource Object Structure
```json
{
  "id": 1,
  "title": "Introduction to Computer Science - Textbook",
  "description": "Comprehensive textbook covering programming fundamentals...",
  "price": 1299,
  "category": "Textbooks",
  "courseCategory": "Engineering",
  "image": "https://images.unsplash.com/...",
  "rating": {
    "rate": 4.8,
    "count": 245
  },
  "author": "Dr. Sarah Johnson",
  "publisher": "Academic Press",
  "edition": "5th Edition",
  "isbn": "978-0123456789",
  "stock": 50
}
```

### Resource Categories
- **Textbooks**: Physical and digital textbooks for various courses
- **Study Guides**: Study materials, workbooks, and exam preparation guides
- **Online Courses**: Digital courses with video content and projects
- **Lab Equipment**: Laboratory tools and equipment for practical sessions
- **Merchandise**: University-branded items (hoodies, bags, etc.)

## 🚀 Future Enhancements

Potential improvements:
- Pagination or infinite scroll
- Add to favorites (localStorage)
- Shopping cart functionality
- Resource comparison
- Dark mode toggle
- Animations/transitions
- Integration with actual course enrollment
- Digital resource downloads
- Student reviews and ratings
- Recommendation system based on enrolled courses

## 📝 Notes

- **Custom API Service**: The academic resources API is a custom service built specifically for this university project
- **Course Integration**: All resources are linked to specific course categories (Engineering, Business, Law, etc.)
- **Realistic Data**: Resources include realistic academic information (authors, publishers, ISBNs, editions)
- **Pricing**: All prices are in Indian Rupees (₹)
- **Images**: Uses Unsplash images for realistic product visuals
- **Simulated Network Delay**: Includes simulated network delays to demonstrate loading states

## 🎓 Academic Resources Included

The store includes 18+ academic resources covering:
- **Engineering**: Textbooks, study guides, lab equipment, online courses
- **Business Management**: MBA textbooks, case studies, workbooks
- **Law**: Constitutional law, criminal law, corporate law resources
- **Computer Applications**: Programming guides, software engineering books
- **General**: University merchandise, calculators, and general supplies

---

**Last Updated**: $(date)
**API Version**: v1
**Status**: ✅ Fully Integrated

