
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateBlogPost, deleteBlogPost, createBlogPost, BlogPost } from "@/services/dbService";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { useToast } from '@/hooks/use-toast';

interface BlogManagementProps {
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const BlogManagement = ({ blogPosts, setBlogPosts }: BlogManagementProps) => {
  const { toast } = useToast();
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  const handleAddBlogPost = () => {
    setEditingBlogPost(null);
    setShowBlogForm(true);
  };

  const handleEditBlogPost = (post: BlogPost) => {
    setEditingBlogPost(post);
    setShowBlogForm(true);
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(id);
        setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting blog post:', error);
        toast({
          title: "Error",
          description: "Failed to delete blog post",
          variant: "destructive",
        });
      }
    }
  };

  const handleBlogSubmit = async (data: BlogPost) => {
    try {
      if (editingBlogPost?.id) {
        const updated = await updateBlogPost(editingBlogPost.id, data);
        if (updated) {
          setBlogPosts(prevPosts => 
            prevPosts.map(post => post.id === editingBlogPost.id ? updated : post)
          );
          toast({
            title: "Success",
            description: "Blog post updated successfully",
          });
        }
      } else {
        const newPost = await createBlogPost(data);
        if (newPost) {
          setBlogPosts(prevPosts => [newPost, ...prevPosts]);
          toast({
            title: "Success",
            description: "Blog post created successfully",
          });
        }
      }
      setShowBlogForm(false);
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Blog Management</CardTitle>
        <Button onClick={handleAddBlogPost}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Post
        </Button>
      </CardHeader>
      <CardContent>
        {showBlogForm ? (
          <BlogPostForm 
            initialData={editingBlogPost || undefined}
            onSubmit={handleBlogSubmit}
            onCancel={() => setShowBlogForm(false)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Title</th>
                  <th className="py-2 text-left">Author</th>
                  <th className="py-2 text-left">Category</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-left">Date</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.map((post) => (
                  <tr key={post.id} className="border-b">
                    <td className="py-2">{post.title}</td>
                    <td className="py-2">{post.author}</td>
                    <td className="py-2">{post.category || '-'}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-2">{new Date(post.publishedAt || post.createdAt || '').toLocaleDateString()}</td>
                    <td className="py-2 text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditBlogPost(post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteBlogPost(post.id!)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogManagement;
