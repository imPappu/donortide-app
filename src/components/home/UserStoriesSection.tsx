
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, User, Award, ArrowRight } from "lucide-react";

interface Story {
  id: string;
  userName: string;
  title: string;
  excerpt: string;
  likes: number;
  comments: number;
  badge?: string;
}

interface UserStoriesSectionProps {
  stories: Story[];
}

const UserStoriesSection = ({ stories }: UserStoriesSectionProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Stories</h2>
        <Link to="/stories" className="text-sm text-primary flex items-center">
          View all <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>
      
      {stories.map(story => (
        <Card key={story.id} className="mb-3">
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-sm">{story.userName}</h3>
                  {story.badge && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Award className="h-3 w-3 mr-1" />
                      {story.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <h4 className="font-medium mb-1">{story.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{story.excerpt}</p>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="flex items-center mr-3">
                <Heart className="h-3 w-3 mr-1" />
                {story.likes}
              </span>
              <span className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {story.comments}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStoriesSection;
