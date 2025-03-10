
import React from "react";
import TagBadge from "../TagBadge";

interface PostContentProps {
  content: string;
  tags?: string[];
  imageUrl?: string;
  onTagClick?: (tag: string) => void;
}

const PostContent = ({ content, tags, imageUrl, onTagClick }: PostContentProps) => {
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
      
      {imageUrl && (
        <div className="mt-3 rounded-md overflow-hidden">
          <img src={imageUrl} alt="Post" className="w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default PostContent;
