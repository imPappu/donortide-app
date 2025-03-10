
import { User } from '@/types/auth';
import { toast } from "@/hooks/use-toast";

// Save user to localStorage
export const saveUserToStorage = (user: User): void => {
  localStorage.setItem('donor_tide_user', JSON.stringify(user));
};

// Load user from localStorage
export const loadUserFromStorage = (): User | null => {
  const savedUser = localStorage.getItem('donor_tide_user');
  if (savedUser) {
    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Failed to parse saved user:", error);
      localStorage.removeItem('donor_tide_user');
    }
  }
  return null;
};

// Remove user from localStorage
export const removeUserFromStorage = (): void => {
  localStorage.removeItem('donor_tide_user');
  toast({
    title: "Logged out",
    description: "You have been logged out successfully",
  });
};
