
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share, MoreHorizontal, User, ThumbsUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import TopNavbar from "@/components/TopNavbar";
import { toast } from "@/hooks/use-toast";

interface Post {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
}

const CommunityPost = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);

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
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              {post.userAvatar ? (
                <img src={post.userAvatar} alt={post.userName} className="h-10 w-10 rounded-full" />
              ) : (
                <User className="h-6 w-6 text-gray-600" />
              )}
            </div>
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

const CommunityFeed = () => {
  const [newPost, setNewPost] = useState("");
  
  const posts: Post[] = [
    {
      id: '1',
      userName: 'Sarah Williams',
      content: 'Just donated blood today at Memorial Hospital. The staff was amazing and the process was quick and painless. If you've been considering donating, please do it - you can save a life! #DonorHero',
      likes: 24,
      comments: 5,
      shares: 2,
      timestamp: '2 hours ago',
      liked: false
    },
    {
      id: '2',
      userName: 'Michael Chen',
      content: 'My grandmother needed blood last month and I was so grateful for the donors who helped her. Today I paid it forward and donated for the first time!',
      imageUrl: 'https://placehold.co/600x400/red/white?text=First+Time+Donor',
      likes: 35,
      comments: 8,
      shares: 4,
      timestamp: '5 hours ago',
      liked: true
    },
    {
      id: '3',
      userName: 'Emma Johnson',
      content: 'URGENT: O- blood needed at City Medical Center. My brother is undergoing emergency surgery. Please help if you can!',
      likes: 42,
      comments: 12,
      shares: 15,
      timestamp: '1 day ago',
      liked: false
    }
  ];

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    
    toast({
      title: "Post created",
      description: "Your post has been shared with the community",
    });
    
    setNewPost("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Community Feed" />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <Textarea 
                  placeholder="Share something with the community..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="mb-3"
                />
                <div className="flex justify-end">
                  <Button onClick={handlePostSubmit}>Post</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {posts.map(post => (
          <CommunityPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
