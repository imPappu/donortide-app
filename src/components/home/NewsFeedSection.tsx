
import React from "react";
import CreatePostCard from "@/components/home/CreatePostCard";
import NewsFeedPost from "@/components/home/NewsFeedPost";

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  tags: string[];
  isUrgent?: boolean;
}

interface NewsFeedSectionProps {
  posts: Post[];
}

const NewsFeedSection = ({ posts }: NewsFeedSectionProps) => {
  return (
    <div className="space-y-6">
      <CreatePostCard />
      
      <div className="space-y-4">
        {posts.map((post) => (
          <NewsFeedPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeedSection;
