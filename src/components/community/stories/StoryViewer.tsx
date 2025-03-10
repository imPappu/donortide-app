
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Story } from "@/types/community";
import { ProgressBar } from "@/components/ui/progress";
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StoryViewerProps {
  stories: Story[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StoryViewer = ({ 
  stories, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious 
}: StoryViewerProps) => {
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const story = stories[currentIndex];
  
  useEffect(() => {
    if (!isOpen || !story) return;
    
    setProgress(0);
    
    const duration = story.duration || 15; // Default to 15 seconds if not specified
    const interval = 100; // Update progress every 100ms
    const steps = (duration * 1000) / interval;
    const increment = 100 / steps;
    
    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(timer);
        onNext();
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [isOpen, currentIndex, story, onNext]);
  
  if (!story) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-xl p-0 bg-black overflow-hidden">
        <div className="relative h-[80vh] max-h-[80vh] w-full flex items-center justify-center">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 z-10 p-3">
            <ProgressBar value={progress} className="w-full h-1" />
          </div>
          
          {/* User info */}
          <div className="absolute top-10 left-0 right-0 z-10 px-4 flex items-center">
            <Avatar className="h-10 w-10 mr-2">
              {story.userAvatar ? (
                <AvatarImage src={story.userAvatar} alt={story.userName} />
              ) : (
                <AvatarFallback>{story.userName.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="text-white font-medium">{story.userName}</h3>
              <p className="text-white/70 text-xs">{story.timestamp}</p>
            </div>
          </div>
          
          {/* Video content */}
          <video
            src={story.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Controls */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-3 right-3 text-white z-10 p-1.5"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-3 right-3 text-white z-10 p-1.5 bg-black/30 rounded-full"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>
          
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full w-1/4 bg-transparent text-transparent hover:bg-transparent hover:text-transparent"
            onClick={onPrevious}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-1/4 bg-transparent text-transparent hover:bg-transparent hover:text-transparent"
            onClick={onNext}
          />
          
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white z-10">
            {currentIndex > 0 && (
              <Button variant="ghost" size="icon" className="bg-black/30 rounded-full" onClick={onPrevious}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}
          </div>
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white z-10">
            {currentIndex < stories.length - 1 && (
              <Button variant="ghost" size="icon" className="bg-black/30 rounded-full" onClick={onNext}>
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewer;
