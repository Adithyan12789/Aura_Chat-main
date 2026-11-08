import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full border-t border-base-300/50 glass-effect">
      {imagePreview && (
        <div className="mb-3 relative inline-block animate-in">
          <div className="relative group premium-card">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-2xl shadow-xl border border-primary/30"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 size-8 rounded-full bg-error text-error-content
              flex items-center justify-center shadow-xl hover:scale-110 hover-glow transition-all"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-2 items-center glass-effect rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30 focus-within:shadow-lg transition-all border border-base-content/10">
          <input
            type="text"
            className="flex-1 bg-transparent px-2 py-2.5 focus:outline-none text-sm placeholder:text-base-content/50"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`btn btn-ghost btn-sm btn-circle hover-glow ${
              imagePreview ? "text-primary" : "text-base-content/50"
            }`}
            onClick={() => fileInputRef.current?.click()}
            title="Attach image"
          >
            <Image className="size-5" />
          </button>

          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-base-content hover-glow"
            title="Add emoji (coming soon)"
          >
            <Smile className="size-5" />
          </button>
        </div>

        <button
          type="submit"
          className={`btn btn-primary btn-circle hover-glow shadow-xl size-12 ${
            !text.trim() && !imagePreview ? "btn-disabled opacity-40" : ""
          }`}
          disabled={!text.trim() && !imagePreview}
          title="Send message"
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;