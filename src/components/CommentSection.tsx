
import React, { useState } from "react";
import { User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Comment {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
}

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
  postType: 'post' | 'story';
}

const CommentSection = ({ comments, postId, postType }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [displayedComments, setDisplayedComments] = useState<Comment[]>(comments);
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      userName: "You", // In a real app, this would be the logged-in user
      content: newComment,
      timestamp: "Just now"
    };
    
    setDisplayedComments([comment, ...displayedComments]);
    setNewComment("");
    
    toast({
      title: "Comment added",
      description: `Your comment on this ${postType} has been added`,
    });
  };
  
  const commentsToShow = showAllComments ? displayedComments : displayedComments.slice(0, 2);
  
  return (
    <div className="space-y-4 mt-2">
      <div className="flex items-start gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="h-4 w-4 text-gray-600" />
        </div>
        <div className="flex-1">
          <Textarea 
            placeholder="Write a comment..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="resize-none"
            rows={1}
          />
        </div>
        <Button 
          size="sm" 
          className="mt-1" 
          onClick={handleAddComment}
          disabled={!newComment.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {displayedComments.length > 0 && (
        <div className="space-y-3 mt-3">
          {commentsToShow.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2">
              <Avatar className="h-8 w-8">
                {comment.userAvatar && <AvatarImage src={comment.userAvatar} alt={comment.userName} />}
                <AvatarFallback className="bg-primary/10 text-primary">
                  {comment.userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-muted/50 p-2 rounded-md">
                <div className="flex justify-between">
                  <span className="text-xs font-medium">{comment.userName}</span>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
          
          {displayedComments.length > 2 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs" 
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {showAllComments ? "Show less" : `View all ${displayedComments.length} comments`}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
