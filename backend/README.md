# 🤖 EduBot Backend API

A robust backend API for EduBot featuring AI-powered chat, authentication, reminders, and push notifications.

## 🚀 Features

- **🔐 Authentication**: JWT-based auth with bcrypt password hashing
- **🤖 AI Chatbot**: Integration with OpenAI GPT or Google Gemini
- **📅 Smart Reminders**: Create, manage, and get notified about deadlines
- **🔔 Push Notifications**: Browser notifications for reminders
- **💬 Chat History**: Persistent conversation storage
- **🔒 Security**: Helmet, rate limiting, CORS protection
- **📊 MongoDB**: Scalable database with Mongoose ODM

## 📋 Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- OpenAI API key OR Google Gemini API key

## 🛠️ Installation

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env
```

4. **Edit `.env` file** with your values:
- Set `MONGODB_URI` (local MongoDB or Atlas)
- Choose AI provider (`openai` or `gemini`)
- Add your API key (`OPENAI_API_KEY` or `GOOGLE_API_KEY`)
- Generate VAPID keys for push notifications:
```bash
npx web-push generate-vapid-keys
```

## 🔧 Configuration

### MongoDB Setup

**Option 1: Local MongoDB**
```
MONGODB_URI=mongodb://localhost:27017/edubot
```

**Option 2: MongoDB Atlas** (Free tier available)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env`:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/edubot
```

### AI Provider Setup

**Option 1: OpenAI** (Paid, better quality)
1. Get API key from https://platform.openai.com/api-keys
2. Update `.env`:
```
AI_PROVIDER=openai
OPENAI_API_KEY=your-api-key
```

**Option 2: Google Gemini** (Free tier available)
1. Get API key from https://makersuite.google.com/app/apikey
2. Update `.env`:
```
AI_PROVIDER=gemini
GOOGLE_API_KEY=your-api-key
```

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (auth required)
- `PUT /api/auth/profile` - Update profile (auth required)

### Chat
- `GET /api/chat/history/:conversationId?` - Get chat history
- `POST /api/chat/message` - Send message and get AI response
- `DELETE /api/chat/conversation/:conversationId` - Delete conversation

### Reminders
- `GET /api/reminders` - Get all reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder
- `PATCH /api/reminders/:id/complete` - Mark as completed
- `POST /api/reminders/subscribe` - Subscribe to push notifications
- `POST /api/reminders/unsubscribe` - Unsubscribe

### Health Check
- `GET /health` - Check API status

## 📝 Example Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "university": "MIT",
    "course": "Computer Science"
  }'
```

### Send Chat Message
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "message": "What are my upcoming deadlines?",
    "conversationId": "conv-123"
  }'
```

### Create Reminder
```bash
curl -X POST http://localhost:5000/api/reminders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Math Assignment",
    "type": "assignment",
    "dueDate": "2025-11-15T23:59:00Z",
    "reminderTime": "2025-11-15T18:00:00Z",
    "priority": "high"
  }'
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── authController.ts
│   │   ├── chatController.ts
│   │   └── reminderController.ts
│   ├── models/           # MongoDB models
│   │   ├── User.ts
│   │   ├── Message.ts
│   │   └── Reminder.ts
│   ├── routes/           # API routes
│   │   ├── authRoutes.ts
│   │   ├── chatRoutes.ts
│   │   └── reminderRoutes.ts
│   ├── middleware/       # Custom middleware
│   │   ├── auth.ts
│   │   └── validate.ts
│   ├── services/         # Business logic
│   │   ├── aiService.ts
│   │   └── notificationService.ts
│   ├── utils/            # Utilities
│   │   ├── db.ts
│   │   └── scheduler.ts
│   └── server.ts         # Entry point
├── package.json
├── tsconfig.json
└── .env
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT authentication
- ✅ Helmet security headers
- ✅ CORS protection
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Input validation
- ✅ MongoDB injection prevention

## 🚀 Deployment

See `../DEPLOYMENT_GUIDE.md` for full deployment instructions.

### Quick Deploy Options

1. **Railway** (Recommended - Free tier)
2. **Render** (Free tier)
3. **Heroku** (Paid)
4. **DigitalOcean App Platform** (Paid)

## 📊 Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| PORT | Server port | No | 5000 |
| NODE_ENV | Environment | No | development |
| MONGODB_URI | MongoDB connection | Yes | - |
| JWT_SECRET | JWT secret key | Yes | - |
| JWT_EXPIRE | Token expiry | No | 7d |
| AI_PROVIDER | AI provider (openai/gemini) | Yes | gemini |
| OPENAI_API_KEY | OpenAI API key | Conditional | - |
| GOOGLE_API_KEY | Gemini API key | Conditional | - |
| VAPID_PUBLIC_KEY | Push notification public key | Yes | - |
| VAPID_PRIVATE_KEY | Push notification private key | Yes | - |
| FRONTEND_URL | Frontend URL for CORS | No | http://localhost:3000 |

## 🧪 Testing

```bash
# Run health check
curl http://localhost:5000/health

# Should return:
{
  "success": true,
  "message": "EduBot API is running",
  "timestamp": "2025-11-08T..."
}
```

## 📝 License

MIT

## 🤝 Support

For issues or questions, please open an issue in the repository.
