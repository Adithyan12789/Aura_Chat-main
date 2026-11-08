import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, Edit3, Check, X } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };

    reader.onerror = () => {
      toast.error('Failed to read file');
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-gradient-slow"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main Profile Card */}
        <div className="premium-card glass-effect rounded-3xl overflow-hidden border border-primary/30 shadow-2xl backdrop-blur-xl">
          {/* Cover Section with Gradient */}
          <div className="h-48 bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEyYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn btn-sm glass-effect border border-white/30 text-white hover:bg-white/20 gap-2"
              >
                {isEditing ? <X className="size-4" /> : <Edit3 className="size-4" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Avatar Section */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-20 mb-8">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
                
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={selectedImg || authUser?.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="size-40 rounded-full object-cover border-4 border-base-100 shadow-2xl relative z-10"
                  />
                  
                  {/* Upload button */}
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-2 right-2 z-20
                      size-12 rounded-full
                      bg-gradient-to-br from-primary to-secondary
                      flex items-center justify-center
                      cursor-pointer shadow-xl
                      hover:scale-110 hover:rotate-12
                      transition-all duration-300
                      border-2 border-base-100
                      ${isUpdatingProfile ? "animate-spin pointer-events-none" : "hover-glow"}
                    `}
                  >
                    <Camera className="size-5 text-primary-content" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>

                {/* Online status */}
                <div className="absolute bottom-2 left-2 z-20 flex items-center gap-2 px-3 py-1 rounded-full glass-effect border border-success/30 bg-success/10">
                  <span className="size-2 bg-success rounded-full animate-pulse"></span>
                  <span className="text-xs font-medium text-success">Online</span>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left mb-4">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {authUser?.fullName}
                </h1>
                <p className="text-base-content/70 flex items-center justify-center md:justify-start gap-2">
                  <Mail className="size-4" />
                  {authUser?.email}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm text-base-content/60">
                  <Calendar className="size-4" />
                  <span>Joined {formatDate(authUser?.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="premium-card glass-effect rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all hover-glow">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                    <User className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Active</p>
                    <p className="text-sm text-base-content/60">Account Status</p>
                  </div>
                </div>
              </div>

              <div className="premium-card glass-effect rounded-2xl p-6 border border-secondary/20 hover:border-secondary/40 transition-all hover-glow">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5">
                    <Shield className="size-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Verified</p>
                    <p className="text-sm text-base-content/60">Security Level</p>
                  </div>
                </div>
              </div>

              <div className="premium-card glass-effect rounded-2xl p-6 border border-accent/20 hover:border-accent/40 transition-all hover-glow">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5">
                    <Calendar className="size-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{new Date(authUser?.createdAt).getFullYear()}</p>
                    <p className="text-sm text-base-content/60">Member Since</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="premium-card glass-effect rounded-2xl p-6 border border-primary/20 space-y-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                    <User className="size-5 text-primary" />
                  </div>
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-base-200/50 transition-colors">
                    <User className="size-5 text-primary mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-base-content/60 mb-1">Full Name</p>
                      <p className="font-medium">{authUser?.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-base-200/50 transition-colors">
                    <Mail className="size-5 text-primary mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-base-content/60 mb-1">Email Address</p>
                      <p className="font-medium break-all">{authUser?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Security */}
              <div className="premium-card glass-effect rounded-2xl p-6 border border-secondary/20 space-y-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5">
                    <Shield className="size-5 text-secondary" />
                  </div>
                  Account Security
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-base-200/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="size-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">Email Verified</p>
                        <p className="text-xs text-base-content/60">Your email is confirmed</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-base-200/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="size-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">Secure Connection</p>
                        <p className="text-xs text-base-content/60">SSL/TLS encrypted</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-base-200/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="size-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium">Account Active</p>
                        <p className="text-xs text-base-content/60">Full access enabled</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Status */}
            {isUpdatingProfile && (
              <div className="mt-6 p-4 rounded-2xl glass-effect border border-primary/30 bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="animate-spin">
                    <Camera className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Uploading your profile picture...</p>
                    <p className="text-sm text-base-content/60">This may take a few seconds</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;