# Deployment Guide

This guide will help you deploy the University Landing Pages project to various free hosting platforms with SSL.

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended - Easiest)

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to project folder: `cd university-landing-pages`
3. Run: `vercel`
4. Follow prompts (press Enter for defaults)
5. Your site will be live with SSL!

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects settings
6. Click "Deploy"

**Your URLs will be:**
- Main: `https://your-project.vercel.app`
- LP1: `https://your-project.vercel.app/index.html`
- LP2: `https://your-project.vercel.app/university2.html`

### 2. Netlify

**Steps:**
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Navigate to project: `cd university-landing-pages`
3. Run: `netlify deploy --prod`
4. Follow prompts
5. Site will be live with SSL!

**Or use Netlify Dashboard:**
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub/GitLab/Bitbucket
5. Select repository
6. Build settings:
   - Build command: `npm install`
   - Publish directory: `.`
7. Click "Deploy site"

### 3. Render

**Steps:**
1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click "New +" → "Web Service"
4. Connect your Git repository
5. Settings:
   - Name: `university-landing-pages`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. Click "Create Web Service"
7. Wait for deployment (free SSL included)

### 4. Railway

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select your repository
6. Railway auto-detects Node.js
7. Deploy (free SSL included)

## ⚙️ Pre-Deployment Checklist

Before deploying, make sure to:

1. **Update Pipedream Webhook URL**
   - Edit `script.js`
   - Replace `YOUR_PIPEDREAM_WEBHOOK_URL_HERE` with your actual URL

2. **Test Locally**
   ```bash
   npm install
   npm start
   ```
   - Visit `http://localhost:3000/index.html`
   - Test form submission
   - Test API endpoints

3. **Environment Variables (if needed)**
   - Some platforms may require PORT environment variable
   - Most auto-detect, but you can set: `PORT=3000`

## 🔐 SSL Certificate

All recommended platforms provide **free SSL certificates**:
- ✅ Vercel - Automatic HTTPS
- ✅ Netlify - Automatic HTTPS
- ✅ Render - Automatic HTTPS
- ✅ Railway - Automatic HTTPS

No additional configuration needed!

## 📝 Post-Deployment

After deployment:

1. **Test Your URLs:**
   - Landing Page 1
   - Landing Page 2
   - API endpoints (`/api/simple`, `/api/nested`, etc.)

2. **Test Form Submission:**
   - Fill out the lead form
   - Check Pipedream for incoming data

3. **Test Responsive Design:**
   - Open on mobile device
   - Test on different screen sizes

## 🐛 Troubleshooting

### API Endpoints Not Working
- Make sure you're using a platform that supports Node.js (Vercel, Render, Railway)
- For static hosting (GitHub Pages), APIs won't work - use JSON files instead

### Form Not Submitting
- Check browser console for errors
- Verify Pipedream webhook URL is correct
- Check CORS settings if needed

### Styles Not Loading
- Ensure all files are in the same directory
- Check file paths in HTML (should be relative)

## 📦 Static Hosting Alternative

If you need to use static hosting (GitHub Pages, etc.):

1. Remove `server.js` dependency
2. Create JSON files in `/api/` folder:
   - `api/simple.json`
   - `api/nested.json`
   - `api/fees/university1.json`
   - `api/fees/university2.json`
3. Update `script.js` to fetch from JSON files instead
4. Deploy as static site

## 🔗 Custom Domain (Optional)

Most platforms allow custom domains:
- **Vercel**: Settings → Domains → Add Domain
- **Netlify**: Domain settings → Add custom domain
- **Render**: Settings → Custom Domains

---

**Need Help?** Check the main README.md or platform-specific documentation.

