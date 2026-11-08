import { MessageSquare, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 animated-gradient">
      <div className="max-w-md text-center space-y-8 animate-in">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="relative float-animation">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-3xl animate-pulse" />
            <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center border border-primary/20 shadow-2xl hover:scale-110 transition-all duration-500 premium-card">
              <MessageSquare className="w-16 h-16 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="size-6 text-primary animate-pulse" />
            <h2 className="text-4xl font-bold gradient-text">Welcome to Aura Chat!</h2>
            <Sparkles className="size-6 text-secondary animate-pulse" />
          </div>
          <p className="text-base-content/70 text-xl leading-relaxed">
            Select a conversation from the sidebar to start chatting
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 glass-effect px-4 py-3 rounded-full inline-flex mx-auto">
            <span className="size-2 rounded-full bg-success animate-pulse shadow-lg" />
            <span className="text-sm text-base-content/60 font-medium">Your friends are waiting to connect</span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-12 opacity-60">
          <div className="text-center">
            <div className="size-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-2">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <p className="text-xs">Real-time</p>
          </div>
          <div className="text-center">
            <div className="size-12 mx-auto rounded-xl bg-secondary/10 flex items-center justify-center mb-2">
              <Sparkles className="size-6 text-secondary" />
            </div>
            <p className="text-xs">Secure</p>
          </div>
          <div className="text-center">
            <div className="size-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-2">
              <MessageSquare className="size-6 text-accent" />
            </div>
            <p className="text-xs">Fast</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;