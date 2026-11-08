

import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("SendMessage - receiverId:", receiverId, "senderId:", senderId);

    if (!text && !image) {
      return res.status(400).json({ message: "Message must contain text or image" });
    }

    // Validate receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      console.error("Receiver not found:", receiverId);
      return res.status(404).json({ message: "Receiver not found" });
    }

    let imageUrl;
    if (image) {
      try {
        console.log("Attempting to upload image to Cloudinary...");
        
        // Validate Cloudinary config
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
          console.error("Cloudinary credentials missing");
          return res.status(500).json({ message: "Image upload service not configured" });
        }

        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "chat_images",
          resource_type: "auto",
          transformation: [
            { width: 1000, height: 1000, crop: 'limit' }
          ]
        });
        
        imageUrl = uploadResponse.secure_url;
        console.log("Image uploaded successfully:", imageUrl);
      } catch (uploadError) {
        console.error("Cloudinary upload error details:", {
          message: uploadError.message,
          error: uploadError.error,
          http_code: uploadError.http_code
        });
        return res.status(500).json({ 
          message: "Failed to upload image", 
          details: uploadError.message 
        });
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    console.log("Message saved successfully:", newMessage._id);

    // Send to receiver via socket
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("Message sent via socket to:", receiverSocketId);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      message: "Internal server error",
      details: error.message 
    });
  }
};