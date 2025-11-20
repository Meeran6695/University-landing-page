# Quick Start Guide

Get your university landing pages up and running in 5 minutes!

## 🚀 Fastest Way to Deploy

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Pipedream (Optional but Recommended)

1. Go to [pipedream.com](https://pipedream.com) and sign up
2. Create a new workflow with HTTP trigger
3. Copy the webhook URL
4. Open `script.js` and replace `YOUR_PIPEDREAM_WEBHOOK_URL_HERE` with your URL

### Step 3: Test Locally
```bash
npm start
```

Visit:
- Landing Page 1: http://localhost:3000/index.html
- Landing Page 2: http://localhost:3000/university2.html
- API Test: http://localhost:3000/api/simple

### Step 4: Deploy to Vercel

```bash
npm i -g vercel
vercel
```

That's it! Your site is live with SSL.

## 📋 What You Get

✅ Two beautiful landing pages
✅ Fully responsive (mobile + desktop)
✅ Lead form with validation
✅ API endpoints
✅ Modal for course fees
✅ Success/error messages
✅ Professional design

## 🔧 Configuration

### Update Pipedream URL
Edit `script.js` line 2:
```javascript
const PIPEDREAM_WEBHOOK_URL = 'https://your-webhook-url';
```

### Customize Content
- Edit `index.html` for University 1
- Edit `university2.html` for University 2
- Edit `styles.css` for colors/styling

## 📱 Test on Mobile

1. Deploy your site
2. Open on mobile device
3. Test form submission
4. Verify responsive design

## 🎯 Next Steps

1. ✅ Deploy to hosting platform
2. ✅ Configure Pipedream webhook
3. ✅ Test form submissions
4. ✅ Customize content if needed
5. ✅ Share your landing page URLs

## 📚 Need More Help?

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Pipedream Setup**: See `PIPEDREAM_SETUP.md`

---

**Ready to go live?** Follow Step 4 above! 🚀

