
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PostAuthor {
  name: string;
  avatar: string;
}

interface Post {
  id: number;
  author: PostAuthor;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  tags: string[];
  isUrgent?: boolean;
}

interface NewsFeedPostProps {
  post: Post;
}

const NewsFeedPost = ({ post }: NewsFeedPostProps) => {
  return (
    <Card key={post.id} className={post.isUrgent ? "border-red-500" : ""}>
      <CardHeader className="pb-2 flex flex-row items-start gap-4">
        <Avatar>
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">{post.author.name}</CardTitle>
            {post.isUrgent && (
              <Badge variant="destructive">Urgent</Badge>
            )}
          </div>
          <CardDescription>{post.timeAgo}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{post.content}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="hover:bg-secondary cursor-pointer">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-3">
        <div className="w-full flex items-center justify-between">
          <Button variant="ghost" size="sm" className={post.isLiked ? "text-primary" : ""}>
            <ThumbsUp className="h-4 w-4 mr-1" />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            {post.shares}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NewsFeedPost;
