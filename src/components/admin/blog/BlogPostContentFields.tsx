import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BlogPost } from "@/types/apiTypes";

interface BlogPostContentFieldsProps {
  post: Partial<BlogPost>;
  onChange: (field: string, value: any) => void;
}

const BlogPostContentFields = ({ post, onChange }: BlogPostContentFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input 
          id="imageUrl" 
          name="imageUrl" 
          value={post.imageUrl || ''} 
          onChange={(e) => onChange('imageUrl', e.target.value)} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input 
          id="tags" 
          name="tags" 
          value={post.tags?.join(', ') || ''} 
          onChange={(e) => onChange('tags', e.target.value)} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <textarea 
          id="content" 
          name="content" 
          value={post.content} 
          onChange={(e) => onChange('content', e.target.value)} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[200px]"
          required 
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="published" 
          checked={post.isPublished} 
          onCheckedChange={(checked) => onChange('isPublished', checked)}
        />
        <Label htmlFor="published" className="cursor-pointer">Publish this post</Label>
      </div>
    </div>
  );
};

export default BlogPostContentFields;
