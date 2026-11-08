# Aura Chat - Real-time Chat Application

A full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO for real-time messaging.

## Features

- 🔐 User authentication (signup, login, logout)
- 💬 Real-time messaging with Socket.IO
- 👥 Online user status tracking
- 🖼️ Image sharing in messages
- 📸 Profile picture upload with Cloudinary
- 🎨 Multiple theme options
- 📱 Responsive design
- 🔔 Toast notifications
- ✨ Modern UI with Tailwind CSS and DaisyUI

## Tech Stack

### Frontend
- React 19
- Zustand (state management)
- React Router DOM
- Socket.IO Client
- Axios
- Tailwind CSS & DaisyUI
- Lucide React (icons)
- React Hot Toast (notifications)
- Vite (build tool)

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- Socket.IO
- JWT (authentication)
- Bcrypt.js (password hashing)
- Cloudinary (image storage)
- Cookie Parser
- CORS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chat-Application---Aura_Chat-main
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Create Backend .env file**
   - Copy `.env.example` to `.env`
   - Fill in your environment variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     PORT=5001
     NODE_ENV=development
     ```

4. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm run dev
   ```
   Server will run on http://localhost:5001

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   Application will open on http://localhost:5173

## Environment Variables

### Backend (.env)

| Variable | Description |
|----------|-------------|
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |
| PORT | Server port (default: 5001) |
| NODE_ENV | Environment (development/production) |
| FRONTEND_URL | Frontend URL for production CORS |

## Project Structure

```
Chat-Application---Aura_Chat-main/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── lib/
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   ├── socket.js
│   │   │   └── utils.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── message.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
└── Frontend/
    ├── src/
    │   ├── components/
    │   ├── lib/
    │   ├── pages/
    │   ├── store/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages
- `GET /api/messages/users` - Get all users for sidebar
- `GET /api/messages/:id` - Get messages with specific user
- `POST /api/messages/send/:id` - Send message to user

## Socket Events

- `connection` - User connects to socket
- `disconnect` - User disconnects from socket
- `sendMessage` - Send message event
- `newMessage` - Receive new message event
- `getOnlineUsers` - Get list of online users

## Recent Updates

### Fixed Issues:
1. ✅ Improved socket connection reliability with reconnection logic
2. ✅ Enhanced error handling across all API endpoints
3. ✅ Added environment variable validation
4. ✅ Fixed JWT token verification redundancy
5. ✅ Improved Cloudinary upload error handling
6. ✅ Fixed message sorting to display chronologically
7. ✅ Enhanced CORS configuration for better compatibility
8. ✅ Removed invalid package dependency
9. ✅ Improved error messages for better user experience
10. ✅ Fixed file naming inconsistencies

## Building for Production

### Backend
```bash
cd Backend
npm start
```

### Frontend
```bash
cd Frontend
npm run build
```

The built files will be in the `Frontend/dist` directory.

## Deployment

1. Set `NODE_ENV=production` in backend
2. Update `FRONTEND_URL` in backend .env to your deployed frontend URL
3. Build the frontend and serve static files from backend in production
4. Deploy to platforms like Heroku, Railway, Render, or DigitalOcean

## License

ISC

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
