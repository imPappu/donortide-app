
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, MoreHorizontal, ThumbsUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CommentSection from "@/components/CommentSection";
import ShareModal from "@/components/ShareModal";
import { useAuth } from "@/components/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/types/community";

interface CommunityPostProps {
  post: Post;
}

const CommunityPost = ({ post }: CommunityPostProps) => {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
      toast({
        title: "Post liked",
        description: "You liked this post",
      });
    }
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  // Default comments if none provided
  const commentData = post.commentData || [
    {
      id: '1',
      userName: 'Alex Johnson',
      content: 'Thank you for donating! Every donation counts.',
      timestamp: '1 hour ago'
    },
    {
      id: '2',
      userName: 'Maria Garcia',
      content: 'You\'re a hero! I\'m planning to donate next week too.',
      timestamp: '45 minutes ago'
    }
  ];

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              {post.userAvatar ? (
                <AvatarImage src={post.userAvatar} alt={post.userName} />
              ) : (
                <AvatarFallback>
                  {post.userName.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">{post.userName}</h3>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mb-3">
          <p className="text-sm">{post.content}</p>
        </div>
        
        {post.imageUrl && (
          <div className="mb-3 rounded-md overflow-hidden">
            <img src={post.imageUrl} alt="Post" className="w-full h-auto" />
          </div>
        )}
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{likeCount} likes</span>
          <span>{post.comments} comments • {post.shares} shares</span>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-2 border-t flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex-1 ${liked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Like
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex-1"
          onClick={handleComment}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Comment
        </Button>
        <ShareModal
          title={`${post.userName}'s post`}
          url={`https://donortide.com/post/${post.id}`}
          content={post.content}
          type="post"
        />
      </CardFooter>
      
      {showComments && (
        <div className="px-4 pb-4">
          <CommentSection comments={commentData} postId={post.id} postType="post" />
        </div>
      )}
    </Card>
  );
};

export default CommunityPost;
