
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Reply, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentItemProps {
  comment: {
    id: string;
    userName: string;
    userAvatar?: string;
    content: string;
    timestamp: string;
    likes?: number;
  };
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const [liked, setLiked] = React.useState(false);
  
  return (
    <div className="flex items-start gap-2 mb-3 group">
      <Avatar className="h-8 w-8 mt-1">
        {comment.userAvatar && <AvatarImage src={comment.userAvatar} alt={comment.userName} />}
        <AvatarFallback className="bg-primary/10 text-primary">
          {comment.userName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-muted/40 p-2.5 rounded-lg">
          <div className="flex justify-between">
            <span className="text-xs font-semibold">{comment.userName}</span>
            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
          </div>
          <p className="text-sm mt-1 whitespace-pre-line">{comment.content}</p>
        </div>
        
        <div className="flex items-center mt-1 space-x-3 pl-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs text-muted-foreground hover:text-primary"
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`h-3.5 w-3.5 mr-1 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            {comment.likes || 0} {liked ? (comment.likes === 1 ? 'Like' : 'Likes') : 'Like'}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Reply className="h-3.5 w-3.5 mr-1" />
            Reply
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
