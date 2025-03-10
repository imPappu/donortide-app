
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isVerified: boolean;
  role: 'user' | 'admin' | 'donor' | 'service_provider' | 'volunteer' | 'organization';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: User['role']) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  verifyAccount: (code: string) => Promise<boolean>;
}
