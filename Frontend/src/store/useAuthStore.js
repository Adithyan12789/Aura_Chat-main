import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" 
    ? "http://localhost:5001" 
    : "https://aura-chat-main.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Set token in axios default headers
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
      // Clear token if auth check fails
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization'];
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      
      // Store token
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }
      
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      
      // Store token
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }
      
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      
      // Clear token
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization'];
      
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      if (res?.data) {
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
      } else {
        throw new Error("No data received from server");
      }
    } catch (error) {
      console.log("error in update profile:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    // Global listener for all new messages to update user list order
    socket.on("newMessage", (newMessage) => {
      if (!newMessage) return;
      
      // Dynamically import and use the chat store
      import("./useChatStore.js").then((module) => {
        const chatStore = module.useChatStore.getState();
        const currentUserId = authUser._id;
        
        // Determine which user to move to top
        const otherUserId = newMessage.senderId === currentUserId 
          ? newMessage.receiverId 
          : newMessage.senderId;
        
        if (otherUserId && chatStore.moveUserToTop) {
          chatStore.moveUserToTop(otherUserId);
        }
      });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));  