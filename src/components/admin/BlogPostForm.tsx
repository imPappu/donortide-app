import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPost } from "@/types/apiTypes";
import { createBlogPost, updateBlogPost } from "@/services/blogService";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPostBasicFields } from "./blog/BlogPostBasicFields";
import { BlogPostContentFields } from "./blog/BlogPostContentFields";

interface BlogPostFormProps {
  post?: BlogPost;
  onClose: () => void;
  onSuccess: () => void;
}

const BlogPostForm = ({ post, onClose, onSuccess }: BlogPostFormProps) => {
  const [isNew, setIsNew] = useState(!post);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    imageUrl: '',
    tags: [],
    category: '',
    publishDate: new Date().toISOString(),
    isPublished: false,
    ...post,
  });

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isNew) {
        await createBlogPost(form as BlogPost);
        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
      } else {
        await updateBlogPost(post!.id, form as BlogPost);
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting blog post:", error);
      toast({
        title: "Error",
        description: "Failed to submit blog post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isNew ? "Create New Blog Post" : "Edit Blog Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <BlogPostBasicFields post={form} onChange={handleChange} />
          </TabsContent>
          <TabsContent value="content">
            <BlogPostContentFields post={form} onChange={handleChange} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostForm;
