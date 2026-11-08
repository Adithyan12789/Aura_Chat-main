import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

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

  return (
    <div className="h-screen pt-20 overflow-y-auto">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="premium-card glass-effect rounded-3xl p-8 space-y-8 border border-primary/20">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="mt-2 text-base-content/70">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-primary/30 relative z-10 shadow-2xl"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 z-20
                  bg-gradient-to-r from-primary to-secondary 
                  hover:scale-110 hover-glow
                  p-3 rounded-full cursor-pointer 
                  transition-all duration-200
                  shadow-xl
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-50" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-primary-content" />
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
            <p className="text-sm text-base-content/60">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </div>
              <p className="px-4 py-3 glass-effect rounded-xl border border-primary/20">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </div>
              <p className="px-4 py-3 glass-effect rounded-xl border border-primary/20">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 glass-effect rounded-2xl p-6 border border-primary/10">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary">📊</span>
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-3 border-b border-base-content/10">
                <span className="text-base-content/70">Member Since</span>
                <span className="font-medium">{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-base-content/70">Account Status</span>
                <span className="flex items-center gap-2">
                  <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-500 font-medium">Active</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;