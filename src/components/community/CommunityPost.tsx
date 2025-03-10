
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import CommentSection from "@/components/CommentSection";
import { useAuth } from "@/components/auth/AuthContext";
import { Post } from "@/types/community";
import PostHeader from "./post/PostHeader";
import PostContent from "./post/PostContent";
import PostFooter from "./post/PostFooter";
import PostStats from "./post/PostStats";
import PollItem from "./poll/PollItem";
import { Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface CommunityPostProps {
  post: Post;
  onTagClick?: (tag: string) => void;
  onDelete?: (postId: string) => void;
  onEdit?: (post: Post) => void;
}

const CommunityPost = ({ post, onTagClick, onDelete, onEdit }: CommunityPostProps) => {
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

  const isOwnPost = user && user.name === post.userName;

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

  const handleDelete = () => {
    if (onDelete) {
      onDelete(post.id);
      toast({
        title: "Post deleted",
        description: "Your post has been deleted",
      });
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(post);
    }
  };

  return (
    <Card className={`mb-4 ${post.type === 'story' ? 'border-blue-500' : ''}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <PostHeader 
            userName={post.userName}
            userAvatar={post.userAvatar}
            timestamp={post.timestamp}
          />
          
          {isOwnPost && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete post?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your post.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        
        <PostContent 
          content={post.content}
          tags={post.tags}
          imageUrl={post.imageUrl}
          videoUrl={post.videoUrl}
          isStory={post.type === 'story'}
          onTagClick={onTagClick}
        />
        
        {post.type === 'poll' && poll && (
          <PollItem poll={poll} onVote={setPoll} />
        )}
        
        <PostStats 
          likeCount={likeCount}
          comments={post.comments}
          shares={post.shares}
        />
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
