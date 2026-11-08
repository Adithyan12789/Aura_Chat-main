import { X, MoreVertical } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-4 border-b-2 border-primary/20 bg-base-100 shadow-sm relative z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-12 rounded-full relative ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100 shadow-xl">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="object-cover"
              />
              {isOnline && (
                <span className="absolute bottom-0 right-0 size-3.5 bg-success rounded-full ring-2 ring-base-100 online-pulse shadow-lg" />
              )}
            </div>
          </div>

          {/* User info */}
          <div className="min-w-0">
            <h3 className="font-semibold text-lg text-base-content truncate">{selectedUser.fullName}</h3>
            <p className="text-sm flex items-center gap-1.5">
              <span className={`size-2 rounded-full flex-shrink-0 ${isOnline ? 'bg-success animate-pulse' : 'bg-base-content/30'}`} />
              <span className={`flex-shrink-0 ${isOnline ? 'text-success font-medium' : 'text-base-content/60'}`}>
                {isOnline ? "Online" : "Offline"}
              </span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className="btn btn-ghost btn-sm btn-circle hover:bg-primary/10 hover:text-primary hover-glow text-base-content"
            title="More options"
          >
            <MoreVertical className="size-5" />
          </button>
          <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-ghost btn-sm btn-circle hover:bg-error/10 hover:text-error hover-glow text-base-content"
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