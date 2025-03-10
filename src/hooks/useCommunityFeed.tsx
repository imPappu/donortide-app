
import { useState, useEffect } from "react";
import { Post, Story } from "@/types/community";
import { MOCK_POSTS, TRENDING_TAGS } from "@/data/mockPosts";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import {
  getCommunityPosts,
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
  createStory,
  getStories,
  deleteStory
} from "@/services";

// Helper function to enhance mock posts with additional content types
const enhanceMockPosts = (posts: Post[]): Post[] => {
  return posts.map((post, index) => {
    if (index === 0) {
      return {
        ...post,
        type: 'poll' as const,
        poll: {
          question: "Which blood type is most needed right now?",
          options: [
            { id: "opt1", text: "O Negative", votes: 15 },
            { id: "opt2", text: "AB Positive", votes: 8 },
            { id: "opt3", text: "B Negative", votes: 5 },
            { id: "opt4", text: "A Positive", votes: 12 }
          ],
          totalVotes: 40
        }
      };
    }
    else if (index === 1) {
      return {
        ...post,
        type: 'image' as const,
        imageUrl: "https://images.unsplash.com/photo-1615461066211-d73c47996290?q=80&w=1000&auto=format&fit=crop"
      };
    }
    
    return { ...post, type: 'text' as const };
  });
};

// Sample stories data
const SAMPLE_STORIES: Story[] = [
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
  }
];

export function useCommunityFeed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [followedTags, setFollowedTags] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>(enhanceMockPosts(MOCK_POSTS));
  const [stories, setStories] = useState<Story[]>(SAMPLE_STORIES);
  
  // Filter posts based on search query and active tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = activeTag 
      ? post.tags?.includes(activeTag) 
      : true;
    
    return matchesSearch && matchesTag;
  });

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    toast({
      title: `Viewing #${tag}`,
      description: `Showing posts tagged with #${tag}`
    });
  };

  const clearTagFilter = () => {
    setActiveTag(null);
  };

  const toggleFollowTag = (tag: string) => {
    if (followedTags.includes(tag)) {
      setFollowedTags(followedTags.filter(t => t !== tag));
      toast({
        title: `Unfollowed #${tag}`,
        description: `You will no longer receive notifications for #${tag}`
      });
    } else {
      setFollowedTags([...followedTags, tag]);
      toast({
        title: `Following #${tag}`,
        description: `You will now receive notifications for #${tag}`
      });
    }
  };
  
  const handleAddStory = (storyData: Omit<Story, 'id' | 'timestamp'>) => {
    const newStory: Story = {
      ...storyData,
      id: uuidv4(),
      timestamp: "Just now",
    };
    
    setStories([newStory, ...stories]);
  };
  
  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };
  
  const handleEditPost = (post: Post) => {
    toast({
      title: "Edit post",
      description: "Post editing functionality coming soon",
    });
  };

  // Simulate receiving a tag notification
  useEffect(() => {
    if (followedTags.length > 0) {
      const randomIndex = Math.floor(Math.random() * followedTags.length);
      const randomTag = followedTags[randomIndex];
      
      const timeout = setTimeout(() => {
        toast({
          title: `New activity in #${randomTag}`,
          description: `There's new content related to #${randomTag}`
        });
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [followedTags]);

  return {
    searchQuery,
    setSearchQuery,
    activeTag,
    followedTags,
    filteredPosts,
    stories,
    handleTagClick,
    clearTagFilter,
    toggleFollowTag,
    handleAddStory,
    handleDeletePost,
    handleEditPost
  };
}
