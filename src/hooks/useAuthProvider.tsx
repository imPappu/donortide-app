
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { User } from '@/types/auth';
import { DEMO_USERS } from '@/data/mockUsers';

export const useAuthProvider = () => {
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

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('donor_tide_user', JSON.stringify(userWithoutPassword));
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

  const register = async (name: string, email: string, password: string, role: User['role'] = 'user'): Promise<boolean> => {
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
      
      // In a real app, we would save to a database here
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        avatar: '',
        isVerified: false,
        role
      };
      
      setUser(newUser);
      localStorage.setItem('donor_tide_user', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: `Your account has been created as a ${role.replace('_', ' ')}`,
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('donor_tide_user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('donor_tide_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update error",
        description: "An error occurred while updating your profile",
        variant: "destructive",
      });
      return false;
    }
  };

  const verifyAccount = async (code: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would validate the code against one sent to the user
      if (code === '123456') {
        const updatedUser = { ...user, isVerified: true };
        setUser(updatedUser);
        localStorage.setItem('donor_tide_user', JSON.stringify(updatedUser));
        
        toast({
          title: "Account verified",
          description: "Your account has been verified successfully",
        });
        return true;
      } else {
        toast({
          title: "Verification failed",
          description: "Invalid verification code",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification error",
        description: "An error occurred during verification",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    verifyAccount
  };
};
