import { X, MoreVertical } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  
  if (!selectedUser) return null;
  
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex-shrink-0 p-4 border-b-2 border-base-300 bg-base-200 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-12 rounded-full relative ring-2 ring-primary ring-offset-2 ring-offset-base-200 shadow-xl">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="object-cover"
              />
              {isOnline && (
                <span className="absolute bottom-0 right-0 size-3.5 bg-success rounded-full ring-2 ring-base-200 shadow-lg" />
              )}
            </div>
          </div>

          {/* User info */}
          <div className="min-w-0">
            <h3 className="font-bold text-xl text-base-content">{selectedUser.fullName}</h3>
            <p className="text-sm flex items-center gap-2">
              <span className={`size-2 rounded-full ${isOnline ? 'bg-success' : 'bg-base-content/30'}`} />
              <span className={`font-semibold ${isOnline ? 'text-success' : 'text-base-content/60'}`}>
                {isOnline ? "Online" : "Offline"}
              </span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            className="btn btn-ghost btn-sm btn-circle hover:bg-primary hover:text-primary-content"
            title="More options"
          >
            <MoreVertical className="size-5" />
          </button>
          <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-ghost btn-sm btn-circle hover:bg-error hover:text-error-content"
            title="Close chat"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;