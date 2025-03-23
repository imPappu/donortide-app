import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import TopNavbar from '@/components/TopNavbar';
import { Card } from '@/components/ui/card';
import NewPostForm from '@/components/community/post-form/NewPostForm';
import { useAuth } from '@/components/auth/AuthContext';
import { MessageCircle } from 'lucide-react';
import { Post, Story } from '@/types/community';
import { TRENDING_TAGS } from '@/data/mockPosts';
import StoriesSection from '@/components/community/stories/StoriesSection';
import TrendingTags from '@/components/community/TrendingTags';
import FollowedTags from '@/components/community/feed/FollowedTags';
import FilterSection from '@/components/community/layout/FilterSection';
import PostList from '@/components/community/feed/PostList';

// Mock data for initial posts
const initialPosts: Post[] = [
  {
    id: '1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://i.pravatar.cc/150?u=sarah',
    content: 'Just donated blood for the first time today! Feeling great knowing I helped save lives. #FirstTimeDonor #BloodDonation',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    likes: 24,
    comments: 5,
    shares: 2,
    tags: ['FirstTimeDonor', 'BloodDonation'],
    imageUrl: undefined,
    liked: false,
    type: 'text',
  },
  {
    id: '2',
    userName: 'Medical Center',
    userAvatar: 'https://i.pravatar.cc/150?u=hospital',
    content: 'URGENT: We need O negative blood donors! Please come to any of our centers today if you can help. #UrgentNeed #ONegative #BloodDrive',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    likes: 56,
    comments: 12,
    shares: 45,
    tags: ['UrgentNeed', 'ONegative', 'BloodDrive'],
    imageUrl: 'https://placehold.co/600x400/red/white?text=Blood+Drive',
    liked: false,
    type: 'image',
  }
];

// Mock data for stories
const initialStories: Story[] = [
  {
    id: '1',
    userName: 'Sarah',
    userAvatar: 'https://i.pravatar.cc/150?u=sarah',
    content: 'Donating blood today!',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    likes: 0,
    comments: 0,
    shares: 0,
    liked: false,
    type: 'story',
    videoUrl: 'https://placehold.co/600x1200/red/white?text=Blood+Donation',
    duration: 15,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    userName: 'Medical Center',
    userAvatar: 'https://i.pravatar.cc/150?u=hospital',
    content: 'Our latest blood drive event',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    likes: 0,
    comments: 0,
    shares: 0,
    liked: false,
    type: 'story',
    videoUrl: 'https://placehold.co/600x1200/blue/white?text=Blood+Drive',
    duration: 15,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }
];

const CommunityFeed = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [followedTags, setFollowedTags] = useState<string[]>(['BloodDonation', 'DonorHeroes']);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [stories, setStories] = useState<Story[]>(initialStories);

  // Filter posts based on active tag and search query
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = !activeTag || post.tags?.includes(activeTag);
    
    return matchesSearch && matchesTag;
  });

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
  };

  const clearTagFilter = () => {
    setActiveTag(null);
  };

  const toggleFollowTag = (tag: string) => {
    if (followedTags.includes(tag)) {
      setFollowedTags(followedTags.filter(t => t !== tag));
    } else {
      setFollowedTags([...followedTags, tag]);
    }
  };

  const handleAddStory = (storyData: Omit<Story, 'id' | 'timestamp'>) => {
    const newStory: Story = {
      id: Date.now().toString(),
      ...storyData,
      timestamp: new Date().toISOString(),
    };
    setStories([newStory, ...stories]);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleEditPost = (updatedPost: Post) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Community Feed" showSearchBar={true} onSearch={setSearchQuery} />
      
      <div className="container mx-auto px-4 py-6 pb-20 max-w-md">
        <div className="flex items-center space-x-2 mb-4">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Community Feed</h1>
        </div>
        
        <StoriesSection 
          stories={stories} 
          onAddStory={handleAddStory} 
        />
        
        <FilterSection 
          activeTag={activeTag} 
          clearTagFilter={clearTagFilter}
          followedTags={followedTags}
          toggleFollowTag={toggleFollowTag}
        />
        
        <NewPostForm />
        
        <div className="mb-4">
          <TrendingTags 
            tags={TRENDING_TAGS} 
            onTagClick={handleTagClick} 
          />
        </div>
        
        <FollowedTags 
          followedTags={followedTags}
          handleTagClick={handleTagClick}
          toggleFollowTag={toggleFollowTag}
        />
        
        <PostList 
          posts={filteredPosts} 
          onTagClick={handleTagClick} 
          onDeletePost={handleDeletePost}
          onEditPost={handleEditPost}
        />
      </div>
      
      <Navigation />
    </div>
  );
};

export default CommunityFeed;
