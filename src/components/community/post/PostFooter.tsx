
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp } from "lucide-react";
import ShareModal from "@/components/ShareModal";

interface PostFooterProps {
  likes: number;
  comments: number;
  shares: number;
  userName: string;
  content: string;
  postId: string;
  liked: boolean;
  onLike: () => void;
  onComment: () => void;
}

const PostFooter = ({ 
  likes, 
  comments, 
  shares, 
  userName, 
  content, 
  postId, 
  liked, 
  onLike, 
  onComment 
}: PostFooterProps) => {
  return (
    <>
      <div className="flex justify-between text-xs text-muted-foreground px-4">
        <span>{likes} likes</span>
        <span>{comments} comments • {shares} shares</span>
      </div>
      
      <div className="px-4 py-2 border-t flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex-1 ${liked ? 'text-red-500' : ''}`}
          onClick={onLike}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Like
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex-1"
          onClick={onComment}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Comment
        </Button>
        <ShareModal
          title={`${userName}'s post`}
          url={`https://donortide.com/post/${postId}`}
          content={content}
          type="post"
        />
      </div>
    </>
  );
};

export default PostFooter;
