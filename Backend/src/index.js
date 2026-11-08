import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'IMGBB_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.error('Please create a .env file with all required variables');
  process.exit(1);
}

const PORT = process.env.PORT || 5001;



// Increase payload size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? ["https://aurachat-phi.vercel.app", "https://aura-chat-main.onrender.com"]
      : "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "Aura Chat API is running",
    timestamp: new Date().toISOString()
  });
});

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));
});