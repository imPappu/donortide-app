
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import TagBadge from "./TagBadge";
import { Tag } from "@/types/community";

interface TrendingTagsProps {
  tags: Tag[];
  onTagClick: (tag: string) => void;
}

const TrendingTags = ({ tags, onTagClick }: TrendingTagsProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Trending CauseTags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <TagBadge 
              key={tag.id} 
              tag={tag.name} 
              trending={tag.trending}
              count={tag.count}
              onClick={() => onTagClick(tag.name)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTags;
