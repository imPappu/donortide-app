
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, Award, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CommentSection from "@/components/CommentSection";
import ShareModal from "@/components/ShareModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Story } from "@/types/stories";

interface StoryCardProps {
  story: Story;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(story.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
      toast({
        title: "Story liked",
        description: "You liked this story",
      });
    }
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  // Default comment data
  const commentData = [
    {
      id: '1',
      userName: 'Robert Lee',
      content: 'Thanks for sharing your inspirational story!',
      timestamp: '2 days ago'
    },
    {
      id: '2',
      userName: 'Lisa Wong',
      content: 'This is incredible. You\'re making such a difference.',
      timestamp: '1 day ago'
    }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              {story.userAvatar ? (
                <AvatarImage src={story.userAvatar} alt={story.userName} />
              ) : (
                <AvatarFallback>
                  {story.userName.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-medium text-sm flex items-center">
                {story.userName}
                {story.isVerified && (
                  <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />
                )}
                {story.badges && story.badges.length > 0 && (
                  <div className="ml-2 flex">
                    <Award className="h-4 w-4 text-yellow-500" />
                  </div>
                )}
              </h3>
              <p className="text-xs text-muted-foreground">{story.timestamp}</p>
            </div>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            story.category === 'donor' ? 'bg-blue-100 text-blue-600' : 
            story.category === 'recipient' ? 'bg-green-100 text-green-600' : 
            'bg-purple-100 text-purple-600'
          }`}>
            {story.category === 'donor' ? 'Donor Story' : 
             story.category === 'recipient' ? 'Recipient Story' : 
             'Volunteer Story'}
          </span>
        </div>
        
        <h2 className="text-lg font-semibold mb-2">{story.title}</h2>
        
        <div className="mb-3">
          <p className="text-sm">{story.content}</p>
        </div>
        
        {story.imageUrl && (
          <div className="mb-3 rounded-md overflow-hidden">
            <img src={story.imageUrl} alt="Story" className="w-full h-auto" />
          </div>
        )}
        
        {story.badges && story.badges.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {story.badges.map((badge, index) => (
              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Award className="h-3 w-3 mr-1" />
                {badge}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{likeCount} likes</span>
          <span>{story.comments} comments • {story.shares} shares</span>
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
          title={story.title}
          url={`https://donortide.com/stories/${story.id}`}
          content={story.content}
          type="story"
        />
      </CardFooter>
      
      {showComments && (
        <div className="px-4 pb-4">
          <CommentSection comments={commentData} postId={story.id} postType="story" />
        </div>
      )}
    </Card>
  );
};

export default StoryCard;
