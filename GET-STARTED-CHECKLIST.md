# ✅ Get Started Checklist

Use this checklist to get your Aura Chat application up and running!

---

## 📋 Pre-Setup Checklist

### System Requirements
- [ ] Node.js installed (v16 or higher)
  - Check: Run `node --version` in terminal
  - Download from: https://nodejs.org/

- [ ] npm installed (comes with Node.js)
  - Check: Run `npm --version` in terminal

- [ ] Code editor installed (VS Code recommended)
  - Download from: https://code.visualstudio.com/

---

## 🔑 Get Your Credentials

### MongoDB Setup
- [ ] Choose your MongoDB option:
  
  **Option A: MongoDB Atlas (Recommended for beginners)**
  - [ ] Go to https://www.mongodb.com/cloud/atlas/register
  - [ ] Create free account
  - [ ] Create new cluster (free tier M0)
  - [ ] Click "Connect" → "Connect your application"
  - [ ] Copy connection string
  - [ ] Replace `<password>` in connection string
  - [ ] Whitelist IP: 0.0.0.0/0 (for testing)
  
  **Option B: Local MongoDB**
  - [ ] Download from https://www.mongodb.com/try/download/community
  - [ ] Install MongoDB
  - [ ] Start MongoDB service
  - [ ] Connection string: `mongodb://localhost:27017/aura-chat`

### Cloudinary Setup
- [ ] Go to https://cloudinary.com/
- [ ] Sign up for free account
- [ ] Go to Dashboard
- [ ] Note down:
  - [ ] Cloud Name
  - [ ] API Key
  - [ ] API Secret

---

## 💻 Installation Checklist

### Backend Setup
- [ ] Open terminal in project root
- [ ] Navigate to Backend: `cd Backend`
- [ ] Install dependencies: `npm install`
- [ ] Wait for installation to complete
- [ ] Create `.env` file in Backend folder
- [ ] Copy contents from `.env.example` to `.env`
- [ ] Fill in all environment variables:
  - [ ] MONGODB_URI=`your_mongodb_connection_string`
  - [ ] JWT_SECRET=`your_secure_random_string_min_32_chars`
  - [ ] CLOUDINARY_CLOUD_NAME=`your_cloud_name`
  - [ ] CLOUDINARY_API_KEY=`your_api_key`
  - [ ] CLOUDINARY_API_SECRET=`your_api_secret`
  - [ ] PORT=5001
  - [ ] NODE_ENV=development

### Frontend Setup
- [ ] Open new terminal in project root
- [ ] Navigate to Frontend: `cd Frontend`
- [ ] Install dependencies: `npm install`
- [ ] Wait for installation to complete

---

## 🚀 First Run Checklist

### Start Backend
- [ ] Open terminal in Backend folder
- [ ] Run: `npm run dev`
- [ ] Wait for success messages:
  - [ ] See: "server is running on PORT:5001"
  - [ ] See: "MongoDB Connected: ..."
- [ ] Leave this terminal running

### Start Frontend
- [ ] Open new terminal in Frontend folder
- [ ] Run: `npm run dev`
- [ ] Wait for success message:
  - [ ] See: "Local: http://localhost:5173/"
- [ ] Leave this terminal running

### Open Application
- [ ] Open browser
- [ ] Navigate to: http://localhost:5173
- [ ] See login/signup page
- [ ] No errors in browser console (F12)

---

## 🧪 Testing Checklist

### Create First User
- [ ] Click "Sign Up"
- [ ] Fill in details:
  - [ ] Full name
  - [ ] Email
  - [ ] Password (min 6 characters)
- [ ] Click "Create Account"
- [ ] See success message
- [ ] Redirected to chat interface

### Create Second User
- [ ] Open incognito/private browser window
- [ ] Navigate to: http://localhost:5173
- [ ] Sign up with different email
- [ ] See success message
- [ ] Redirected to chat interface

### Test Messaging
- [ ] In window 1: Click on second user in sidebar
- [ ] Type a message
- [ ] Press send
- [ ] See message appear in window 1
- [ ] Check window 2: Message appears automatically
- [ ] Reply from window 2
- [ ] See reply in window 1 immediately

### Test Image Sharing
- [ ] Click image icon in message input
- [ ] Select an image file
- [ ] Send the image
- [ ] Image appears in both windows
- [ ] Image is clickable/viewable

### Test Profile Features
- [ ] Click on profile icon
- [ ] Upload profile picture
- [ ] See success message
- [ ] Profile picture updated

### Test Online Status
- [ ] Check sidebar in both windows
- [ ] Both users show as online (green dot)
- [ ] Close one window
- [ ] Other window shows user as offline

---

## 🐛 Troubleshooting Checklist

### If Backend Won't Start

**"Missing required environment variables"**
- [ ] Check `.env` file exists in Backend folder
- [ ] Check all variables are filled in (no empty values)
- [ ] Check no extra spaces in variable values
- [ ] Restart backend server

**"MongoDB Connection Error"**
- [ ] Check MONGODB_URI is correct
- [ ] For Atlas: Check IP whitelist includes 0.0.0.0/0
- [ ] For Local: Check MongoDB service is running
- [ ] Test connection string separately
- [ ] Check no typos in connection string

**"Port 5001 already in use"**
- [ ] Close other terminals running the backend
- [ ] Kill process using port:
  ```powershell
  # Windows PowerShell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 5001).OwningProcess | Stop-Process
  ```
- [ ] Or change PORT in .env to different number

### If Frontend Won't Start

**"Cannot find module" errors**
- [ ] Delete node_modules folder
- [ ] Delete package-lock.json
- [ ] Run `npm install` again
- [ ] Restart frontend server

**"Port 5173 already in use"**
- [ ] Vite will try next available port automatically
- [ ] Or close other Vite servers

### If Messages Not Appearing

**Messages not in real-time**
- [ ] Check backend terminal for errors
- [ ] Check browser console (F12) for errors
- [ ] Refresh both browser windows
- [ ] Check Socket.IO connection in console
- [ ] Restart both servers

**Images not uploading**
- [ ] Check Cloudinary credentials in .env
- [ ] Check image file size (< 10MB)
- [ ] Check browser console for errors
- [ ] Test with smaller image

### If Authentication Issues

**Can't login/signup**
- [ ] Check browser console for errors
- [ ] Check backend terminal for errors
- [ ] Clear browser cookies
- [ ] Try different browser
- [ ] Check MongoDB connection

**Cookie not being set**
- [ ] Use http://localhost:5173 (not 127.0.0.1)
- [ ] Check backend CORS settings
- [ ] Clear browser cookies and try again

---

## 📚 Documentation Reference

Need more help? Check these files:

- [ ] **Quick Start** → `quick-start.md` (5-minute guide)
- [ ] **Detailed Setup** → `SETUP.md` (comprehensive guide)
- [ ] **What Changed** → `CHANGELOG.md` (all fixes)
- [ ] **Project Info** → `README.md` (overview)
- [ ] **All Updates** → `UPDATES-SUMMARY.md` (this session)

---

## ✅ Success Criteria

You're done when:
- [ ] ✅ Backend running without errors
- [ ] ✅ Frontend running without errors
- [ ] ✅ Can create accounts
- [ ] ✅ Can send messages in real-time
- [ ] ✅ Can upload images
- [ ] ✅ Online status works
- [ ] ✅ Profile updates work
- [ ] ✅ No errors in consoles

---

## 🎯 Next Steps After Setup

Once everything works:

### Explore Features
- [ ] Try different themes in Settings
- [ ] Update profile information
- [ ] Send various types of messages
- [ ] Test with multiple users

### Learn the Code
- [ ] Read through Backend controllers
- [ ] Understand Frontend store management
- [ ] Study Socket.IO implementation
- [ ] Review authentication flow

### Customize
- [ ] Change color themes
- [ ] Modify UI components
- [ ] Add new features
- [ ] Deploy to production

---

## 🎊 Congratulations!

When all checkboxes are marked, you have:
- ✅ Successfully set up the application
- ✅ Tested all major features
- ✅ Verified everything works
- ✅ Ready to develop and customize!

---

**Need Help?** 
- Check the troubleshooting section above
- Review the documentation files
- Check browser console (F12)
- Check terminal output for errors

**Happy Coding!** 🚀

---

**Tip:** Print this checklist or keep it open while setting up!
