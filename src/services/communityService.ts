
import { API_BASE_URL } from './apiConfig';
import { Post, Story } from "@/types/community";
import { MOCK_POSTS } from "@/data/mockPosts";

// Get all community posts
export const getCommunityPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch community posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching community posts:', error);
    // Return mock data for development
    return MOCK_POSTS;
  }
};

// Get post by ID
export const getCommunityPostById = async (id: string): Promise<Post> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    // Return mock data
    const post = MOCK_POSTS.find(p => p.id === id);
    if (!post) throw new Error('Post not found');
    return post;
  }
};

// Create new post
export const createCommunityPost = async (data: Omit<Post, 'id' | 'timestamp'>): Promise<Post> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    // For development, simulate a successful creation
    return {
      ...data,
      id: `new-${Date.now()}`,
      timestamp: new Date().toISOString(),
      comments: 0
    } as Post;
  }
};

// Update post
export const updateCommunityPost = async (id: string, data: Partial<Post>): Promise<Post> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating post:', error);
    // For development, simulate a successful update
    const existingPost = MOCK_POSTS.find(p => p.id === id);
    if (!existingPost) throw new Error('Post not found');
    return {
      ...existingPost,
      ...data,
    };
  }
};

// Delete post
export const deleteCommunityPost = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    // For development, assume success
    return true;
  }
};

// Flag post for review
export const flagPostForReview = async (id: string, reason: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/posts/${id}/flag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason }),
    });
    if (!response.ok) {
      throw new Error('Failed to flag post');
    }
    return true;
  } catch (error) {
    console.error('Error flagging post:', error);
    // For development, assume success
    return true;
  }
};

// Create a new story
export const createStory = async (data: Omit<Story, 'id' | 'timestamp'>): Promise<Story> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/stories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create story');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating story:', error);
    // For development, simulate a successful creation
    return {
      ...data,
      id: `story-${Date.now()}`,
      timestamp: 'Just now',
    } as Story;
  }
};

// Get all stories
export const getStories = async (): Promise<Story[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/stories`);
    if (!response.ok) {
      throw new Error('Failed to fetch stories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stories:', error);
    // For development, return mock stories
    return [];
  }
};

// Delete a story
export const deleteStory = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/community/stories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete story');
    }
    return true;
  } catch (error) {
    console.error('Error deleting story:', error);
    // For development, assume success
    return true;
  }
};
