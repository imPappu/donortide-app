
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Trash, AlertTriangle, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/community";
import { getCommunityPosts, deleteCommunityPost, flagPostForReview } from "@/services/communityService";
import DBErrorAlert from "./DBErrorAlert";

const CommunityPostManagement = () => {
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Community Post Management</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Flagged Posts
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <DBErrorAlert 
            error={error} 
            severity="error" 
            onDismiss={() => setError(null)} 
            className="mb-4"
          />
        )}

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="Search posts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading && posts.length === 0 ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            {post.userAvatar ? (
                              <AvatarImage src={post.userAvatar} alt={post.userName} />
                            ) : (
                              <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                            )}
                          </Avatar>
                          <span className="font-medium">{post.userName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        {truncateContent(post.content)}
                      </TableCell>
                      <TableCell>{formatDate(post.timestamp)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{post.likes} likes</span>
                          <span>•</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewPost(post)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleOpenFlagDialog(post)}>
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No posts found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* View Post Dialog */}
        <Dialog open={viewPostDialog} onOpenChange={setViewPostDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>View Post</DialogTitle>
            </DialogHeader>
            {selectedPost && (
              <div className="py-4">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    {selectedPost.userAvatar ? (
                      <AvatarImage src={selectedPost.userAvatar} alt={selectedPost.userName} />
                    ) : (
                      <AvatarFallback>{selectedPost.userName.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedPost.userName}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(selectedPost.timestamp)}</p>
                  </div>
                </div>
                
                <div className="mb-4 whitespace-pre-wrap">{selectedPost.content}</div>
                
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPost.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between text-sm text-muted-foreground border-t pt-4">
                  <span>{selectedPost.likes} likes</span>
                  <span>{selectedPost.comments} comments</span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Flag Post Dialog */}
        <Dialog open={flagDialog} onOpenChange={setFlagDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Flag Post for Review</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-10 w-10 text-amber-500 mr-3" />
                <p>Please provide a reason for flagging this post</p>
              </div>
              
              <div className="space-y-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="flag-reason">Reason</Label>
                  <Textarea 
                    id="flag-reason" 
                    value={flagReason}
                    onChange={(e) => setFlagReason(e.target.value)}
                    placeholder="Why should this post be reviewed by moderators?"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setFlagDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleFlagPost}
                disabled={!flagReason.trim() || loading}
              >
                {loading ? "Processing..." : "Flag Post"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CommunityPostManagement;
