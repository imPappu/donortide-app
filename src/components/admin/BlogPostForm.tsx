
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlogPost } from '@/services/dbService';
import { useToast } from '@/hooks/use-toast';

interface BlogPostFormProps {
  initialData?: BlogPost;
  onSubmit: (data: BlogPost) => void;
  onCancel: () => void;
}

const BlogPostForm = ({ initialData, onSubmit, onCancel }: BlogPostFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BlogPost>(
    initialData || {
      title: '',
      content: '',
      excerpt: '',
      author: '',
      imageUrl: '',
      category: '',
      tags: [],
      published: true
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags }));
  };

  const handlePublishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, published: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.author) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Create'} Post
        </Button>
      </div>
    </form>
  );
};

export default BlogPostForm;
