
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Story } from "@/types/community";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ThumbsUp, MessageSquare, Share } from "lucide-react";

interface ViewStoryDialogProps {
  story: Story;
  isOpen: boolean;
  onClose: () => void;
}

const ViewStoryDialog = ({ story, isOpen, onClose }: ViewStoryDialogProps) => {
  const isExpired = new Date(story.expiresAt) < new Date();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>View Story</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <Avatar>
              {story.userAvatar ? (
                <AvatarImage src={story.userAvatar} alt={story.userName} />
              ) : (
                <AvatarFallback>{story.userName.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-medium">{story.userName}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{story.timestamp}</span>
              </div>
            </div>
            {isExpired ? (
              <Badge variant="outline" className="ml-auto bg-gray-100">Expired</Badge>
            ) : (
              <Badge variant="outline" className="ml-auto bg-green-50 text-green-700">Active</Badge>
            )}
          </div>
          
          <div className="py-2 px-3 bg-muted rounded-md">
            <p>{story.content}</p>
          </div>
          
          {story.videoUrl && (
            <div className="rounded-md overflow-hidden border">
              <video 
                src={story.videoUrl} 
                controls 
                className="w-full h-auto max-h-[300px] object-contain bg-black"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{story.likes} likes</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{story.comments} comments</span>
              </div>
              <div className="flex items-center">
                <Share className="h-4 w-4 mr-1" />
                <span>{story.shares} shares</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Expires: {formatDistanceToNow(new Date(story.expiresAt), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStoryDialog;
