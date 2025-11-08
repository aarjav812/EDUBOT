# 🧪 TESTING GUIDE - EduBot Full Stack Application

## ✅ Testing Status

### Backend Status
- ✅ Server running on `http://localhost:5000`
- ✅ MongoDB connected to Atlas
- ✅ AI provider: Gemini/OpenAI configured
- ✅ All API endpoints ready

### Frontend Status
- ✅ Server running on `http://localhost:3000`
- ✅ Auth system integrated
- ✅ API client configured
- ✅ Real AI chat connected

---

## 🚀 TESTING WORKFLOW

### Step 1: Test Registration (Signup)
1. **Navigate to**: http://localhost:3000
2. **Click**: "Sign Up Free" button on homepage
3. **Fill out the form**:
   ```
   Name: John Doe
   Email: john@test.com
   Password: test123
   Confirm Password: test123
   University: Harvard (optional)
   Course: Computer Science (optional)
   Year: 2nd Year (optional)
   ```
4. **Click**: "Create Account"

**Expected Result**:
- ✅ Account created successfully
- ✅ Automatically logged in
- ✅ Redirected to `/chat` page
- ✅ User name appears in top-right menu

---

### Step 2: Test AI Chat
1. **You should now be on**: http://localhost:3000/chat
2. **Send a message**: "Explain quantum physics in simple terms"
3. **Wait for AI response** (2-5 seconds)

**Expected Result**:
- ✅ Message sent appears on right (user bubble)
- ✅ AI response appears on left (bot bubble)
- ✅ Response should be intelligent and relevant (from Gemini/OpenAI)
- ✅ NOT the old static responses

**Try more messages**:
- "Help me create a study plan for finals"
- "Set a reminder for my homework"
- "Explain photosynthesis"

---

### Step 3: Test Logout
1. **Click**: User menu (top-right with your name)
2. **Click**: "Logout"

**Expected Result**:
- ✅ Logged out successfully
- ✅ Redirected to homepage (`/`)
- ✅ Homepage now shows "Sign Up Free" and "Login" buttons
- ✅ Cannot access `/chat` (redirects to `/login`)

---

### Step 4: Test Login
1. **Navigate to**: http://localhost:3000
2. **Click**: "Login" button
3. **Enter credentials**:
   ```
   Email: john@test.com
   Password: test123
   ```
4. **Click**: "Login"

**Expected Result**:
- ✅ Logged in successfully
- ✅ Redirected to `/chat`
- ✅ Previous chat history should still be there
- ✅ Can continue chatting

---

### Step 5: Test Protected Routes
**Try accessing these URLs directly** (when logged out):
- http://localhost:3000/chat
- http://localhost:3000/reminders

**Expected Result**:
- ✅ Automatically redirected to `/login`
- ✅ After login, redirected to requested page

---

### Step 6: Test Error Handling

**Test Invalid Login**:
1. Go to `/login`
2. Enter wrong password
3. **Expected**: Error message "Invalid credentials"

**Test Duplicate Email**:
1. Go to `/signup`
2. Try registering with same email again
3. **Expected**: Error message "User already exists"

**Test Password Mismatch**:
1. Go to `/signup`
2. Enter different passwords
3. **Expected**: Error message "Passwords do not match"

---

## 🔍 WHAT TO CHECK IN BROWSER

### 1. Network Tab (DevTools → Network)
**When sending a chat message**, you should see:
- ✅ `POST http://localhost:5000/api/chat/message`
- ✅ Status: `200 OK`
- ✅ Response contains AI-generated text

**When logging in**, you should see:
- ✅ `POST http://localhost:5000/api/auth/login`
- ✅ Status: `200 OK`
- ✅ Response contains `token` and `user` data

### 2. Console Tab
- ❌ **Should NOT see**: CORS errors
- ❌ **Should NOT see**: 401 Unauthorized errors
- ✅ **May see**: Normal Next.js development messages

### 3. Application Tab → Local Storage
**Should contain**:
- ✅ `token`: Your JWT token (long string)
- ✅ `user`: JSON object with your user data

---

## 📊 BACKEND TESTING (Optional)

### Test with Postman/Thunder Client

**1. Register User**
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "university": "MIT",
  "course": "AI",
  "year": 3
}
```

**2. Login**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response should include**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": { "id": "...", "name": "Test User", ... }
  }
}
```

**3. Test AI Chat** (Copy token from login response)
```http
POST http://localhost:5000/api/chat/message
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "message": "Explain photosynthesis",
  "conversationId": "test-conv-123"
}
```

**Response should include**:
```json
{
  "success": true,
  "data": {
    "message": {
      "content": "Photosynthesis is the process...",
      "role": "assistant",
      ...
    }
  }
}
```

---

## 🐛 COMMON ISSUES & FIXES

### Issue 1: "Cannot connect to backend"
**Symptoms**: Chat messages fail, login fails
**Solution**:
1. Check backend is running: `cd backend && npm run dev`
2. Verify MongoDB connection in backend terminal
3. Check `.env` file in backend has correct MongoDB URI

### Issue 2: "AI responses are slow or fail"
**Symptoms**: Long wait times, error messages
**Solution**:
1. Check your AI API key is valid (Gemini or OpenAI)
2. Check backend terminal for API errors
3. Verify `AI_PROVIDER` in backend `.env` is set correctly

### Issue 3: "Login works but chat redirects to login"
**Symptoms**: Stuck in login loop
**Solution**:
1. Check browser console for errors
2. Clear localStorage: DevTools → Application → Local Storage → Clear All
3. Re-login

### Issue 4: "CORS errors"
**Symptoms**: Network requests blocked in browser
**Solution**:
1. Ensure backend `.env` has:
   ```
   FRONTEND_URL=http://localhost:3000
   ```
2. Restart backend server

---

## ✨ SUCCESS CRITERIA

Your app is working correctly if:

✅ **Registration**:
- Can create account
- Auto-login after signup
- Token saved in localStorage

✅ **Login**:
- Can login with credentials
- Invalid credentials show error
- Redirected to chat after login

✅ **AI Chat**:
- Messages send successfully
- AI responds with intelligent answers (NOT static responses)
- Chat history persists after refresh
- User menu shows name

✅ **Protected Routes**:
- Cannot access `/chat` when logged out
- Auto-redirect to `/login` when needed

✅ **Logout**:
- Successfully logs out
- localStorage cleared
- Homepage shows signup/login buttons

---

## 📸 What You Should See

### Homepage (Logged Out)
- Big title: "Welcome to EduBot"
- 2 buttons: "Sign Up Free" and "Login"

### Homepage (Logged In)
- 2 buttons: "Start Chatting" and "Explore Features"
- "Start Chatting" → goes to `/chat`

### Chat Page
- Header with "EduBot AI" and user menu
- Chat messages (left = bot, right = user)
- Input box at bottom
- Quick suggestion chips
- **IMPORTANT**: Bot responses should be from real AI, not static text!

---

## 🎯 Next Steps After Testing

If everything works:
1. ✅ Move on to building Reminders feature
2. ✅ Add push notifications
3. ✅ Create profile page
4. ✅ Prepare for deployment

If issues found:
1. ❌ Check terminal outputs (backend & frontend)
2. ❌ Review browser console errors
3. ❌ Verify environment variables
4. ❌ Check this testing guide for solutions

---

## 💡 Pro Tips

1. **Keep Both Terminals Open**:
   - Terminal 1: `cd backend && npm run dev` (port 5000)
   - Terminal 2: `npm run dev` (port 3000)

2. **Watch Backend Terminal**: All AI API calls are logged there

3. **Use Browser DevTools**: Network tab shows all API calls

4. **Test on Fresh Browser**: Use Incognito mode to avoid cache issues

5. **MongoDB Atlas**: Check database at https://cloud.mongodb.com to see data

---

## 🆘 Need Help?

**Check these files**:
- Backend: `backend/.env` (API keys)
- Frontend: `.env.local` (API URL)
- Backend logs: Terminal running `npm run dev` in backend folder

**Still stuck?** Check:
- SETUP_GUIDE.md for initial setup
- DEPLOYMENT_GUIDE.md for production deployment
- backend/README.md for API documentation

---

**Ready to test? Start with Step 1! 🚀**
