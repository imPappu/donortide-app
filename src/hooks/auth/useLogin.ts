
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { User } from '@/types/auth';
import { DEMO_USERS } from '@/data/mockUsers';

export const useLogin = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        
        // Create a proper User object that matches the interface
        const userObject: User = {
          id: userWithoutPassword.id,
          email: userWithoutPassword.email,
          name: userWithoutPassword.name,
          role: userWithoutPassword.role,
          isVerified: userWithoutPassword.isVerified || false,
          createdAt: new Date().toISOString(),
          profileImage: userWithoutPassword.avatar,
          avatar: userWithoutPassword.avatar // For backward compatibility
        };
        
        setUser(userObject);
        localStorage.setItem('donor_tide_user', JSON.stringify(userObject));
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading
  };
};
