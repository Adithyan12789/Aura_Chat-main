import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch users";
      toast.error(errorMessage);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Helper function to move user to top of list
  moveUserToTop: (userId) => {
    set((state) => {
      const userIndex = state.users.findIndex(u => u._id === userId);
      
      if (userIndex === -1) return state; // User not found
      if (userIndex === 0) return state; // Already at top
      
      const updatedUsers = [...state.users];
      const [user] = updatedUsers.splice(userIndex, 1);
      updatedUsers.unshift(user);
      return { users: updatedUsers };
    });
  },

  getMessages: async (userId) => {
    if (!userId) return;
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch messages";
      toast.error(errorMessage);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    if (!selectedUser?._id) return;

    set({ isSendingMessage: true });
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      
      // Update messages state with the new message while preserving existing messages
      set((state) => ({
        messages: [...state.messages, res.data]
      }));
      
      // Emit the message through socket
      const socket = useAuthStore.getState().socket;
      if (socket) {
        socket.emit("sendMessage", {
          ...res.data,
          receiverId: selectedUser._id
        });
      }

      // Move the recipient to top of the list AFTER message is sent
      // Use setTimeout to ensure state updates are processed
      setTimeout(() => {
        get().moveUserToTop(selectedUser._id);
      }, 0);
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send message";
      toast.error(errorMessage);
    } finally {
      set({ isSendingMessage: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, moveUserToTop } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // Clean up previous listeners
    socket.off("newMessage");

    // Set up new listener
    socket.on("newMessage", (newMessage) => {
      if (!newMessage) return;

      const currentUserId = useAuthStore.getState().authUser._id;
      const isMessageFromSelectedUser = 
        newMessage.senderId === selectedUser._id || 
        newMessage.receiverId === selectedUser._id;

      // Check if message already exists to prevent duplicates
      set((state) => {
        const messageExists = state.messages.some(msg => msg._id === newMessage._id);
        if (isMessageFromSelectedUser && !messageExists) {
          return { messages: [...state.messages, newMessage] };
        }
        return state;
      });

      // Move the other user to top of users list
      // If I sent the message, move receiver to top
      // If I received the message, move sender to top
      const otherUserId = newMessage.senderId === currentUserId 
        ? newMessage.receiverId 
        : newMessage.senderId;
      
      if (otherUserId) {
        moveUserToTop(otherUserId);
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
    if (selectedUser?._id) {
      get().getMessages(selectedUser._id);
      get().subscribeToMessages();
    }
  },

  clearMessages: () => set({ messages: [] })
}));