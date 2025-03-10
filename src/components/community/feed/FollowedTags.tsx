
import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FollowedTagsProps {
  followedTags: string[];
  handleTagClick: (tag: string) => void;
  toggleFollowTag: (tag: string) => void;
}

const FollowedTags = ({ followedTags, handleTagClick, toggleFollowTag }: FollowedTagsProps) => {
  if (followedTags.length === 0) return null;

  return (
    <div className="mb-4 bg-muted/30 p-3 rounded-md">
      <h3 className="text-sm font-medium mb-2">Your followed tags</h3>
      <div className="flex flex-wrap gap-2">
        {followedTags.map((tag, index) => (
          <div key={index} className="relative inline-block">
            <Badge 
              variant="outline" 
              className="cursor-pointer bg-background"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Badge>
            <button 
              className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-white rounded-full flex items-center justify-center text-xs"
              onClick={(e) => {
                e.stopPropagation();
                toggleFollowTag(tag);
              }}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowedTags;
