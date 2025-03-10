
import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Video, Trash, Loader2 } from "lucide-react";
import { Story } from "@/types/community";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "@/hooks/use-toast";

interface StoryCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (storyData: Omit<Story, 'id' | 'timestamp'>) => void;
}

const StoryCreator = ({ isOpen, onClose, onSubmit }: StoryCreatorProps) => {
  const [content, setContent] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive",
      });
      return;
    }
    
    // Check if video is under 20 seconds (get duration)
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      
      // Check duration (convert to seconds)
      const duration = video.duration;
      if (duration > 20) {
        toast({
          title: "Video too long",
          description: "Please upload a video that is 20 seconds or less",
          variant: "destructive",
        });
        return;
      }
      
      // Set the video file and preview
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    };
    
    video.src = URL.createObjectURL(file);
  };
  
  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async () => {
    if (!videoFile || !user) return;
    
    setIsUploading(true);
    
    try {
      // In a real app, you would upload the video to a server or cloud storage
      // For this example, we'll simulate a server response with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create expiry date (24 hours from now)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
      
      // Create the story object
      const storyData: Omit<Story, 'id' | 'timestamp'> = {
        userName: user.name,
        userAvatar: user.avatar,
        content: content,
        videoUrl: videoPreview || '', // In a real app, this would be the URL from the server
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        type: 'story',
        duration: 15, // Default to 15 seconds
        expiresAt: expiresAt.toISOString(),
      };
      
      onSubmit(storyData);
      
      // Reset the form
      setContent("");
      setVideoFile(null);
      setVideoPreview(null);
    } catch (error) {
      toast({
        title: "Error creating story",
        description: "There was a problem creating your story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const isSubmitDisabled = !videoFile || isUploading;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Story</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Textarea 
            placeholder="Add a caption to your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none"
          />
          
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center relative">
            {videoPreview ? (
              <div className="relative w-full">
                <video 
                  src={videoPreview} 
                  controls 
                  className="w-full h-auto rounded"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveVideo}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleVideoSelect}
                />
                <div className="flex flex-col items-center py-6">
                  <Video className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Upload a short video (max 20 seconds)</p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Camera className="h-4 w-4 mr-2" />
                    Select Video
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              'Share Story'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StoryCreator;
