
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentItemProps {
  comment: {
    id: string;
    userName: string;
    userAvatar?: string;
    content: string;
    timestamp: string;
  };
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex items-start gap-2">
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
  );
};

export default CommentItem;
