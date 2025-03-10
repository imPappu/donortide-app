
import React, { useState, useEffect } from "react";
import TopNavbar from "@/components/TopNavbar";
import NewPostForm from "@/components/community/NewPostForm";
import { MOCK_POSTS, TRENDING_TAGS } from "@/data/mockPosts";
import Navigation from "@/components/Navigation";
import TrendingTags from "@/components/community/TrendingTags";
import { toast } from "@/hooks/use-toast";
import PostList from "@/components/community/feed/PostList";
import FilterBar from "@/components/community/feed/FilterBar";
import FollowedTags from "@/components/community/feed/FollowedTags";

// Add some sample poll data to demonstrate functionality
const ENHANCED_POSTS = MOCK_POSTS.map((post, index) => {
  // Add a poll to the first post
  if (index === 0) {
    return {
      ...post,
      type: 'poll' as const,
      poll: {
        question: "Which blood type is most needed right now?",
        options: [
          { id: "opt1", text: "O Negative", votes: 15 },
          { id: "opt2", text: "AB Positive", votes: 8 },
          { id: "opt3", text: "B Negative", votes: 5 },
          { id: "opt4", text: "A Positive", votes: 12 }
        ],
        totalVotes: 40
      }
    };
  }
  // Add an image to the second post
  else if (index === 1) {
    return {
      ...post,
      type: 'image' as const,
      imageUrl: "https://images.unsplash.com/photo-1615461066211-d73c47996290?q=80&w=1000&auto=format&fit=crop"
    };
  }
  
  return { ...post, type: 'text' as const };
});

const CommunityFeed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [followedTags, setFollowedTags] = useState<string[]>([]);
  
  // Filter posts based on search query and active tag
  const filteredPosts = ENHANCED_POSTS.filter(post => {
    const matchesSearch = 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = activeTag 
      ? post.tags?.includes(activeTag) 
      : true;
    
    return matchesSearch && matchesTag;
  });

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    toast({
      title: `Viewing #${tag}`,
      description: `Showing posts tagged with #${tag}`
    });
  };

  const clearTagFilter = () => {
    setActiveTag(null);
  };

  const toggleFollowTag = (tag: string) => {
    if (followedTags.includes(tag)) {
      setFollowedTags(followedTags.filter(t => t !== tag));
      toast({
        title: `Unfollowed #${tag}`,
        description: `You will no longer receive notifications for #${tag}`
      });
    } else {
      setFollowedTags([...followedTags, tag]);
      toast({
        title: `Following #${tag}`,
        description: `You will now receive notifications for #${tag}`
      });
    }
  };

  // Simulate receiving a tag notification
  useEffect(() => {
    if (followedTags.length > 0) {
      const randomIndex = Math.floor(Math.random() * followedTags.length);
      const randomTag = followedTags[randomIndex];
      
      const timeout = setTimeout(() => {
        toast({
          title: `New activity in #${randomTag}`,
          description: `There's new content related to #${randomTag}`
        });
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [followedTags]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Community Feed" showSearchBar={true} onSearch={setSearchQuery} />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        {/* Active tag filter indicator */}
        <FilterBar 
          activeTag={activeTag} 
          clearTagFilter={clearTagFilter}
          followedTags={followedTags}
          toggleFollowTag={toggleFollowTag}
        />
        
        <NewPostForm />
        
        {/* Trending tags section */}
        <div className="mb-4">
          <TrendingTags tags={TRENDING_TAGS} onTagClick={handleTagClick} />
        </div>
        
        {/* Followed tags section */}
        <FollowedTags 
          followedTags={followedTags}
          handleTagClick={handleTagClick}
          toggleFollowTag={toggleFollowTag}
        />
        
        <PostList posts={filteredPosts} onTagClick={handleTagClick} />
      </div>

      <Navigation />
    </div>
  );
};

export default CommunityFeed;
