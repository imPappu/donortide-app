
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlogPost } from '@/types/apiTypes';

interface BlogPostContentFieldsProps {
  formData: BlogPost;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePublishedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BlogPostContentFields = ({ 
  formData, 
  handleChange, 
  handleTagsChange,
  handlePublishedChange 
}: BlogPostContentFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input 
          id="imageUrl" 
          name="imageUrl" 
          value={formData.imageUrl || ''} 
          onChange={handleChange} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input 
          id="tags" 
          name="tags" 
          value={formData.tags?.join(', ') || ''} 
          onChange={handleTagsChange} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <textarea 
          id="content" 
          name="content" 
          value={formData.content} 
          onChange={handleChange} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[200px]"
          required 
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          id="published" 
          name="published" 
          checked={formData.published} 
          onChange={handlePublishedChange} 
          className="w-4 h-4"
        />
        <Label htmlFor="published">Published</Label>
      </div>
    </>
  );
};

export default BlogPostContentFields;
