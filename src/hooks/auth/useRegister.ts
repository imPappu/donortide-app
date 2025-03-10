
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { User } from '@/types/auth';
import { DEMO_USERS } from '@/data/mockUsers';

export const useRegister = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (DEMO_USERS.some(u => u.email === email)) {
        toast({
          title: "Registration failed",
          description: "Email already in use",
          variant: "destructive",
        });
        return false;
      }
      
      // Create a user object that conforms to the User interface
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user',
        isVerified: false,
        createdAt: new Date().toISOString(),
        profileImage: '',
        avatar: '' // For backward compatibility
      };
      
      setUser(newUser);
      localStorage.setItem('donor_tide_user', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration error",
        description: "An error occurred during registration",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading
  };
};
