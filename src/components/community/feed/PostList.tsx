
import React from "react";
import { Post } from "@/types/community";
import CommunityPost from "../CommunityPost";

interface PostListProps {
  posts: Post[];
  onTagClick?: (tag: string) => void;
  onDeletePost?: (postId: string) => void;
  onEditPost?: (post: Post) => void;
}

const PostList = ({ posts, onTagClick, onDeletePost, onEditPost }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-medium mb-2">No posts found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <CommunityPost 
          key={post.id} 
          post={post} 
          onTagClick={onTagClick}
          onDelete={onDeletePost}
          onEdit={onEditPost}
        />
      ))}
    </div>
  );
};

export default PostList;
