# University Landing Pages Project

This project contains two single-page landing pages for private universities with integrated lead forms and API endpoints.

## 🎯 Project Structure

```
university-landing-pages/
├── index.html              # Landing Page 1 - TechVista University
├── university2.html        # Landing Page 2 - Global Excellence University
├── styles.css              # Shared CSS styles
├── script.js               # Shared JavaScript functionality
├── server.js               # Express server with API endpoints
├── package.json            # Node.js dependencies
├── vercel.json             # Vercel deployment configuration
└── README.md               # This file
```

## 🚀 Features

### Landing Pages
- **Two Complete Landing Pages** for different universities
- **Responsive Design** - Works seamlessly on mobile and desktop
- **Sections Included:**
  - Hero section with CTAs
  - University Overview
  - Courses
  - Fee Structure
  - Placements
  - Facilities
  - Lead Form

### Lead Form
- All required fields:
  - Full Name
  - Email
  - Phone Number (10-digit validation)
  - State
  - Course Interested
  - Intake Year
  - Consent Checkbox
- **Pipedream Integration** - Form submissions sent to Pipedream webhook
- **Success/Error Messages** - Displayed without page refresh
- **Form Validation** - Client-side validation for all fields

### APIs
- **Simple JSON Endpoint**: `/api/simple`
- **Nested JSON Endpoint**: `/api/nested`
- **Fees API**: `/api/fees/university1` and `/api/fees/university2`
- **Universities API**: `/api/universities`

### Additional Features
- **Modal for Course Fees** - Dynamic fee display from API
- **Download Brochure** - CTA functionality
- **Smooth Scrolling** - Enhanced user experience
- **Modern UI/UX** - Beautiful, professional design

## 📋 Setup Instructions

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Pipedream Webhook**
   - Open `script.js`
   - Replace `YOUR_PIPEDREAM_WEBHOOK_URL_HERE` with your actual Pipedream webhook URL

3. **Start the Server**
   ```bash
   npm start
   ```

4. **Access the Pages**
   - Landing Page 1: `http://localhost:3000/index.html`
   - Landing Page 2: `http://localhost:3000/university2.html`
   - API Endpoints: `http://localhost:3000/api/simple`, etc.

## 🔗 Pipedream Setup

1. Go to [Pipedream](https://pipedream.com)
2. Create a new workflow
3. Add an HTTP trigger
4. Copy the webhook URL
5. Update the `PIPEDREAM_WEBHOOK_URL` in `script.js`

### Sample Pipedream Workflow
```
1. HTTP Trigger (POST)
2. Add step to log data (optional)
3. Add step to send email/SMS/CRM integration (optional)
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Free SSL)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** and your site will be live with SSL

### Option 2: Netlify (Free SSL)

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

3. **Or use Netlify Dashboard:**
   - Connect your Git repository
   - Set build command: `npm install`
   - Set publish directory: `.`
   - Deploy

### Option 3: GitHub Pages (Static Only)

For static hosting without server:
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Note: API endpoints won't work (use JSON files instead)

### Option 4: Render (Free SSL)

1. Connect your Git repository
2. Create a new Web Service
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Deploy

## 📡 API Endpoints

### Simple JSON
```
GET /api/simple
Response: Simple JSON object with status and data
```

### Nested JSON
```
GET /api/nested
Response: Complex nested JSON with university data
```

### Fees API
```
GET /api/fees/university1
GET /api/fees/university2
Response: Course-wise fee structure
```

### Universities API
```
GET /api/universities
Response: List of all universities
```

## 📱 Responsive Design

The pages are fully responsive and tested for:
- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px and above

## ✅ Requirements Checklist

- [x] Two Single-Page Landing Pages
- [x] Lead Form with all required fields
- [x] Pipedream API integration
- [x] Simple JSON API endpoint
- [x] Nested JSON API endpoint
- [x] Mobile & Desktop Responsive
- [x] SSL-ready deployment configuration
- [x] Modal for Course Fees
- [x] Success/Error messages without page refresh
- [x] All CTAs functional

## 🔧 Configuration

### Update Pipedream URL
Edit `script.js` line 2:
```javascript
const PIPEDREAM_WEBHOOK_URL = 'https://your-pipedream-webhook-url';
```

## 📝 Notes

- The form has a fallback to localStorage if Pipedream URL is not configured
- All API endpoints work both locally and when deployed
- The design is modern and professional
- All animations and interactions are smooth

## 🎨 Customization

- **Colors**: Edit CSS variables in `styles.css` (`:root` section)
- **Content**: Edit HTML files directly
- **API Data**: Modify `server.js` endpoints

## 📞 Support

For issues or questions, please refer to the deployment platform documentation or check the code comments.

---

**Built with ❤️ for University Landing Pages**

