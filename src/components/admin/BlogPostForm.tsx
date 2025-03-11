
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BlogPost } from '@/types/apiTypes';
import { createBlogPost, updateBlogPost } from '@/services/blogService';
import BlogPostBasicFields from './blog/BlogPostBasicFields';
import BlogPostContentFields from './blog/BlogPostContentFields';

interface BlogPostFormProps {
  post?: Partial<BlogPost>;
  onSuccess: () => void;
  onCancel: () => void;
}

const BlogPostForm = ({ post, onSuccess, onCancel }: BlogPostFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>(
    post || {
      title: '',
      content: '',
      excerpt: '',
      author: '',
      imageUrl: '',
      tags: [],
      category: '',
      publishDate: new Date().toISOString(),
      isPublished: false,
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData({
      ...formData,
      tags,
    });
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData({
      ...formData,
      imageUrl,
    });
  };

  const handlePublishToggle = (isPublished: boolean) => {
    setFormData({
      ...formData,
      isPublished,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title?.trim()) {
      toast({
        title: "Error",
        description: "Post title is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.content?.trim()) {
      toast({
        title: "Error",
        description: "Post content is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.excerpt?.trim()) {
      // Auto-generate excerpt from content if not provided
      const excerpt = formData.content.substring(0, 150) + '...';
      formData.excerpt = excerpt;
    }
    
    setLoading(true);
    
    try {
      if (post?.id) {
        // Update existing post
        await updateBlogPost(post.id, formData as BlogPost);
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      } else {
        // Create new post
        const newPost: BlogPost = {
          ...formData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        } as BlogPost;
        
        await createBlogPost(newPost);
        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{post?.id ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <BlogPostBasicFields 
            formData={formData as BlogPost} 
            onChange={handleInputChange}
            onTagsChange={handleTagsChange}
            onImageChange={handleImageChange}
          />
          
          <BlogPostContentFields 
            formData={formData as BlogPost}
            onChange={handleInputChange}
            onPublishToggle={handlePublishToggle}
          />
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={onCancel}
            type="button"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : (post?.id ? 'Update Post' : 'Create Post')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BlogPostForm;
