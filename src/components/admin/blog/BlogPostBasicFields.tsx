
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlogPost } from '@/types/apiTypes';

interface BlogPostBasicFieldsProps {
  formData: BlogPost;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BlogPostBasicFields = ({ formData, handleChange }: BlogPostBasicFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="author">Author *</Label>
        <Input 
          id="author" 
          name="author" 
          value={formData.author} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input 
          id="category" 
          name="category" 
          value={formData.category || ''} 
          onChange={handleChange} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input 
          id="excerpt" 
          name="excerpt" 
          value={formData.excerpt || ''} 
          onChange={handleChange} 
        />
      </div>
    </>
  );
};

export default BlogPostBasicFields;
