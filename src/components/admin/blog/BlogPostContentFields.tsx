
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { BlogPost } from '@/types/apiTypes';

interface BlogPostContentFieldsProps {
  formData: BlogPost;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPublishToggle: (published: boolean) => void;
}

const BlogPostContentFields = ({ formData, onChange, onPublishToggle }: BlogPostContentFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={onChange}
          className="w-full min-h-[300px] p-3 border rounded-md"
          placeholder="Write your blog post content here..."
        />
        <p className="text-sm text-muted-foreground">
          Support markdown formatting for rich content.
        </p>
      </div>
      
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={onChange}
            className="w-full min-h-[100px] p-3 border rounded-md"
            placeholder="A short summary of the post"
          />
          <p className="text-sm text-muted-foreground">
            This will be displayed in blog post listings.
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="published"
          checked={formData.isPublished}
          onCheckedChange={onPublishToggle}
        />
        <Label htmlFor="published">Publish this post</Label>
      </div>
    </div>
  );
};

export default BlogPostContentFields;
