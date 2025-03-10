
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
  isVerified: boolean;
  profileImage?: string;
}
