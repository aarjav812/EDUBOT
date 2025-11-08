# 🚀 EduBot - Complete Setup Guide

This guide will help you set up the complete EduBot project (Frontend + Backend) for local development.

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community)) OR [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) (Free)
- **Git** ([Download](https://git-scm.com/))
- **Code Editor** (VS Code recommended)

## 🎯 Quick Start (5 minutes)

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd EDUBOT

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service
- Connection string: `mongodb://localhost:27017/edubot`

**Option B: MongoDB Atlas (Cloud - FREE)**
1. Create account at https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster (M0)
3. Create database user
4. Whitelist IP: 0.0.0.0/0
5. Get connection string

### 3. Get AI API Key

**Option A: Google Gemini (FREE - Recommended for development)**
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy key

**Option B: OpenAI (PAID)**
1. Go to https://platform.openai.com/api-keys
2. Create API key
3. Add payment method

### 4. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
# Required
MONGODB_URI=mongodb://localhost:27017/edubot  # Or your Atlas URI
JWT_SECRET=my-super-secret-jwt-key-change-this
AI_PROVIDER=gemini
GOOGLE_API_KEY=your-gemini-api-key-here

# Optional (for push notifications)
VAPID_PUBLIC_KEY=generate-these-keys
VAPID_PRIVATE_KEY=see-below
VAPID_SUBJECT=mailto:your-email@example.com
```

**Generate VAPID Keys:**
```bash
npx web-push generate-vapid-keys
```
Copy the output to your .env file.

### 5. Configure Frontend

Create `.env.local` in root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-public-key
```

### 6. Run the Project

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║     🤖 EduBot API Server Running      ║
║     Port: 5000                        ║
╚════════════════════════════════════════╝
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Visit: http://localhost:3000 🎉

---

## 📁 Project Structure

```
EDUBOT/
├── backend/                  # Backend API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth & validation
│   │   ├── services/        # AI & notifications
│   │   └── server.ts        # Entry point
│   ├── package.json
│   └── .env                 # Backend config
│
├── src/                      # Frontend (Next.js)
│   ├── app/                 # Pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities & API
│   └── types/               # TypeScript types
│
├── public/                   # Static files
│   ├── service-worker.js    # Push notifications
│   └── manifest.json        # PWA config
│
├── package.json             # Frontend dependencies
└── .env.local               # Frontend config
```

---

## 🔧 Configuration Details

### Backend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment | No | development |
| `MONGODB_URI` | MongoDB connection | **Yes** | mongodb://localhost:27017/edubot |
| `JWT_SECRET` | Secret for JWT tokens | **Yes** | random-secret-string |
| `JWT_EXPIRE` | Token expiry | No | 7d |
| `AI_PROVIDER` | AI service (openai/gemini) | **Yes** | gemini |
| `GOOGLE_API_KEY` | Gemini API key | If using Gemini | AIza... |
| `OPENAI_API_KEY` | OpenAI API key | If using OpenAI | sk-... |
| `VAPID_PUBLIC_KEY` | Push notification public key | For notifications | Generated |
| `VAPID_PRIVATE_KEY` | Push notification private key | For notifications | Generated |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:3000 |

### Frontend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | **Yes** |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Push notification key | For notifications |

---

## 🧪 Testing the Setup

### 1. Test Backend

```bash
# Health check
curl http://localhost:5000/health

# Should return:
{
  "success": true,
  "message": "EduBot API is running"
}
```

### 2. Test Frontend

1. Open http://localhost:3000
2. Click "Start Your Journey"
3. You should see the chat interface

### 3. Test Full Flow

1. **Register**: Create an account
2. **Login**: Sign in with your credentials
3. **Chat**: Send a message and get AI response
4. **Reminder**: Create a reminder (if implemented in UI)

---

## 🐛 Troubleshooting

### Backend won't start

**Error: Cannot connect to MongoDB**
```bash
# Solution: Start MongoDB service
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Error: AI_PROVIDER not configured**
```bash
# Solution: Set AI provider in backend/.env
AI_PROVIDER=gemini
GOOGLE_API_KEY=your-key-here
```

### Frontend can't connect to backend

**Error: Failed to fetch**
```bash
# Solution: Check if backend is running on port 5000
# Verify NEXT_PUBLIC_API_URL in .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### MongoDB connection issues

**Error: Authentication failed**
```bash
# For Atlas: Check username/password in connection string
# For Local: Remove authentication from connection string
MONGODB_URI=mongodb://localhost:27017/edubot
```

---

## 📚 Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run linter
```

### Backend

```bash
npm run dev          # Start with nodemon (auto-reload)
npm run build        # Compile TypeScript
npm start            # Start production server
npm run lint         # Run linter
```

---

## 🎨 Next Steps

After setting up:

1. **Customize AI Responses**: Edit `backend/src/services/aiService.ts`
2. **Add Features**: Create new routes in `backend/src/routes/`
3. **Update UI**: Modify components in `src/components/`
4. **Deploy**: Follow `DEPLOYMENT_GUIDE.md`

---

## 💡 Pro Tips

- Use **MongoDB Compass** to view your database visually
- Use **Postman** to test API endpoints
- Enable **React DevTools** for debugging
- Use **VS Code** with ESLint and Prettier extensions

---

## 🔒 Security Notes

⚠️ **For Development Only:**
- JWT_SECRET should be strong and random
- Never commit `.env` files
- Use different secrets for production

✅ **For Production:**
- Use environment variables on hosting platform
- Enable HTTPS everywhere
- Use strong passwords
- Follow DEPLOYMENT_GUIDE.md

---

## 📖 Documentation

- [Backend API Documentation](./backend/README.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Frontend README](./README.md)

---

## 🆘 Need Help?

- **MongoDB Issues**: https://www.mongodb.com/docs/
- **Next.js Issues**: https://nextjs.org/docs
- **API Issues**: Check `backend/README.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`

---

## 🎉 Success!

If you see the EduBot homepage and can send messages, you're all set! 

Happy coding! 🚀
