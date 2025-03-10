
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tag as TagIcon } from "lucide-react";

interface TagBadgeProps {
  tag: string;
  onClick?: () => void;
  trending?: boolean;
  count?: number;
  className?: string;
}

const TagBadge = ({ tag, onClick, trending, count, className }: TagBadgeProps) => {
  return (
    <Badge 
      variant={trending ? "default" : "secondary"}
      className={`cursor-pointer hover:bg-primary/90 flex items-center gap-1 ${className}`}
      onClick={onClick}
    >
      <TagIcon className="h-3 w-3" />
      <span>{tag}</span>
      {count !== undefined && <span className="text-xs opacity-70">({count})</span>}
    </Badge>
  );
};

export default TagBadge;
