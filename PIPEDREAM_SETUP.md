# Pipedream Setup Guide

This guide will help you set up a Pipedream workflow to receive form submissions from the landing pages.

## 📋 Step-by-Step Instructions

### 1. Create Pipedream Account

1. Go to [pipedream.com](https://pipedream.com)
2. Sign up for a free account (GitHub/Google/Email)
3. Complete the onboarding process

### 2. Create a New Workflow

1. Click **"New"** button in the top right
2. Select **"HTTP / Webhook"** trigger
3. Choose **"HTTP"** option

### 3. Configure HTTP Trigger

1. **Method**: Select `POST`
2. **Path**: Leave default or set custom path (e.g., `/university-leads`)
3. Click **"Save"** or **"Continue"**

### 4. Get Your Webhook URL

1. After creating the trigger, you'll see a **Webhook URL**
2. It will look like: `https://your-id.m.pipedream.net`
3. **Copy this URL** - you'll need it for the next step

### 5. Update Your Landing Page

1. Open `script.js` in your project
2. Find this line:
   ```javascript
   const PIPEDREAM_WEBHOOK_URL = 'YOUR_PIPEDREAM_WEBHOOK_URL_HERE';
   ```
3. Replace with your actual Pipedream URL:
   ```javascript
   const PIPEDREAM_WEBHOOK_URL = 'https://your-id.m.pipedream.net';
   ```

### 6. Add Actions (Optional but Recommended)

You can add steps to process the form data:

#### Option A: Send Email Notification
1. Click **"+"** to add a step
2. Search for **"Email"** or **"Gmail"**
3. Configure:
   - To: Your email address
   - Subject: "New University Lead"
   - Body: Include form data fields

#### Option B: Store in Google Sheets
1. Add step: **"Google Sheets"**
2. Select **"Add Single Row"**
3. Connect your Google account
4. Select spreadsheet and worksheet
5. Map form fields to columns

#### Option C: Send to CRM (Salesforce, HubSpot, etc.)
1. Add step for your CRM
2. Connect account
3. Map fields to create a lead/contact

#### Option D: Send SMS (Twilio)
1. Add step: **"Twilio"**
2. Connect Twilio account
3. Configure SMS with form data

### 7. Test Your Workflow

1. **Test in Pipedream:**
   - Click **"Send Test Event"** in the HTTP trigger
   - Use sample JSON data:
     ```json
     {
       "fullName": "Test User",
       "email": "test@example.com",
       "phone": "1234567890",
       "state": "Karnataka",
       "course": "B.Tech Computer Science",
       "intakeYear": "2025",
       "consent": true,
       "university": "TechVista University"
     }
     ```

2. **Test from Landing Page:**
   - Deploy your site or run locally
   - Fill out the form
   - Submit and check Pipedream workflow runs

## 📊 Form Data Structure

Your form sends the following data structure:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "state": "Karnataka",
  "course": "B.Tech Computer Science",
  "intakeYear": "2025",
  "consent": true,
  "university": "TechVista University",
  "source": "university1",
  "timestamp": "2024-11-15T10:30:00.000Z"
}
```

## 🔧 Advanced Configuration

### Add Data Validation

Add a **Code** step to validate data:
```javascript
export default defineComponent({
  async run({ steps, $ }) {
    const data = steps.trigger.event.body;
    
    // Validate email
    if (!data.email.includes('@')) {
      return { error: 'Invalid email' };
    }
    
    // Validate phone (10 digits)
    if (data.phone.length !== 10) {
      return { error: 'Invalid phone number' };
    }
    
    return { valid: true, data };
  },
})
```

### Add Duplicate Check

Use **Memory Store** or **Database** step to check for duplicate submissions.

### Add Rate Limiting

Configure rate limiting in Pipedream settings to prevent spam.

## 🎯 Sample Workflow Structure

```
1. HTTP Trigger (POST)
   ↓
2. Code Step (Validate Data)
   ↓
3. Conditional (If Valid)
   ├─ Yes → Send Email
   ├─ Yes → Add to Google Sheets
   └─ Yes → Send to CRM
   ↓
4. Return Success Response
```

## 📝 Response Format

Your workflow can return a response to the form:

```javascript
// In a Code step at the end
return {
  status: 'success',
  message: 'Lead received successfully'
}
```

The form will display this message to the user.

## 🔒 Security Considerations

1. **Webhook URL**: Keep it private (don't commit to public repos)
2. **Rate Limiting**: Enable in Pipedream settings
3. **Data Validation**: Always validate incoming data
4. **HTTPS**: Pipedream uses HTTPS by default

## 💡 Tips

- **Free Tier**: Pipedream free tier includes 100 invocations/day
- **Upgrade**: For production, consider paid plans
- **Monitoring**: Check workflow runs in Pipedream dashboard
- **Logs**: View detailed logs for debugging
- **Testing**: Use test events before going live

## 🐛 Troubleshooting

### Form submissions not reaching Pipedream
- Check webhook URL is correct
- Verify CORS settings (Pipedream handles this automatically)
- Check browser console for errors
- Verify network connectivity

### Data not formatted correctly
- Check Pipedream event body structure
- Verify Content-Type header is `application/json`
- Check form data mapping

### Workflow not triggering
- Verify HTTP method is POST
- Check workflow is active (not paused)
- Verify webhook URL is correct

---

**Need Help?** Check [Pipedream Documentation](https://pipedream.com/docs) or their community forum.

