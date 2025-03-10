
import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterBarProps {
  activeTag: string | null;
  clearTagFilter: () => void;
  followedTags: string[];
  toggleFollowTag: (tag: string) => void;
}

const FilterBar = ({ 
  activeTag, 
  clearTagFilter, 
  followedTags, 
  toggleFollowTag 
}: FilterBarProps) => {
  if (!activeTag) return null;

  return (
    <div className="flex items-center justify-between bg-muted p-2 rounded-md mb-4">
      <div className="flex items-center">
        <span className="text-sm mr-2">Filtered by:</span>
        <Badge variant="default">{activeTag}</Badge>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="text-xs text-muted-foreground hover:text-primary"
          onClick={() => toggleFollowTag(activeTag)}
        >
          {followedTags.includes(activeTag) ? 'Unfollow' : 'Follow'}
        </button>
        <button
          className="h-6 w-6 rounded-full bg-muted-foreground/10 flex items-center justify-center"
          onClick={clearTagFilter}
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
