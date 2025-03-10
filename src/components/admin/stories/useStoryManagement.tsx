
import { useState, useEffect, useMemo } from "react";
import { Story } from "@/types/community";
import { toast } from "@/hooks/use-toast";
import { deleteStory } from "@/services";

// Simulated fetch function for stories - in a real app, this would come from the API
const fetchStories = async (): Promise<Story[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data - in a real app, this would be fetched from the backend
  return [
    {
      id: "story1",
      userName: "John Doe",
      userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "My first blood donation experience",
      videoUrl: "https://player.vimeo.com/progressive_redirect/playback/747200508/rendition/360p/file.mp4?loc=external",
      likes: 24,
      comments: 3,
      shares: 2,
      timestamp: "2 hours ago",
      liked: false,
      type: 'story',
      duration: 15,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "story2",
      userName: "Jane Smith",
      userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Helping at the blood drive today!",
      videoUrl: "https://player.vimeo.com/progressive_redirect/playback/733774855/rendition/360p/file.mp4?loc=external",
      likes: 42,
      comments: 7,
      shares: 5,
      timestamp: "4 hours ago",
      liked: false,
      type: 'story',
      duration: 12,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "story3",
      userName: "Mike Johnson",
      userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
      content: "Just donated blood for the 10th time! Feeling great about helping others.",
      videoUrl: "https://player.vimeo.com/progressive_redirect/playback/747200508/rendition/360p/file.mp4?loc=external",
      likes: 18,
      comments: 2,
      shares: 1,
      timestamp: "8 hours ago",
      liked: false,
      type: 'story',
      duration: 10,
      expiresAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Expired story
    },
  ];
};

export const useStoryManagement = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("");
  
  const loadStories = async () => {
    try {
      setIsLoading(true);
      const data = await fetchStories();
      setStories(data);
    } catch (error) {
      console.error("Error loading stories:", error);
      toast({
        title: "Error",
        description: "Failed to load stories. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadStories();
  }, []);
  
  const filteredStories = useMemo(() => {
    let filtered = [...stories];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        story => 
          story.userName.toLowerCase().includes(query) ||
          story.content.toLowerCase().includes(query)
      );
    }
    
    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(story => {
        const storyDate = new Date(story.timestamp);
        return (
          storyDate.getFullYear() === filterDate.getFullYear() &&
          storyDate.getMonth() === filterDate.getMonth() &&
          storyDate.getDate() === filterDate.getDate()
        );
      });
    }
    
    return filtered;
  }, [stories, searchQuery, dateFilter]);
  
  const handleDeleteStory = async (storyId: string) => {
    try {
      await deleteStory(storyId);
      
      // Update local state
      setStories(stories.filter(story => story.id !== storyId));
      
      // Close dialog and show success message
      setIsDeleteDialogOpen(false);
      toast({
        title: "Story deleted",
        description: "The story has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting story:", error);
      toast({
        title: "Error",
        description: "Failed to delete story. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleUpdateStory = async (storyId: string, updates: Partial<Story>) => {
    try {
      // In a real app, this would be an API call
      // await updateStory(storyId, updates);
      
      // Update local state
      setStories(stories.map(story => 
        story.id === storyId ? { ...story, ...updates } : story
      ));
      
      // Close dialog and show success message
      setIsEditDialogOpen(false);
      toast({
        title: "Story updated",
        description: "The story has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating story:", error);
      toast({
        title: "Error",
        description: "Failed to update story. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return {
    stories,
    filteredStories,
    searchQuery,
    setSearchQuery,
    selectedStory,
    setSelectedStory,
    isViewDialogOpen,
    setIsViewDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteStory,
    handleUpdateStory,
    dateFilter,
    setDateFilter,
    isLoading,
    totalStories: stories.length,
    refreshStories: loadStories,
  };
};
