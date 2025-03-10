
import React, { useState } from "react";
import { User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentInputProps {
  onAddComment: (content: string) => void;
}

const CommentInput = ({ onAddComment }: CommentInputProps) => {
  const [newComment, setNewComment] = useState("");
  
  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };
  
  return (
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
        onClick={handleSubmit}
        disabled={!newComment.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CommentInput;
