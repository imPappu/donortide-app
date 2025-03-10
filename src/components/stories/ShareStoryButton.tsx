
import React from "react";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthContext";

const ShareStoryButton = () => {
  const { user } = useAuth();
  
  const handleShareYourStory = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to share your story",
      });
      return;
    }
    
    toast({
      title: "Share Your Story",
      description: "Coming soon: Story submission form",
    });
  };

  return (
    <div className="flex justify-center mt-4 mb-8">
      <Button onClick={handleShareYourStory}>
        <PenLine className="h-4 w-4 mr-2" />
        Share Your Story
      </Button>
    </div>
  );
};

export default ShareStoryButton;
