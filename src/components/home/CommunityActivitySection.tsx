
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, User, ArrowRight } from "lucide-react";

interface CommunityPost {
  id: string;
  userName: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

interface CommunityActivitySectionProps {
  posts: CommunityPost[];
}

const CommunityActivitySection = ({ posts }: CommunityActivitySectionProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Community Activity</h2>
        <Link to="/community" className="text-sm text-primary flex items-center">
          View all <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>
      
      {posts.map(post => (
        <Card key={post.id} className="mb-3">
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-sm">{post.userName}</h3>
                <p className="text-xs text-muted-foreground">{post.timestamp}</p>
              </div>
            </div>
            
            <p className="text-sm mb-2">{post.content}</p>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="flex items-center mr-3">
                <Heart className="h-3 w-3 mr-1" />
                {post.likes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {post.comments}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommunityActivitySection;
