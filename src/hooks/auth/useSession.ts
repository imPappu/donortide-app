
import { useEffect, useState } from 'react';
import { User } from '@/types/auth';
import { toast } from "@/hooks/use-toast";

export const useSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('donor_tide_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem('donor_tide_user');
      }
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('donor_tide_user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return {
    user,
    setUser,
    isLoading,
    logout,
    isAuthenticated: !!user
  };
};
