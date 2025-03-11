import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BlogPost } from "@/types/apiTypes";
import { getBlogPosts, deleteBlogPost } from "@/services/blogService";
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const BlogManagement = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching blog posts from an API
    setTimeout(() => {
      // Updated to match BlogPost type
      const mockData = [
        {
          id: "1",
          title: "The Importance of Regular Blood Donation",
          content: "<p>Regular blood donation is vital for maintaining adequate supplies for patients in need...</p>",
          excerpt: "Learn why regular blood donation is important and how it helps save lives.",
          author: "Dr. Jane Smith",
          imageUrl: "/placeholder.svg",
          tags: ["health", "donation", "blood"],
          category: "Health",
          publishDate: "2023-05-15T00:00:00Z",
          isPublished: true,
          createdAt: "2023-05-10T00:00:00Z",
          updatedAt: "2023-05-10T00:00:00Z"
        },
        {
          id: "2",
          title: "Blood Types Explained",
          content: "<p>Understanding blood types is essential for effective blood donation and transfusion...</p>",
          excerpt: "A comprehensive guide to understanding different blood types and compatibility.",
          author: "Dr. Michael Johnson",
          imageUrl: "/placeholder.svg",
          tags: ["education", "blood-types", "science"],
          category: "Education",
          publishDate: "2023-06-01T00:00:00Z",
          isPublished: true,
          createdAt: "2023-05-25T00:00:00Z",
          updatedAt: "2023-05-25T00:00:00Z"
        },
        {
          id: "3",
          title: "Preparing for Your First Blood Donation",
          content: "<p>If you're considering donating blood for the first time, here's what you need to know...</p>",
          excerpt: "Tips and guidance for first-time blood donors to ensure a positive experience.",
          author: "Sarah Williams",
          imageUrl: "/placeholder.svg",
          tags: ["first-time", "preparation", "tips"],
          category: "Guides",
          publishDate: "2023-06-15T00:00:00Z",
          isPublished: false,
          createdAt: "2023-06-10T00:00:00Z",
          updatedAt: "2023-06-10T00:00:00Z"
        }
      ];

      setPosts(mockData);
      setFilteredPosts(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      (post.category || '').toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handlePreviewPost = (post: BlogPost) => {
    // Implement preview logic here
    toast({
      title: "Preview Blog Post",
      description: `Previewing "${post.title}"`,
    });
  };

  const handleEditPost = (post: BlogPost) => {
    // Implement edit logic here
    toast({
      title: "Edit Blog Post",
      description: `Editing "${post.title}"`,
    });
  };

  const handleDeletePost = async (postId: string) => {
    try {
      // Simulate deleting a blog post
      await deleteBlogPost(postId);
      // Update the state to remove the deleted post
      setPosts(posts.filter(post => post.id !== postId));
      setFilteredPosts(filteredPosts.filter(post => post.id !== postId));
      toast({
        title: "Blog Post Deleted",
        description: "The blog post has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Error",
        description: "Failed to delete the blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Blog Posts Management</CardTitle>
          <Link to="/admin/blog/new">
            <Button>
              Create New
            </Button>
          </Link>
        </div>
        <CardDescription>Manage and edit your blog posts</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <Input type="search" placeholder="Search blog posts..." value={searchQuery} onChange={handleSearch} />
          
          {isLoading ? (
            <div className="text-center py-4">Loading blog posts...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.category || 'Uncategorized'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${post.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {post.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(post.publishDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handlePreviewPost(post)} title="Preview Blog Post">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditPost(post)} title="Edit Blog Post">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)} title="Delete Blog Post">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogManagement;
