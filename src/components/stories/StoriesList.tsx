
import React from "react";
import StoryCard from "./StoryCard";
import { Story } from "@/types/stories";

interface StoriesListProps {
  stories: Story[];
}

const StoriesList = ({ stories }: StoriesListProps) => {
  return (
    <>
      {stories.map(story => (
        <StoryCard key={story.id} story={story} />
      ))}
    </>
  );
};

export default StoriesList;
