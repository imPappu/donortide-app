
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import CommentSection from "@/components/CommentSection";
import { useAuth } from "@/components/auth/AuthContext";
import { Post } from "@/types/community";
import PostHeader from "./post/PostHeader";
import PostContent from "./post/PostContent";
import PostFooter from "./post/PostFooter";
import PollItem from "./poll/PollItem";

interface CommunityPostProps {
  post: Post;
  onTagClick?: (tag: string) => void;
}

const CommunityPost = ({ post, onTagClick }: CommunityPostProps) => {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [poll, setPoll] = useState(post.poll);
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
        <PostHeader 
          userName={post.userName}
          userAvatar={post.userAvatar}
          timestamp={post.timestamp}
        />
        
        <PostContent 
          content={post.content}
          tags={post.tags}
          imageUrl={post.imageUrl}
          onTagClick={onTagClick}
        />
        
        {post.type === 'poll' && poll && (
          <PollItem poll={poll} onVote={setPoll} />
        )}
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{likeCount} likes</span>
          <span>{post.comments} comments • {post.shares} shares</span>
        </div>
      </CardContent>
      
      <CardFooter className="px-0 py-0 border-t flex justify-between">
        <PostFooter
          likes={likeCount}
          comments={post.comments}
          shares={post.shares}
          userName={post.userName}
          content={post.content}
          postId={post.id}
          liked={liked}
          onLike={handleLike}
          onComment={handleComment}
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
