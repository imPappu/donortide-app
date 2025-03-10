
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share, Award, User, ThumbsUp } from "lucide-react";
import TopNavbar from "@/components/TopNavbar";
import { toast } from "@/hooks/use-toast";

interface Story {
  id: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  imageUrl?: string;
  category: 'donor' | 'recipient' | 'volunteer';
  badges?: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

const StoryCard = ({ story }: { story: Story }) => {
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(story.likes);

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
    toast({
      title: "Comment",
      description: "Coming soon: commenting functionality",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share",
      description: "Coming soon: social media sharing",
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              {story.userAvatar ? (
                <img src={story.userAvatar} alt={story.userName} className="h-10 w-10 rounded-full" />
              ) : (
                <User className="h-6 w-6 text-gray-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-sm flex items-center">
                {story.userName}
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
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex-1"
          onClick={handleShare}
        >
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

const UserStories = () => {
  const stories: Story[] = [
    {
      id: '1',
      userName: 'James Wilson',
      title: 'My Journey as a Regular Donor',
      content: 'I've been donating blood every 3 months for the past 5 years. It started when my sister needed a transfusion after a car accident. Seeing how blood donation saved her life motivated me to become a regular donor. Over the years, I've donated more than 20 times, potentially helping dozens of patients.',
      imageUrl: 'https://placehold.co/600x400/red/white?text=Blood+Donor',
      category: 'donor',
      badges: ['Hero Donor', 'Lifetime Saver'],
      likes: 56,
      comments: 12,
      shares: 8,
      timestamp: '3 days ago'
    },
    {
      id: '2',
      userName: 'Maria Rodriguez',
      title: 'How Blood Donation Saved My Life',
      content: 'Six months ago, I was in a serious accident and lost a lot of blood. I needed multiple transfusions to survive. Thanks to generous donors, I'm alive today. This experience changed my perspective on blood donation forever. As soon as I'm eligible, I plan to donate regularly to help others like me.',
      category: 'recipient',
      likes: 78,
      comments: 15,
      shares: 23,
      timestamp: '1 week ago'
    },
    {
      id: '3',
      userName: 'David Chen',
      title: 'Volunteering at Donation Drives',
      content: 'I've been volunteering at blood donation drives for the past 2 years. While I can't donate blood myself due to medical reasons, I found this way to contribute. Seeing the impact of these drives and helping to organize them has been incredibly rewarding. We're always looking for more volunteers!',
      imageUrl: 'https://placehold.co/600x400/blue/white?text=Volunteer+Work',
      category: 'volunteer',
      badges: ['Community Star'],
      likes: 42,
      comments: 9,
      shares: 5,
      timestamp: '2 weeks ago'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="User Stories" />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-1">Experience Stories</h1>
          <p className="text-sm text-muted-foreground">
            Read inspiring stories from donors, recipients, and volunteers
          </p>
        </div>
        
        {stories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
        
        <div className="flex justify-center mt-4 mb-8">
          <Button>
            Share Your Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserStories;
