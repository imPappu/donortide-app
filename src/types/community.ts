
export interface Comment {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVoted?: string; // ID of the option the user voted for
}

export interface Tag {
  id: string;
  name: string;
  count: number;
  trending?: boolean;
}

export interface Post {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
  commentData?: Comment[];
  poll?: Poll;
  type: 'text' | 'image' | 'poll' | 'story' | 'video';
  tags?: string[]; // Array of tag names
  duration?: number; // Duration in seconds for video content
  expiresAt?: string; // Expiry timestamp for stories
}

export interface Story extends Post {
  type: 'story';
  videoUrl: string;
  duration: number; // Duration in seconds
  expiresAt: string; // When the story expires
}
