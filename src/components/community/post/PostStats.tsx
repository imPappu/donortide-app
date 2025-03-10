
import React from "react";

interface PostStatsProps {
  likeCount: number;
  comments: number;
  shares: number;
}

const PostStats = ({ likeCount, comments, shares }: PostStatsProps) => {
  return (
    <div className="flex justify-between text-xs text-muted-foreground">
      <span>{likeCount} likes</span>
      <span>{comments} comments • {shares} shares</span>
    </div>
  );
};

export default PostStats;
