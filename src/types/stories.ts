
export interface Story {
  id: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  imageUrl?: string;
  category: 'donor' | 'recipient' | 'volunteer';
  badges?: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isVerified?: boolean;
}
