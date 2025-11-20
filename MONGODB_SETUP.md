# MongoDB Setup Guide

## Installation

### Option 1: Local MongoDB

1. **Install MongoDB Community Edition:**
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - macOS: `brew install mongodb-community`
   - Linux: Follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB:**
   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   mongod
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env` file with your Atlas connection string

## Configuration

1. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your MongoDB connection string:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/university_db
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/university_db
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm run server
   ```

## Database Models

The application uses three main models:

1. **User** - Stores user accounts (students and admins)
2. **Application** - Stores student applications
3. **Course** - Stores course information

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create application
- `GET /api/applications/:id` - Get application by ID
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course
- `GET /api/courses/:id` - Get course by ID
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Messages
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Create message
- `GET /api/messages/:id` - Get message by ID
- `PUT /api/messages/:id` - Update message (add reply)
- `DELETE /api/messages/:id` - Delete message

## Seeding Database with Default Courses

To populate the database with default courses (B.Tech, MBA, BBA, BCA, MCA, BA LLB, etc.):

```bash
npm run seed
```

This will insert 10 pre-configured courses into MongoDB. The seed script will:
- Check if courses already exist
- Skip seeding if courses are already present
- Display inserted courses in the console

**Default Courses Included:**
1. B.Tech Computer Science (₹2,20,000/year)
2. B.Tech Mechanical Engineering (₹2,00,000/year)
3. B.Tech Civil Engineering (₹2,00,000/year)
4. B.Tech Electronics Engineering (₹2,10,000/year)
5. MBA (₹3,00,000/year)
6. BBA (₹1,50,000/year)
7. BCA (₹1,20,000/year)
8. MCA (₹1,80,000/year)
9. BA LLB (₹1,80,000/year)
10. BBA LLB (₹2,00,000/year)

## Adding Courses from Admin Dashboard

After logging in as admin, navigate to **Admin Dashboard → Courses** and:
1. Click **"+ Add Course"** button
2. Fill in the course details:
   - Course Name (required)
   - Duration (required)
   - Annual Fee (required)
   - Description (required)
   - Total Fee
   - Eligibility
3. Click **"Save Course"** to add the course

## Fallback Mode

If MongoDB is not available, the application will automatically fall back to using localStorage for data storage. This allows the app to work even without a database connection.

## Creating Admin User

To create an admin user, register with an email containing "admin" or use:
- Email: `admin@university.edu`
- The system will automatically assign admin role

Or manually update in MongoDB:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

