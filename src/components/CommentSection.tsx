
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import CommentItem from "@/components/comment/CommentItem";
import CommentInput from "@/components/comment/CommentInput";

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
  const [showAllComments, setShowAllComments] = useState(false);
  const [displayedComments, setDisplayedComments] = useState<Comment[]>(comments);
  
  const handleAddComment = (content: string) => {
    const comment: Comment = {
      id: Date.now().toString(),
      userName: "You", // In a real app, this would be the logged-in user
      content: content,
      timestamp: "Just now"
    };
    
    setDisplayedComments([comment, ...displayedComments]);
    
    toast({
      title: "Comment added",
      description: `Your comment on this ${postType} has been added`,
    });
  };
  
  const commentsToShow = showAllComments ? displayedComments : displayedComments.slice(0, 2);
  
  return (
    <div className="space-y-4 mt-2">
      <CommentInput onAddComment={handleAddComment} />
      
      {displayedComments.length > 0 && (
        <div className="space-y-3 mt-3">
          {commentsToShow.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
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
