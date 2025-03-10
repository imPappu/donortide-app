
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, MoreHorizontal, ThumbsUp, BarChart2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CommentSection from "@/components/CommentSection";
import ShareModal from "@/components/ShareModal";
import { useAuth } from "@/components/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post, PollOption } from "@/types/community";
import { Progress } from "@/components/ui/progress";

interface CommunityPostProps {
  post: Post;
}

const CommunityPost = ({ post }: CommunityPostProps) => {
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

  const handleVote = (optionId: string) => {
    if (!poll) return;
    
    // If user has already voted
    if (poll.userVoted) {
      toast({
        title: "Already voted",
        description: "You can only vote once per poll",
      });
      return;
    }
    
    // Create a deep copy of the poll
    const updatedPoll = JSON.parse(JSON.stringify(poll));
    
    // Find the option and increment its votes
    const option = updatedPoll.options.find((opt: PollOption) => opt.id === optionId);
    if (option) {
      option.votes++;
      updatedPoll.totalVotes++;
      updatedPoll.userVoted = optionId;
      
      setPoll(updatedPoll);
      
      toast({
        title: "Vote recorded",
        description: "Your vote has been counted",
      });
    }
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

  // Render poll if post has one
  const renderPoll = () => {
    if (!poll) return null;
    
    return (
      <div className="mb-4 bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-3">{poll.question}</h3>
        <div className="space-y-3">
          {poll.options.map((option) => {
            const percentage = poll.totalVotes > 0 
              ? Math.round((option.votes / poll.totalVotes) * 100) 
              : 0;
              
            return (
              <div key={option.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <Button
                    variant={poll.userVoted === option.id ? "default" : "outline"}
                    className="w-full justify-start"
                    disabled={!!poll.userVoted}
                    onClick={() => handleVote(option.id)}
                  >
                    {option.text}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={percentage} className="h-2" />
                  <span className="text-xs">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {poll.totalVotes} {poll.totalVotes === 1 ? 'vote' : 'votes'}
        </p>
      </div>
    );
  };

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
        
        {post.type === 'poll' && renderPoll()}
        
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
