# 🚀 Complete Deployment Guide - EduBot Full Stack

## Overview

EduBot consists of two parts that need to be deployed separately:
1. **Frontend** (Next.js) → Deploy to Vercel
2. **Backend** (Node.js/Express) → Deploy to Railway/Render

---

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Railway or Render account (free tier available)
- MongoDB Atlas account (free tier available)
- OpenAI API key OR Google Gemini API key

---

## 🗄️ Step 1: Set Up MongoDB Atlas

1. **Create Account**:
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster**:
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select a region close to you
   - Click "Create Cluster"

3. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Set role to "Atlas Admin"

4. **Whitelist IP Address**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/edubot`

---

## 🔑 Step 2: Get AI API Key

### Option A: Google Gemini (FREE - Recommended for testing)

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your API key
4. Note: Free tier has generous limits

### Option B: OpenAI (PAID - Better quality)

1. Go to https://platform.openai.com/api-keys
2. Create an account and add payment method
3. Click "Create new secret key"
4. Copy your API key
5. Note: Costs ~$0.002 per 1K tokens

---

## 🎯 Step 3: Generate VAPID Keys for Push Notifications

In your terminal:

```bash
cd backend
npm install web-push -g
npx web-push generate-vapid-keys
```

Save both keys - you'll need them!

---

## 🖥️ Step 4: Deploy Backend (Railway - Recommended)

### 4.1 Push Backend to GitHub

```bash
# If not already initialized
cd backend
git init
git add .
git commit -m "Initial backend commit"

# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/edubot-backend.git
git push -u origin main
```

### 4.2 Deploy to Railway

1. **Go to** https://railway.app
2. **Sign up** with GitHub
3. **Create New Project** → "Deploy from GitHub repo"
4. **Select** your backend repository
5. **Add Environment Variables**:
   
   Click on your service → Variables → Add all these:

   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/edubot
   JWT_SECRET=your-super-secret-random-string-here
   JWT_EXPIRE=7d
   AI_PROVIDER=gemini
   GOOGLE_API_KEY=your-gemini-api-key
   VAPID_PUBLIC_KEY=your-vapid-public-key
   VAPID_PRIVATE_KEY=your-vapid-private-key
   VAPID_SUBJECT=mailto:your-email@example.com
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

6. **Deploy**: Railway will automatically deploy
7. **Get your URL**: Click "Settings" → Copy the domain
   - It will be something like: `https://edubot-backend-production.up.railway.app`

### Alternative: Deploy to Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your backend repository
5. Fill in:
   - **Name**: edubot-backend
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Add same environment variables as above
7. Click "Create Web Service"

---

## 🌐 Step 5: Deploy Frontend (Vercel)

### 5.1 Update Frontend Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app/api
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-public-key
```

### 5.2 Deploy to Vercel

**Option A: Using Vercel Dashboard**

1. Push frontend code to GitHub (if not already)
2. Go to https://vercel.com
3. Click "Add New Project"
4. Import your repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or leave default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
6. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
7. Click "Deploy"

**Option B: Using Vercel CLI**

```bash
npm i -g vercel
cd ..  # Go to root directory
vercel

# Follow prompts
# Set environment variables when asked
```

### 5.3 Update Backend with Frontend URL

Go back to Railway/Render and update `FRONTEND_URL` with your Vercel URL:
```
FRONTEND_URL=https://your-app.vercel.app
```

---

## 🔧 Step 6: Update Frontend API Client

Create or update `src/lib/api.ts`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // Auth
  register: (data: any) => fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  
  login: (data: any) => fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  
  // Chat
  sendMessage: (message: string, conversationId: string, token: string) => 
    fetch(`${API_URL}/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message, conversationId }),
    }),
  
  // Reminders
  getReminders: (token: string) => fetch(`${API_URL}/reminders`, {
    headers: { 'Authorization': `Bearer ${token}` },
  }),
  
  createReminder: (data: any, token: string) => fetch(`${API_URL}/reminders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
};
```

---

## ✅ Step 7: Test Your Deployment

### Test Backend

```bash
# Health check
curl https://your-backend-url.up.railway.app/health

# Should return:
{
  "success": true,
  "message": "EduBot API is running",
  "timestamp": "..."
}
```

### Test Frontend

1. Visit your Vercel URL
2. Try signing up
3. Test the chat
4. Create a reminder
5. Test push notifications

---

## 🔔 Step 8: Enable Push Notifications

Add to `public/service-worker.js`:

```javascript
self.addEventListener('push', function(event) {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon || '/icon-192x192.png',
    badge: data.badge || '/badge-72x72.png',
    data: data.data,
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
```

Register service worker in `src/app/layout.tsx`:

```typescript
useEffect(() => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('Service Worker registered'));
  }
}, []);
```

---

## 📊 Monitoring & Logs

### Railway
- Go to your service → "Deployments" → Click latest deployment
- View real-time logs

### Vercel
- Go to your project → "Deployments" → Click deployment
- View build logs and runtime logs

### MongoDB Atlas
- Go to "Metrics" to see database activity
- "Database Access" for user management

---

## 🎉 Post-Deployment Checklist

- [ ] Backend health check returns success
- [ ] Frontend loads without errors
- [ ] Can register new user
- [ ] Can login
- [ ] Chat works with AI responses
- [ ] Can create reminders
- [ ] Push notifications work
- [ ] MongoDB data is being saved
- [ ] CORS allows frontend-backend communication

---

## 🐛 Troubleshooting

### Backend not connecting to MongoDB
- Check MONGODB_URI format
- Verify IP whitelist (0.0.0.0/0)
- Check database user credentials

### Frontend can't reach backend
- Verify FRONTEND_URL in backend
- Check NEXT_PUBLIC_API_URL in frontend
- Ensure CORS is configured correctly

### AI not responding
- Verify API key is correct
- Check API provider is set correctly
- Check API quota/billing (for OpenAI)

### Push notifications not working
- Verify VAPID keys are correct
- Check service worker is registered
- Ensure HTTPS (required for push)

---

## 💰 Cost Breakdown (Free Tier)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| Vercel | ✅ Free | Unlimited deployments |
| Railway | ✅ $5/month free credit | ~500 hours uptime |
| Render | ✅ Free | 750 hours/month |
| MongoDB Atlas | ✅ Free | 512MB storage |
| Google Gemini | ✅ Free | 60 requests/minute |
| OpenAI | ❌ Paid | ~$0.002/1K tokens |

**Recommended Free Stack**: Vercel + Railway + MongoDB Atlas + Google Gemini = $0/month

---

## 🔄 Updating Your Deployment

### Update Backend
```bash
git add .
git commit -m "Update backend"
git push
```
Railway/Render auto-deploys on push!

### Update Frontend
```bash
git add .
git commit -m "Update frontend"
git push
```
Vercel auto-deploys on push!

---

## 📝 Important URLs to Save

After deployment, save these:

```
Frontend URL: https://_____.vercel.app
Backend URL: https://_____.up.railway.app
MongoDB URI: mongodb+srv://_____.mongodb.net/edubot
Railway Dashboard: https://railway.app/dashboard
Vercel Dashboard: https://vercel.com/dashboard
MongoDB Dashboard: https://cloud.mongodb.com
```

---

## 🎊 You're Live!

Your EduBot is now deployed and accessible worldwide! 

Share your frontend URL and start helping students! 🚀
