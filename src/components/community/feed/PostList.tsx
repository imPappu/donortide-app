
import React from "react";
import CommunityPost from "@/components/community/CommunityPost";
import { Post } from "@/types/community";

interface PostListProps {
  posts: Post[];
  onTagClick: (tag: string) => void;
}

const PostList = ({ posts, onTagClick }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No posts found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <CommunityPost key={post.id} post={post} onTagClick={onTagClick} />
      ))}
    </div>
  );
};

export default PostList;
