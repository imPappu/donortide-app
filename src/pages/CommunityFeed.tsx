
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import NewPostForm from "@/components/community/NewPostForm";
import Navigation from "@/components/Navigation";
import TrendingTags from "@/components/community/TrendingTags";
import PostList from "@/components/community/feed/PostList";
import FilterBar from "@/components/community/feed/FilterBar";
import FollowedTags from "@/components/community/feed/FollowedTags";
import StoriesSection from "@/components/community/stories/StoriesSection";
import { useCommunityFeed } from "@/hooks/useCommunityFeed";
import { TRENDING_TAGS } from "@/data/mockPosts";

const CommunityFeed = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeTag,
    followedTags,
    filteredPosts,
    stories,
    handleTagClick,
    clearTagFilter,
    toggleFollowTag,
    handleAddStory,
    handleDeletePost,
    handleEditPost
  } = useCommunityFeed();

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Community Feed" showSearchBar={true} onSearch={setSearchQuery} />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <StoriesSection stories={stories} onAddStory={handleAddStory} />
        
        <FilterBar 
          activeTag={activeTag} 
          clearTagFilter={clearTagFilter}
          followedTags={followedTags}
          toggleFollowTag={toggleFollowTag}
        />
        
        <NewPostForm />
        
        <div className="mb-4">
          <TrendingTags tags={TRENDING_TAGS} onTagClick={handleTagClick} />
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
      </div>

      <Navigation />
    </div>
  );
};

export default CommunityFeed;
