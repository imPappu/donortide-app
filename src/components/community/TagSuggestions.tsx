
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TagBadge from "./TagBadge";
import { Tag } from "@/types/community";

interface TagSuggestionsProps {
  query: string;
  tags: Tag[];
  onSelectTag: (tag: string) => void;
}

const TagSuggestions = ({ query, tags, onSelectTag }: TagSuggestionsProps) => {
  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(query.toLowerCase()) && 
    query.length > 0
  );

  if (filteredTags.length === 0) return null;

  return (
    <div className="absolute z-10 bg-background border rounded-md shadow-md mt-1 p-2 w-full max-w-xs">
      <ScrollArea className="h-48">
        <div className="space-y-2 p-1">
          {filteredTags.map(tag => (
            <div 
              key={tag.id} 
              className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
              onClick={() => onSelectTag(tag.name)}
            >
              <TagBadge tag={tag.name} />
              <span className="text-xs text-muted-foreground">{tag.count} posts</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TagSuggestions;
