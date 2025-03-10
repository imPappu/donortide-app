
export interface Comment {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
  commentData?: Comment[];
}
