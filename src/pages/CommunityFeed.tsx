
import React from "react";
import CommunityLayout from "@/components/community/layout/CommunityLayout";
import CommunityContent from "@/components/community/layout/CommunityContent";
import { useCommunityFeed } from "@/hooks/useCommunityFeed";

const CommunityFeed = () => {
  const communityFeedProps = useCommunityFeed();

  return (
    <CommunityLayout 
      title="Community Feed" 
      searchQuery={communityFeedProps.searchQuery}
      setSearchQuery={communityFeedProps.setSearchQuery}
    >
      <CommunityContent {...communityFeedProps} />
    </CommunityLayout>
  );
};

export default CommunityFeed;
