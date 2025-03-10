
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/types/community";

interface PostTableProps {
  posts: Post[];
  onViewPost: (post: Post) => void;
  onOpenFlagDialog: (post: Post) => void;
  onDeletePost: (id: string) => void;
  formatDate: (dateString: string) => string;
  truncateContent: (content: string, maxLength?: number) => string;
}

const PostTable = ({ 
  posts, 
  onViewPost, 
  onOpenFlagDialog, 
  onDeletePost,
  formatDate,
  truncateContent
}: PostTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Posted</TableHead>
            <TableHead>Engagement</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      {post.userAvatar ? (
                        <AvatarImage src={post.userAvatar} alt={post.userName} />
                      ) : (
                        <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                    <span className="font-medium">{post.userName}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  {truncateContent(post.content)}
                </TableCell>
                <TableCell>{formatDate(post.timestamp)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{post.likes} likes</span>
                    <span>•</span>
                    <span>{post.comments} comments</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => onViewPost(post)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onOpenFlagDialog(post)}>
                    <AlertTriangle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDeletePost(post.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No posts found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostTable;
