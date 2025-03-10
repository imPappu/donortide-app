
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
  removeUserFromStorage 
} from '@/utils/authUtils';

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
    setIsLoading(true);
    try {
      const authenticatedUser = await loginUser(email, password);
      
      if (authenticatedUser) {
        setUser(authenticatedUser);
        saveUserToStorage(authenticatedUser);
        return true;
      }
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
    setIsLoading(true);
    try {
      const newUser = await registerUser(name, email, password, roles);
      
      if (newUser) {
        setUser(newUser);
        saveUserToStorage(newUser);
        return true;
      }
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
    
    const updatedUser = await updateUserProfile(user, data);
    if (updatedUser) {
      setUser(updatedUser);
      saveUserToStorage(updatedUser);
      return true;
    }
    return false;
  };

  const verifyAccount = async (code: string): Promise<boolean> => {
    if (!user) return false;
    
    const verifiedUser = await verifyUserAccount(user, code);
    if (verifiedUser) {
      setUser(verifiedUser);
      saveUserToStorage(verifiedUser);
      return true;
    }
    return false;
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
