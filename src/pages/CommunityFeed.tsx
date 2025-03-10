
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import CommunityPost from "@/components/community/CommunityPost";
import NewPostForm from "@/components/community/NewPostForm";
import { MOCK_POSTS } from "@/data/mockPosts";

const CommunityFeed = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Community Feed" />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <NewPostForm />
        
        {MOCK_POSTS.map(post => (
          <CommunityPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
