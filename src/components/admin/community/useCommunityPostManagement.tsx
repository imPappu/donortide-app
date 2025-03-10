
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/community";
import { getCommunityPosts, deleteCommunityPost, flagPostForReview } from "@/services";

export const useCommunityPostManagement = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dialog states
  const [viewPostDialog, setViewPostDialog] = useState(false);
  const [flagDialog, setFlagDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [flagReason, setFlagReason] = useState("");

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCommunityPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      setError("Failed to load community posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter posts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = posts.filter(
      post => 
        post.userName.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
    );
    
    setFilteredPosts(results);
  }, [searchQuery, posts]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Truncate content for table display
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  // Open view post dialog
  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setViewPostDialog(true);
  };

  // Open flag post dialog
  const handleOpenFlagDialog = (post: Post) => {
    setSelectedPost(post);
    setFlagReason("");
    setFlagDialog(true);
  };

  // Handle flag post submission
  const handleFlagPost = async () => {
    if (!selectedPost || !flagReason.trim()) return;
    
    setLoading(true);
    try {
      await flagPostForReview(selectedPost.id, flagReason);
      toast({
        title: "Success",
        description: "Post has been flagged for review",
      });
      setFlagDialog(false);
    } catch (err) {
      setError("Failed to flag post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle post deletion
  const handleDeletePost = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setLoading(true);
      setError(null);
      try {
        await deleteCommunityPost(id);
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        setFilteredPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
      } catch (err) {
        setError("Failed to delete post. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    posts: filteredPosts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    setError,
    viewPostDialog,
    setViewPostDialog,
    flagDialog,
    setFlagDialog,
    selectedPost,
    flagReason,
    setFlagReason,
    handleViewPost,
    handleOpenFlagDialog,
    handleFlagPost,
    handleDeletePost,
    formatDate,
    truncateContent
  };
};
