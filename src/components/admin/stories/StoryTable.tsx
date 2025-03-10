
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Story } from "@/types/community";
import { Eye, Edit, Trash, Video } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface StoryTableProps {
  stories: Story[];
  isLoading: boolean;
  onView: (story: Story) => void;
  onEdit: (story: Story) => void;
  onDelete: (story: Story) => void;
}

const StoryTable = ({ stories, isLoading, onView, onEdit, onDelete }: StoryTableProps) => {
  if (isLoading) {
    return <StoryTableSkeleton />;
  }

  if (stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <Video className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium mb-1">No stories found</h3>
        <p className="text-muted-foreground mb-4">
          There are no stories matching your criteria.
        </p>
        <Button variant="outline">Create a Story</Button>
      </div>
    );
  }

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">User</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="w-[120px]">Posted</TableHead>
            <TableHead className="w-[120px]">Expires</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Engagement</TableHead>
            <TableHead className="text-right w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stories.map((story) => (
            <TableRow key={story.id}>
              <TableCell className="font-medium">
                {story.userName}
              </TableCell>
              <TableCell>
                <div className="truncate max-w-[300px]">{story.content}</div>
              </TableCell>
              <TableCell>{story.timestamp}</TableCell>
              <TableCell>
                {new Date(story.expiresAt).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>
              <TableCell>
                {isExpired(story.expiresAt) ? (
                  <Badge variant="outline" className="bg-gray-100">Expired</Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">👍 {story.likes}</span>
                  <span className="text-xs font-medium">💬 {story.comments}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(story)}
                  className="h-8 w-8"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(story)}
                  className="h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(story)}
                  className="h-8 w-8 text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const StoryTableSkeleton = () => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">User</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="w-[120px]">Posted</TableHead>
            <TableHead className="w-[120px]">Expires</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Engagement</TableHead>
            <TableHead className="text-right w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(5).fill(0).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-60" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16" /></TableCell>
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoryTable;
