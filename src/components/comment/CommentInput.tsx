
import React, { useState } from "react";
import { User, Send, Image, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/AuthContext";

interface CommentInputProps {
  onAddComment: (content: string) => void;
}

const CommentInput = ({ onAddComment }: CommentInputProps) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();
  
  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <div className="flex items-start gap-2 bg-muted/20 p-3 rounded-lg border border-border/60">
      <Avatar className="h-8 w-8">
        {user?.avatar ? (
          <AvatarImage src={user.avatar} alt={user.name} />
        ) : (
          <AvatarFallback className="bg-primary/10 text-primary">
            {user ? user.name.charAt(0) : <User className="h-4 w-4 text-gray-600" />}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1">
        <Textarea 
          placeholder="Write a comment..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          className="resize-none border-0 focus-visible:ring-0 p-0 min-h-[60px] bg-transparent"
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Image className="h-4 w-4 text-blue-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Smile className="h-4 w-4 text-amber-500" />
            </Button>
          </div>
          <Button 
            size="sm"
            className="rounded-full px-4"
            onClick={handleSubmit}
            disabled={!newComment.trim()}
          >
            <Send className="h-4 w-4 mr-1" />
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
