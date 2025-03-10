
import React from "react";
import FilterBar from "@/components/community/feed/FilterBar";

interface FilterSectionProps {
  activeTag: string | null;
  clearTagFilter: () => void;
  followedTags: string[];
  toggleFollowTag: (tag: string) => void;
}

const FilterSection = ({
  activeTag,
  clearTagFilter,
  followedTags,
  toggleFollowTag
}: FilterSectionProps) => {
  return (
    <FilterBar 
      activeTag={activeTag} 
      clearTagFilter={clearTagFilter}
      followedTags={followedTags}
      toggleFollowTag={toggleFollowTag}
    />
  );
};

export default FilterSection;
