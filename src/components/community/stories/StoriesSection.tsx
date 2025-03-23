
import React, { useState } from "react";
import { Story } from "@/types/community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Video } from "lucide-react";
import StoryViewer from "./StoryViewer";
import StoryCreator from "./StoryCreator";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "@/hooks/use-toast";

interface StoriesSectionProps {
  stories: Story[];
  onAddStory: (story: Omit<Story, 'id' | 'timestamp'>) => void;
}

const StoriesSection = ({ stories, onAddStory }: StoriesSectionProps) => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [creatorOpen, setCreatorOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  
  const handleOpenStory = (index: number) => {
    setCurrentStoryIndex(index);
    setViewerOpen(true);
  };
  
  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      setViewerOpen(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };
  
  const handleCreateStory = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a story",
      });
      return;
    }
    setCreatorOpen(true);
  };
  
  const handleStoryCreated = (storyData: Omit<Story, 'id' | 'timestamp'>) => {
    onAddStory(storyData);
    setCreatorOpen(false);
    toast({
      title: "Story created",
      description: "Your story has been published",
    });
  };
  
  if (stories.length === 0 && !isAuthenticated) {
    return null;
  }
  
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3">Stories</h3>
      
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {/* Create story button */}
        <div 
          className="flex-shrink-0 w-20 h-32 rounded-xl bg-gradient-to-br from-primary to-primary-foreground/50 cursor-pointer relative flex flex-col items-center justify-center text-white animate-fade-in" 
          onClick={handleCreateStory}
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-2">
            <Plus className="h-4 w-4 text-primary" />
          </div>
          <span className="text-xs font-medium">Add Story</span>
        </div>
        
        {/* Stories list */}
        {stories.map((story, index) => (
          <div 
            key={story.id} 
            className="flex-shrink-0 w-20 h-32 rounded-xl overflow-hidden cursor-pointer relative animate-fade-in"
            onClick={() => handleOpenStory(index)}
          >
            {/* Preview thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
            
            <video 
              src={story.videoUrl} 
              className="w-full h-full object-cover"
              muted
            />
            
            {/* User avatar */}
            <div className="absolute top-2 left-0 right-0 flex justify-center">
              <div className="ring-2 ring-primary rounded-full overflow-hidden">
                <Avatar className="h-8 w-8">
                  {story.userAvatar ? (
                    <AvatarImage src={story.userAvatar} alt={story.userName || 'User'} />
                  ) : (
                    <AvatarFallback>{story.userName ? story.userName.charAt(0) : 'U'}</AvatarFallback>
                  )}
                </Avatar>
              </div>
            </div>
            
            {/* Username */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <p className="text-white text-xs truncate px-1">{story.userName || 'User'}</p>
            </div>
            
            {/* Video indicator */}
            <div className="absolute top-2 right-2">
              <Video className="h-3 w-3 text-white" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Story viewer */}
      {stories.length > 0 && (
        <StoryViewer 
          stories={stories}
          currentIndex={currentStoryIndex}
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      
      {/* Story creator */}
      <StoryCreator 
        isOpen={creatorOpen}
        onClose={() => setCreatorOpen(false)}
        onSubmit={handleStoryCreated}
      />
    </div>
  );
};

export default StoriesSection;
