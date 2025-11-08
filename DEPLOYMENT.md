# 🚀 EduBot Deployment Guide

## ✅ Pre-Deployment Checklist

### Backend
- [x] MongoDB Atlas connected
- [x] Google Gemini API configured and working
- [x] JWT authentication implemented
- [x] Error handling in place
- [x] Environment variables configured

### Frontend
- [x] Login/Signup pages complete
- [x] AI Chat working with real backend
- [x] Protected routes implemented
- [x] API client with error handling
- [x] Responsive design with Framer Motion

---

## 🌐 Backend Deployment (Railway/Render)

### Option 1: Railway (Recommended)

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Deploy Backend**
   ```bash
   cd backend
   railway init
   railway up
   ```

4. **Add Environment Variables** (in Railway Dashboard)
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<generate-secure-random-string>
   JWT_EXPIRE=7d
   GOOGLE_API_KEY=AIzaSyBNdM3Z_85aGd6jWSHsfquYPfXv35Lbe3g
   GEMINI_MODEL=models/gemini-2.5-flash
   AI_PROVIDER=gemini
   FRONTEND_URL=https://your-frontend-url.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

5. **Get your backend URL**: `https://your-app.railway.app`

### Option 2: Render

1. Go to https://render.com
2. Click **New → Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add all environment variables from above
6. Deploy!

---

## 🎨 Frontend Deployment (Vercel)

1. **Update `.env.local`** (create `.env.production`)
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   ```

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```

4. **Or use Vercel Dashboard**
   - Go to https://vercel.com
   - Import your GitHub repo
   - Add environment variable: `NEXT_PUBLIC_API_URL`
   - Deploy!

---

## 🔧 Production Environment Variables

### Backend (.env)
```properties
# Server
PORT=5000
NODE_ENV=production

# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edubot

# JWT
JWT_SECRET=<CHANGE-THIS-TO-RANDOM-64-CHAR-STRING>
JWT_EXPIRE=7d

# AI (Google Gemini)
GOOGLE_API_KEY=AIzaSyBNdM3Z_85aGd6jWSHsfquYPfXv35Lbe3g
GEMINI_MODEL=models/gemini-2.5-flash
AI_PROVIDER=gemini

# CORS
FRONTEND_URL=https://your-app.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env.production)
```properties
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
```

---

## 🧪 Testing Production Build Locally

### Backend
```bash
cd backend
npm run build  # If you add a build script
npm start
```

### Frontend
```bash
npm run build
npm start
```

Visit `http://localhost:3000` to test production build.

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET to a secure random string (64+ characters)
- [ ] Enable CORS only for your frontend URL
- [ ] Use HTTPS for both frontend and backend
- [ ] Keep API keys in environment variables (never commit to Git)
- [ ] Set proper rate limits
- [ ] Enable MongoDB IP whitelist (or allow all for cloud deployment)

---

## 📊 Post-Deployment

1. **Test the complete flow:**
   - Signup → Login → Chat → Logout

2. **Monitor logs:**
   - Railway: `railway logs`
   - Vercel: Check dashboard

3. **Check performance:**
   - Gemini API usage: https://aistudio.google.com
   - MongoDB usage: MongoDB Atlas dashboard

---

## 🐛 Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your Vercel URL
- Check CORS configuration in `backend/src/server.ts`

### Database Connection Failed
- Check MongoDB Atlas IP whitelist
- Verify `MONGODB_URI` is correct
- Allow access from anywhere (0.0.0.0/0) for cloud deployment

### API Not Working
- Check environment variables are set correctly
- Verify backend URL in frontend `.env.production`
- Check Railway/Render logs for errors

### Gemini API Errors
- Verify API key is valid
- Check quota at https://aistudio.google.com
- Model name must be `models/gemini-2.5-flash`

---

## 🎉 Your App is Live!

**Frontend**: https://your-app.vercel.app  
**Backend**: https://your-backend.railway.app

**Next Steps:**
1. Build Reminders page
2. Add push notifications
3. Create user profile/settings page
4. Add more AI features!
