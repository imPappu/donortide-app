
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import StoriesList from "@/components/stories/StoriesList";
import StoriesHeader from "@/components/stories/StoriesHeader";
import ShareStoryButton from "@/components/stories/ShareStoryButton";
import { MOCK_STORIES } from "@/data/mockStories";

const UserStories = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="User Stories" />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <StoriesHeader />
        <StoriesList stories={MOCK_STORIES} />
        <ShareStoryButton />
      </div>
    </div>
  );
};

export default UserStories;
