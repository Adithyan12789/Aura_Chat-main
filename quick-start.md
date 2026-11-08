# Quick Start Guide - Get Running in 5 Minutes! ⚡

## Prerequisites Check
- ✅ Node.js installed? Run: `node --version` (need v16+)
- ✅ MongoDB ready? (Local or Atlas connection string)
- ✅ Cloudinary account? (Get free at cloudinary.com)

## 🚀 Quick Setup

### 1️⃣ Install Dependencies (2 minutes)
```bash
# Install Backend
cd Backend
npm install

# Install Frontend
cd ../Frontend
npm install
```

### 2️⃣ Configure Backend (1 minute)
Create `Backend/.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/aura-chat
JWT_SECRET=your-super-secret-key-min-32-characters-long
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5001
NODE_ENV=development
```

**🔑 Quick Tip:** Generate a secure JWT_SECRET:
```bash
# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Mac/Linux
openssl rand -base64 32
```

### 3️⃣ Start the Application (1 minute)

**Open Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
```
✅ Wait for: "MongoDB Connected"

**Open Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```
✅ Wait for: "Local: http://localhost:5173/"

### 4️⃣ Open Browser
Navigate to: **http://localhost:5173**

---

## ✨ First Test

1. **Sign Up** - Create your first account
2. **Open Incognito** - Create a second account
3. **Send a Message** - See it appear in real-time!
4. **Upload an Image** - Test the image sharing feature

---

## 🆘 Quick Fixes

### "Missing environment variables"
→ Make sure your `.env` file is in the `Backend` directory (not root)

### "MongoDB Connection Error"
→ Check your MONGODB_URI
→ For local: Ensure MongoDB service is running
→ For Atlas: Check IP whitelist (allow 0.0.0.0/0 for testing)

### "Cannot find module"
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
```bash
# Windows PowerShell - Kill process on port 5001
Get-Process -Id (Get-NetTCPConnection -LocalPort 5001).OwningProcess | Stop-Process

# Or just change PORT in .env
```

---

## 📋 Verification Checklist

Before running, ensure:
- [ ] Node.js v16+ installed
- [ ] Backend/node_modules exists (ran `npm install` in Backend)
- [ ] Frontend/node_modules exists (ran `npm install` in Frontend)
- [ ] Backend/.env file exists with all 7 variables
- [ ] MongoDB is accessible
- [ ] Ports 5001 and 5173 are free

---

## 🎯 What Should You See?

### Backend Terminal (Terminal 1):
```
server is running on PORT:5001
MongoDB Connected: localhost
```

### Frontend Terminal (Terminal 2):
```
VITE v6.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Browser:
- Beautiful login/signup page
- After login: Chat interface with sidebar

---

## 🐛 Still Having Issues?

1. **Check detailed guides:**
   - See `SETUP.md` for detailed instructions
   - See `CHANGELOG.md` for what was fixed

2. **Common mistakes:**
   - `.env` file in wrong location (must be in Backend/)
   - Forgot to run `npm install`
   - Wrong MongoDB connection string
   - Backend not running when starting frontend

3. **Debug steps:**
   - Check browser console (F12) for errors
   - Check terminal output for errors
   - Verify environment variables are loaded: `console.log(process.env.JWT_SECRET)` in Backend/src/index.js

---

## 💡 Pro Tips

- **Use VS Code?** Open two terminals in one window (Split Terminal)
- **Testing?** Keep DevTools open (F12) to see network requests
- **Debugging?** Add `console.log()` statements liberally
- **Changes not showing?** Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## ✅ Success!

If you see the chat interface and can send messages between two browser windows, **you're all set!** 🎉

Now explore:
- 🎨 Change themes in Settings
- 📸 Update your profile picture
- 💬 Send images in messages
- 👥 See online/offline status

---

**Ready to build something amazing? Let's go!** 🚀

Need more help? Check the detailed `SETUP.md` file.
