# Setup Guide for Aura Chat Application

## Prerequisites Installation

### 1. Install Node.js
- Download and install Node.js (v16 or higher) from [nodejs.org](https://nodejs.org/)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. MongoDB Setup

**Option A: Local MongoDB**
- Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service
- Your connection string will be: `mongodb://localhost:27017/aura-chat`

**Option B: MongoDB Atlas (Recommended for beginners)**
1. Go to [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### 3. Cloudinary Setup
1. Go to [cloudinary.com](https://cloudinary.com/)
2. Create a free account
3. From your dashboard, note down:
   - Cloud Name
   - API Key
   - API Secret

## Project Setup

### Step 1: Install Backend Dependencies
```bash
cd Backend
npm install
```

### Step 2: Configure Backend Environment Variables
1. Create a `.env` file in the `Backend` directory:
   ```bash
   # In Backend directory
   copy .env.example .env
   # Or on Mac/Linux:
   # cp .env.example .env
   ```

2. Open the `.env` file and fill in your credentials:
   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_super_secret_jwt_key_at_least_32_chars
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5001
   NODE_ENV=development
   ```

   **Important Notes:**
   - Replace all placeholder values with your actual credentials
   - For `JWT_SECRET`, use a long random string (e.g., generate one at [randomkeygen.com](https://randomkeygen.com/))
   - Keep the `.env` file secure and never commit it to Git

### Step 3: Install Frontend Dependencies
```bash
cd ../Frontend
npm install
```

### Step 4: Start the Application

**Terminal 1 - Backend Server:**
```bash
cd Backend
npm run dev
```
You should see:
```
server is running on PORT:5001
MongoDB Connected: <your-mongodb-host>
```

**Terminal 2 - Frontend Development Server:**
```bash
cd Frontend
npm run dev
```
You should see:
```
VITE v6.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Step 5: Access the Application
Open your browser and navigate to: `http://localhost:5173`

## Testing the Application

1. **Create an Account:**
   - Click "Sign Up"
   - Fill in your details
   - Upload a profile picture (optional)

2. **Create Another Account:**
   - Open an incognito/private window
   - Navigate to `http://localhost:5173`
   - Sign up with different credentials

3. **Test Messaging:**
   - In one window, select the other user from the sidebar
   - Send a message
   - Watch it appear in real-time in the other window

## Troubleshooting

### Backend won't start
- **Error: "Missing required environment variables"**
  - Make sure your `.env` file exists in the `Backend` directory
  - Verify all required variables are filled in
  
- **Error: "MongoDB Connection Error"**
  - Check your `MONGODB_URI` is correct
  - For MongoDB Atlas, ensure your IP is whitelisted
  - For local MongoDB, ensure the service is running

### Frontend won't start
- **Error: "Cannot find module"**
  ```bash
  cd Frontend
  rm -rf node_modules package-lock.json
  npm install
  ```

### Images not uploading
- Verify your Cloudinary credentials in `.env`
- Check if the image file size is reasonable (< 10MB)

### Messages not appearing in real-time
- Check browser console for Socket.IO connection errors
- Ensure both backend and frontend are running
- Try refreshing the page

### Port already in use
- **Backend (Port 5001):**
  ```bash
  # Windows PowerShell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 5001).OwningProcess | Stop-Process
  
  # Or change the PORT in .env file
  ```

- **Frontend (Port 5173):**
  - Vite will automatically try the next available port

## Common Issues

### CORS Errors
- Ensure frontend is running on `http://localhost:5173`
- Check backend CORS configuration allows this origin

### Cookie not being set
- Ensure you're not mixing `http://localhost` and `http://127.0.0.1`
- Use the same origin consistently

### Socket Connection Failed
- Check if backend server is running
- Verify the BASE_URL in `Frontend/src/store/useAuthStore.js`

## Development Tips

1. **Hot Reload:**
   - Both frontend and backend support hot reload
   - Changes will reflect automatically

2. **View API Requests:**
   - Open browser DevTools (F12)
   - Go to Network tab to see all API calls

3. **View Socket Events:**
   - In DevTools Console, type: `localStorage.debug = '*'`
   - Refresh page to see Socket.IO debug logs

## Production Deployment

### Environment Variables
Update your production `.env`:
```env
NODE_ENV=production
FRONTEND_URL=https://your-deployed-frontend-url.com
```

### Build Frontend
```bash
cd Frontend
npm run build
```

### Deploy Options
- **Backend + Frontend together:** Heroku, Render, Railway
- **Backend:** Heroku, Railway, DigitalOcean
- **Frontend:** Vercel, Netlify, Cloudflare Pages

## Need Help?

Common resources:
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Socket.IO Documentation](https://socket.io/docs/)

## Security Notes

⚠️ **Important:**
- Never commit your `.env` file to Git
- Use strong, unique passwords
- Keep dependencies updated: `npm audit fix`
- Use HTTPS in production
- Keep your JWT_SECRET secure and complex

## Next Steps

After successful setup:
1. Explore the codebase
2. Customize themes in Settings
3. Add more features (group chat, file sharing, etc.)
4. Deploy to production

Happy coding! 🚀
