
import { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { 
  loginUser, 
  registerUser, 
  updateUserProfile, 
  verifyUserAccount 
} from '@/services/userAuthService';
import { 
  saveUserToStorage, 
  loadUserFromStorage, 
  removeUserFromStorage,
  validateLoginCredentials,
  validateRegistrationData 
} from '@/utils/authUtils';
import { toast } from "@/hooks/use-toast";

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = loadUserFromStorage();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Validate input before proceeding
    const validation = validateLoginCredentials(email, password);
    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.error,
        variant: "destructive",
      });
      return false;
    }
    
    setIsLoading(true);
    try {
      const authenticatedUser = await loginUser(email, password);
      
      if (authenticatedUser) {
        setUser(authenticatedUser);
        saveUserToStorage(authenticatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred during login",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    roles: User['roles'] = ['user']
  ): Promise<boolean> => {
    // Validate registration data
    const validation = validateRegistrationData(name, email, password, roles);
    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.error,
        variant: "destructive",
      });
      return false;
    }
    
    setIsLoading(true);
    try {
      const newUser = await registerUser(name, email, password, roles);
      
      if (newUser) {
        setUser(newUser);
        saveUserToStorage(newUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration error",
        description: "An unexpected error occurred during registration",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    removeUserFromStorage();
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedUser = await updateUserProfile(user, data);
      if (updatedUser) {
        setUser(updatedUser);
        saveUserToStorage(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update error",
        description: "An unexpected error occurred during profile update",
        variant: "destructive",
      });
      return false;
    }
  };

  const verifyAccount = async (code: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const verifiedUser = await verifyUserAccount(user, code);
      if (verifiedUser) {
        setUser(verifiedUser);
        saveUserToStorage(verifiedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification error",
        description: "An unexpected error occurred during verification",
        variant: "destructive",
      });
      return false;
    }
  };

  // Check if user has admin role
  const isAdmin = (): boolean => {
    return user?.roles?.includes('admin') || false;
  };

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: isAdmin(),
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    verifyAccount
  };
};
