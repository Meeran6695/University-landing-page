import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Course from './models/Course.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/university_db'

const defaultCourses = [
  {
    name: 'B.Tech Computer Science',
    description: 'Bachelor of Technology in Computer Science with industry-focused curriculum',
    duration: '4 years',
    annualFee: '₹2,20,000',
    totalFee: '₹8,80,000',
    eligibility: '12th with PCM (60% or above)',
    curriculum: ['Data Structures', 'Web Development', 'Database Management', 'Cloud Computing', 'AI & Machine Learning'],
    careerOpportunities: ['Software Developer', 'Data Scientist', 'DevOps Engineer', 'Cloud Architect'],
    status: 'active',
    studentsEnrolled: 150
  },
  {
    name: 'B.Tech Mechanical Engineering',
    description: 'Bachelor of Technology in Mechanical Engineering',
    duration: '4 years',
    annualFee: '₹2,00,000',
    totalFee: '₹8,00,000',
    eligibility: '12th with PCM (60% or above)',
    curriculum: ['Thermodynamics', 'Fluid Mechanics', 'Design Engineering', 'Manufacturing', 'Automotive Technology'],
    careerOpportunities: ['Mechanical Engineer', 'Design Engineer', 'Manufacturing Engineer', 'Automotive Engineer'],
    status: 'active',
    studentsEnrolled: 120
  },
  {
    name: 'B.Tech Civil Engineering',
    description: 'Bachelor of Technology in Civil Engineering',
    duration: '4 years',
    annualFee: '₹2,00,000',
    totalFee: '₹8,00,000',
    eligibility: '12th with PCM (60% or above)',
    curriculum: ['Structural Analysis', 'Geotechnical Engineering', 'Construction Management', 'Surveying', 'Water Resources'],
    careerOpportunities: ['Civil Engineer', 'Project Manager', 'Site Engineer', 'Structural Engineer'],
    status: 'active',
    studentsEnrolled: 100
  },
  {
    name: 'B.Tech Electronics Engineering',
    description: 'Bachelor of Technology in Electronics and Communication Engineering',
    duration: '4 years',
    annualFee: '₹2,10,000',
    totalFee: '₹8,40,000',
    eligibility: '12th with PCM (60% or above)',
    curriculum: ['Digital Electronics', 'Signal Processing', 'Embedded Systems', 'Communication Systems', 'VLSI Design'],
    careerOpportunities: ['Electronics Engineer', 'IoT Developer', 'Embedded Systems Engineer', 'Telecom Engineer'],
    status: 'active',
    studentsEnrolled: 110
  },
  {
    name: 'MBA',
    description: 'Master of Business Administration with specializations',
    duration: '2 years',
    annualFee: '₹3,00,000',
    totalFee: '₹6,00,000',
    eligibility: 'Bachelor\'s degree with 50% marks',
    curriculum: ['Finance', 'Marketing', 'HR Management', 'Operations Management', 'Strategic Management'],
    careerOpportunities: ['Business Analyst', 'Manager', 'Consultant', 'Entrepreneur', 'Investment Banker'],
    status: 'active',
    studentsEnrolled: 80
  },
  {
    name: 'BBA',
    description: 'Bachelor of Business Administration',
    duration: '3 years',
    annualFee: '₹1,50,000',
    totalFee: '₹4,50,000',
    eligibility: '12th pass',
    curriculum: ['Business Management', 'Economics', 'Accounting', 'Marketing', 'Entrepreneurship'],
    careerOpportunities: ['Business Manager', 'Business Analyst', 'Entrepreneur', 'Corporate Trainer'],
    status: 'active',
    studentsEnrolled: 120
  },
  {
    name: 'BCA',
    description: 'Bachelor of Computer Applications',
    duration: '3 years',
    annualFee: '₹1,20,000',
    totalFee: '₹3,60,000',
    eligibility: '12th pass',
    curriculum: ['Programming', 'Database Management', 'Web Development', 'Software Engineering', 'Networking'],
    careerOpportunities: ['Application Developer', 'Web Developer', 'Software Tester', 'Database Administrator'],
    status: 'active',
    studentsEnrolled: 90
  },
  {
    name: 'MCA',
    description: 'Master of Computer Applications',
    duration: '2 years',
    annualFee: '₹1,80,000',
    totalFee: '₹3,60,000',
    eligibility: 'BCA or Bachelor\'s in related field',
    curriculum: ['Advanced Programming', 'Cloud Computing', 'Big Data', 'Machine Learning', 'Cybersecurity'],
    careerOpportunities: ['Senior Software Developer', 'Data Scientist', 'Cloud Architect', 'Security Engineer'],
    status: 'active',
    studentsEnrolled: 60
  },
  {
    name: 'BA LLB',
    description: 'Bachelor of Arts and Law (Integrated)',
    duration: '5 years',
    annualFee: '₹1,80,000',
    totalFee: '₹9,00,000',
    eligibility: '12th pass',
    curriculum: ['Constitutional Law', 'Criminal Law', 'Civil Law', 'Corporate Law', 'Intellectual Property'],
    careerOpportunities: ['Lawyer', 'Judge', 'Legal Consultant', 'Corporate Counsel'],
    status: 'active',
    studentsEnrolled: 70
  },
  {
    name: 'BBA LLB',
    description: 'Bachelor of Business Administration and Law (Integrated)',
    duration: '5 years',
    annualFee: '₹2,00,000',
    totalFee: '₹10,00,000',
    eligibility: '12th pass',
    curriculum: ['Business Law', 'Corporate Law', 'Commercial Law', 'Business Management', 'Finance'],
    careerOpportunities: ['Corporate Lawyer', 'Business Consultant', 'Legal Advisor', 'Judge'],
    status: 'active',
    studentsEnrolled: 55
  }
]

async function seedCourses() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('📦 Connected to MongoDB')

    // Check if courses already exist
    const existingCourses = await Course.countDocuments()
    if (existingCourses > 0) {
      console.log(`⚠️  Database already has ${existingCourses} courses. Skipping seed.`)
      await mongoose.connection.close()
      return
    }

    // Insert default courses
    const insertedCourses = await Course.insertMany(defaultCourses)
    console.log(`✅ Successfully seeded ${insertedCourses.length} courses`)

    // List inserted courses
    insertedCourses.forEach(course => {
      console.log(`   - ${course.name}`)
    })

    await mongoose.connection.close()
    console.log('✅ Database seeding completed!')
  } catch (error) {
    console.error('❌ Error seeding database:', error.message)
    process.exit(1)
  }
}

seedCourses()
