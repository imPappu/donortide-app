
import React, { useState } from "react";
import TopNavbar from "@/components/TopNavbar";
import CommunityPost from "@/components/community/CommunityPost";
import NewPostForm from "@/components/community/NewPostForm";
import { MOCK_POSTS } from "@/data/mockPosts";
import Navigation from "@/components/Navigation";

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
  
  const filteredPosts = ENHANCED_POSTS.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Community Feed" showSearchBar={true} onSearch={setSearchQuery} />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <NewPostForm />
        
        {filteredPosts.map(post => (
          <CommunityPost key={post.id} post={post} />
        ))}
      </div>

      <Navigation />
    </div>
  );
};

export default CommunityFeed;
