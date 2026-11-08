import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!selectedUser?._id) return;

    // Fetch messages only on first render or when user changes
    if (isFirstRender.current) {
      getMessages(selectedUser._id);
      isFirstRender.current = false;
    }

    // Subscribe to new messages
    subscribeToMessages();

    // Cleanup function
    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="h-full flex flex-col">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animated-gradient">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => {
          const isOwnMessage = message.senderId === authUser._id;
          const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;

          return (
            <div
              key={message._id}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"} message-animate`}
            >
              {showAvatar && (
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full avatar-ring">
                    <img
                      src={
                        isOwnMessage
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="chat-header mb-1.5 px-1">
                <time className="text-xs opacity-70 font-medium">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              <div
                className={`chat-bubble ${isOwnMessage
                    ? "chat-bubble-primary text-primary-content"
                    : "bg-base-300 text-base-content"
                  } max-w-md shadow-xl border border-base-content/10`}
              >
                {message.image && (
                  <div className="mb-2 group">
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="rounded-xl max-w-[250px] cursor-pointer shadow-lg border border-base-content/10 group-hover:scale-[1.02] transition-transform"
                      onClick={() => window.open(message.image, '_blank')}
                    />
                  </div>
                )}
                {message.text && (
                  <p className="break-words leading-relaxed">{message.text}</p>
                )}
              </div>

              {isOwnMessage && (
                <div className="chat-footer opacity-60 text-xs px-1 mt-1 font-medium">
                  <span>✓ Delivered</span>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;