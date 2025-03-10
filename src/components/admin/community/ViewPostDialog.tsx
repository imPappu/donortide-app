
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/types/community";

interface ViewPostDialogProps {
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formatDate: (dateString: string) => string;
}

const ViewPostDialog = ({ post, open, onOpenChange, formatDate }: ViewPostDialogProps) => {
  if (!post) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>View Post</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10 mr-3">
              {post.userAvatar ? (
                <AvatarImage src={post.userAvatar} alt={post.userName} />
              ) : (
                <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-medium">{post.userName}</p>
              <p className="text-sm text-muted-foreground">{formatDate(post.timestamp)}</p>
            </div>
          </div>
          
          <div className="mb-4 whitespace-pre-wrap">{post.content}</div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex justify-between text-sm text-muted-foreground border-t pt-4">
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPostDialog;
