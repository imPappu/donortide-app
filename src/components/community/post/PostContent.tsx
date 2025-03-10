
import React from "react";
import TagBadge from "../TagBadge";
import { Video } from "lucide-react";

interface PostContentProps {
  content: string;
  tags?: string[];
  imageUrl?: string;
  videoUrl?: string;
  isStory?: boolean;
  onTagClick?: (tag: string) => void;
}

const PostContent = ({ content, tags, imageUrl, videoUrl, isStory, onTagClick }: PostContentProps) => {
  return (
    <div className="mb-3">
      <p className="text-sm mb-2">{content}</p>
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <TagBadge 
              key={index} 
              tag={tag} 
              onClick={() => onTagClick && onTagClick(tag)}
            />
          ))}
        </div>
      )}
      
      {videoUrl && (
        <div className="mt-3 rounded-md overflow-hidden relative">
          <video 
            src={videoUrl} 
            controls={!isStory} 
            autoPlay={isStory}
            loop={isStory}
            muted={isStory}
            className="w-full h-auto max-h-[60vh]"
          />
          {isStory && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <Video className="h-3 w-3 mr-1" />
              Story
            </div>
          )}
        </div>
      )}
      
      {imageUrl && !videoUrl && (
        <div className="mt-3 rounded-md overflow-hidden">
          <img src={imageUrl} alt="Post" className="w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default PostContent;
