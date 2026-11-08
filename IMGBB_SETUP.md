# ImgBB Setup Guide

We've replaced Cloudinary with **ImgBB** - a completely free image hosting service with no credit card required!

## 🔑 Get Your Free ImgBB API Key

### Step 1: Create Account
1. Go to: https://imgbb.com/
2. Click **"Sign up"** (top right)
3. Create a free account (or login with Google/Facebook)

### Step 2: Get API Key
1. Once logged in, go to: https://api.imgbb.com/
2. Click **"Get API key"**
3. You'll see your API key displayed (format: `xxxxxxxxxxxxx`)
4. **Copy this key** - you'll need it for both local development and Render deployment

## 📝 Configure Locally

### Update your `.env` file:
```env
IMGBB_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the actual API key from ImgBB.

## 🚀 Configure on Render

### Step 1: Update Environment Variables
1. Go to: https://dashboard.render.com/
2. Click on your `aura-chat-main` service
3. Click **"Environment"** in the left sidebar

### Step 2: Remove Old Cloudinary Variables (Optional)
You can delete these (they're no longer needed):
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Step 3: Add ImgBB API Key
1. Click **"Add Environment Variable"**
2. **Key:** `IMGBB_API_KEY`
3. **Value:** (paste your ImgBB API key)
4. Click **"Save Changes"**

### Step 4: Verify Other Required Variables
Make sure these are still set:
- ✅ `MONGODB_URI` - Your MongoDB connection string
- ✅ `JWT_SECRET` - Your JWT secret
- ✅ `NODE_ENV` - Set to `production`
- ✅ `PORT` - Set to `5001` (or leave blank)
- ✅ `IMGBB_API_KEY` - Your new ImgBB API key

## ✅ Test the Deployment

1. Wait 2-3 minutes for Render to redeploy
2. Go to: https://aurachat-phi.vercel.app/
3. Try uploading an image in a chat
4. It should work perfectly! 🎉

## 📊 ImgBB Features & Limits

### Free Tier Includes:
- ✅ **Unlimited uploads** (with rate limiting)
- ✅ **32 MB** max file size
- ✅ **No credit card** required
- ✅ **Direct image URLs** 
- ✅ **Automatic image optimization**
- ✅ **No expiration** (images stay forever)

### Rate Limits:
- **5,000 requests per hour** per API key
- More than enough for a chat application!

## 🔒 Security Note

**Never commit your API key to Git!**
- ✅ The `.env` file is in `.gitignore` (protected)
- ✅ Only use environment variables on Render
- ✅ Never share your API key publicly

## 📚 ImgBB API Documentation

For more details: https://api.imgbb.com/

---

**That's it!** ImgBB is much simpler than Cloudinary and completely free. Enjoy your chat app! 💬✨
