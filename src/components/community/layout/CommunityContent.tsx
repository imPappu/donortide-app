
import React from "react";
import StoriesSection from "@/components/community/stories/StoriesSection";
import FilterSection from "@/components/community/layout/FilterSection";
import NewPostForm from "@/components/community/NewPostForm";
import TrendingTags from "@/components/community/TrendingTags";
import FollowedTags from "@/components/community/feed/FollowedTags";
import PostList from "@/components/community/feed/PostList";
import { Post, Story } from "@/types/community";

interface CommunityContentProps {
  activeTag: string | null;
  followedTags: string[];
  filteredPosts: Post[];
  stories: Story[];
  handleTagClick: (tag: string) => void;
  clearTagFilter: () => void;
  toggleFollowTag: (tag: string) => void;
  handleAddStory: (storyData: Omit<Story, 'id' | 'timestamp'>) => void;
  handleDeletePost: (postId: string) => void;
  handleEditPost: (post: Post) => void;
  TRENDING_TAGS: any;
}

const CommunityContent = ({ 
  activeTag, 
  followedTags, 
  filteredPosts, 
  stories, 
  handleTagClick, 
  clearTagFilter, 
  toggleFollowTag, 
  handleAddStory, 
  handleDeletePost, 
  handleEditPost,
  TRENDING_TAGS
}: CommunityContentProps) => {
  return (
    <>
      <StoriesSection 
        stories={stories} 
        onAddStory={handleAddStory} 
      />
      
      <FilterSection 
        activeTag={activeTag} 
        clearTagFilter={clearTagFilter}
        followedTags={followedTags}
        toggleFollowTag={toggleFollowTag}
      />
      
      <NewPostForm />
      
      <div className="mb-4">
        <TrendingTags 
          tags={TRENDING_TAGS} 
          onTagClick={handleTagClick} 
        />
      </div>
      
      <FollowedTags 
        followedTags={followedTags}
        handleTagClick={handleTagClick}
        toggleFollowTag={toggleFollowTag}
      />
      
      <PostList 
        posts={filteredPosts} 
        onTagClick={handleTagClick} 
        onDeletePost={handleDeletePost}
        onEditPost={handleEditPost}
      />
    </>
  );
};

export default CommunityContent;
