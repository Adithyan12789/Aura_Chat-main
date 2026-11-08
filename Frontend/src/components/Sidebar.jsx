import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users, Search } from "lucide-react";
import SidebarSkeleton from "./Skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOnline = showOnlineOnly ? onlineUsers.includes(user._id) : true;
    return matchesSearch && matchesOnline;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300/50 flex flex-col transition-all duration-300 glass-effect">
      {/* Header */}
      <div className="border-b border-base-300/50 w-full p-5 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <Users className="size-5 text-primary-content" />
          </div>
          <span className="font-bold hidden lg:block text-xl gradient-text">Contacts</span>
        </div>

        {/* Search Bar */}
        <div className="mt-4 hidden lg:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-primary/60 group-focus-within:text-primary transition-colors z-10" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm input-bordered w-full pl-10 bg-base-200/50 hover:bg-base-200 focus:bg-base-100 transition-all h-10"
            />
          </div>
        </div>

        {/* Online Filter */}
        <div className="mt-3 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2 hover:text-primary transition-colors group">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm font-semibold">Online only</span>
          </label>
          <span className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-semibold border border-success/20">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-2 flex-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3.5 flex items-center gap-3 relative premium-card
              hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent
              ${selectedUser?._id === user._id
                ? "bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary shadow-lg"
                : "border-l-4 border-transparent"
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <div className="avatar">
                <div className="size-12 rounded-full avatar-ring">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="object-cover"
                  />
                </div>
              </div>
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3.5 bg-success rounded-full ring-2 ring-base-100 online-pulse" />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-semibold truncate text-base-content">
                {user.fullName}
              </div>
              <div className="text-xs flex items-center gap-1.5 mt-1">
                <span className={`size-1.5 rounded-full ${onlineUsers.includes(user._id) ? 'bg-success' : 'bg-base-content/30'}`} />
                <span className={`font-medium ${onlineUsers.includes(user._id) ? 'text-success' : 'text-base-content/50'}`}>
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/50 py-10 px-4 animate-in">
            <Users className="size-14 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-semibold">No contacts found</p>
            <p className="text-xs mt-1.5">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;