
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BlogPost } from '@/services/dbService';
import { useToast } from '@/hooks/use-toast';
import BlogPostBasicFields from './blog/BlogPostBasicFields';
import BlogPostContentFields from './blog/BlogPostContentFields';

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
      <BlogPostBasicFields 
        formData={formData} 
        handleChange={handleChange}
      />
      
      <BlogPostContentFields 
        formData={formData}
        handleChange={handleChange}
        handleTagsChange={handleTagsChange}
        handlePublishedChange={handlePublishedChange}
      />
      
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
