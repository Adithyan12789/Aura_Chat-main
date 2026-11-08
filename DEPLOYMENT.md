# 🚀 Deployment Guide - Aura Chat

## Deployment Options

This guide covers deploying to Render.com. The app can also be deployed to other platforms like Heroku, Railway, or DigitalOcean.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:
- [ ] GitHub repository with latest code
- [ ] MongoDB Atlas database set up
- [ ] Cloudinary account credentials
- [ ] All environment variables ready

---

## 🎯 Render.com Deployment (Recommended)

### Option 1: Using render.yaml (Automated)

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Blueprint**
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will detect `render.yaml` automatically

4. **Set Environment Variables**
   
   **For Backend Service:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   FRONTEND_URL=https://your-frontend-url.onrender.com
   NODE_ENV=production
   PORT=5001
   ```

5. **Deploy**
   - Click "Apply"
   - Wait for deployment to complete

---

### Option 2: Manual Setup

#### Backend Deployment

1. **Create Web Service**
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repo

2. **Configure Build Settings**
   ```
   Name: aura-chat-backend
   Runtime: Node
   Build Command: cd Backend && npm install
   Start Command: cd Backend && npm start
   ```

3. **Set Environment Variables**
   - Add all backend env vars (see above)

4. **Deploy**
   - Click "Create Web Service"

#### Frontend Deployment

1. **Create Static Site**
   - Click "New" → "Static Site"
   - Connect same GitHub repo

2. **Configure Build Settings**
   ```
   Name: aura-chat-frontend
   Build Command: cd Frontend && npm install && npm run build
   Publish Directory: Frontend/dist
   ```

3. **Add Rewrite Rule**
   - Source: `/*`
   - Destination: `/index.html`
   - Action: Rewrite

4. **Deploy**
   - Click "Create Static Site"

---

## 🔧 Configuration

### Update Backend CORS

After frontend is deployed, update Backend:

1. Get frontend URL (e.g., `https://aura-chat-frontend.onrender.com`)
2. Set `FRONTEND_URL` environment variable in Backend service
3. Backend will automatically use this in CORS settings

### Update Frontend API URL

The frontend is configured to automatically use:
- Development: `http://localhost:5001/api`
- Production: `/api` (same domain as frontend)

For separate backend deployment, you may need to update `Frontend/src/lib/axios.js`:
```javascript
baseURL: import.meta.env.MODE === "development" 
  ? "http://localhost:5001/api" 
  : "https://your-backend-url.onrender.com/api"
```

---

## ⚡ Alternative: Combined Deployment

To serve frontend from backend (simpler, single service):

1. **Build Frontend Locally**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Deploy Only Backend**
   - Backend already serves frontend from `dist` folder in production
   - Just deploy backend service
   - Frontend will be accessible at same URL

3. **Render Configuration**
   ```
   Build Command: cd Backend && npm install && cd ../Frontend && npm install && npm run build
   Start Command: cd Backend && npm start
   ```

---

## 🌍 Other Platforms

### Vercel (Frontend Only)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd Frontend
   vercel
   ```

3. **Configure**
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variables

### Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create aura-chat-backend
   ```

3. **Add Buildpack**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_uri
   heroku config:set JWT_SECRET=your_secret
   # ... add all other vars
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### Railway

1. **Create Account** at railway.app
2. **New Project** → Import from GitHub
3. **Configure** root directory to Backend
4. **Set environment variables**
5. **Deploy**

---

## 🔒 Environment Variables Reference

### Backend (.env)
```env
# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-key-min-32-chars
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional
PORT=5001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (if needed)
```env
# Usually auto-configured, but can override:
VITE_API_URL=https://your-backend-url.com/api
```

---

## ✅ Post-Deployment Checklist

After deployment:

1. **Test Authentication**
   - [ ] Sign up works
   - [ ] Login works
   - [ ] Logout works

2. **Test Messaging**
   - [ ] Can send messages
   - [ ] Messages appear in real-time
   - [ ] Socket.IO connects properly

3. **Test Image Upload**
   - [ ] Profile pictures upload
   - [ ] Message images upload
   - [ ] Images display correctly

4. **Test Themes**
   - [ ] Theme switching works
   - [ ] Themes persist on refresh

5. **Check Performance**
   - [ ] Fast load times
   - [ ] No console errors
   - [ ] Smooth animations

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Missing script: build"**
- Solution: Make sure root `package.json` exists
- Run: `npm install` in root directory

**Error: "Module not found"**
- Solution: Clear build cache
- Delete `node_modules` and reinstall

### Runtime Issues

**Socket.IO not connecting**
- Check FRONTEND_URL in backend env vars
- Verify CORS settings
- Check browser console for errors

**Images not uploading**
- Verify Cloudinary credentials
- Check file size limits
- Review browser network tab

**Database connection fails**
- Verify MongoDB URI is correct
- Check IP whitelist (allow 0.0.0.0/0 for testing)
- Ensure database user has correct permissions

---

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Check service health
- Monitor resource usage

### Useful Commands

**View Backend Logs**
```bash
# In Render dashboard → Service → Logs
```

**Restart Service**
```bash
# Render dashboard → Service → Manual Deploy → Deploy latest commit
```

---

## 🔄 Continuous Deployment

### Auto-Deploy on Push

Render automatically deploys when you push to GitHub:

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. Render auto-detects and redeploys

### Disable Auto-Deploy

In Render dashboard:
- Service Settings → Auto-Deploy → OFF

---

## 💰 Cost Estimation

### Render.com (Free Tier)
- **Backend**: Free (spins down after 15 min inactivity)
- **Frontend**: Free
- **Total**: $0/month

### Render.com (Paid)
- **Backend**: $7/month (always on)
- **Frontend**: Free
- **Total**: $7/month

### External Services
- **MongoDB Atlas**: Free (M0 tier, 512MB)
- **Cloudinary**: Free (25GB storage, 25GB bandwidth)

---

## 🚀 Production Optimization

### Backend
1. Enable compression
2. Set up Redis for sessions (optional)
3. Configure rate limiting
4. Set up monitoring (Sentry, LogRocket)

### Frontend
1. Enable code splitting
2. Lazy load routes
3. Optimize images
4. Enable service worker (PWA)

### Database
1. Create indexes on frequently queried fields
2. Monitor slow queries
3. Set up automated backups

---

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Review environment variables
3. Verify all services are running
4. Check MongoDB connection
5. Test locally first

---

## ✨ Success!

Once deployed, your app will be available at:
- **Frontend**: `https://your-app-name.onrender.com`
- **Backend**: `https://your-backend-name.onrender.com`

Share the frontend URL with users! 🎉

---

**Last Updated:** November 8, 2026  
**Platform:** Render.com  
**Status:** ✅ Production Ready
