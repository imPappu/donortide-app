
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

// Validation functions

/**
 * Validates email format
 * @param email Email to validate
 * @returns True if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param password Password to validate
 * @returns True if password meets requirements, false otherwise
 */
export const isValidPassword = (password: string): boolean => {
  // Requires at least 8 characters
  return password.length >= 8;
};

/**
 * Validates name (not empty and at least 2 characters)
 * @param name Name to validate
 * @returns True if name is valid, false otherwise
 */
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};

/**
 * Validates roles array (must contain at least 'user')
 * @param roles Roles array to validate
 * @returns True if roles are valid, false otherwise
 */
export const isValidRoles = (roles: User['roles']): boolean => {
  return Array.isArray(roles) && roles.length > 0 && roles.includes('user');
};

/**
 * Validates complete user object
 * @param user User object to validate
 * @returns Object with validation result and error message if invalid
 */
export const validateUser = (user: Partial<User>): { isValid: boolean; error?: string } => {
  if (user.email && !isValidEmail(user.email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  if (user.name && !isValidName(user.name)) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (user.roles && !isValidRoles(user.roles)) {
    return { isValid: false, error: 'User must have at least the "user" role' };
  }
  
  return { isValid: true };
};

/**
 * Validates complete login credentials
 * @param email Email to validate
 * @param password Password to validate
 * @returns Object with validation result and error message if invalid
 */
export const validateLoginCredentials = (email: string, password: string): { isValid: boolean; error?: string } => {
  if (!email || !password) {
    return { isValid: false, error: 'Email and password are required' };
  }
  
  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  if (password.length < 1) {
    return { isValid: false, error: 'Password is required' };
  }
  
  return { isValid: true };
};

/**
 * Validates complete registration data
 * @param name Name to validate
 * @param email Email to validate
 * @param password Password to validate
 * @param roles Roles array to validate
 * @returns Object with validation result and error message if invalid
 */
export const validateRegistrationData = (
  name: string, 
  email: string, 
  password: string, 
  roles: User['roles'] = ['user']
): { isValid: boolean; error?: string } => {
  if (!name || !email || !password) {
    return { isValid: false, error: 'All fields are required' };
  }
  
  if (!isValidName(name)) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  if (!isValidPassword(password)) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }
  
  if (!isValidRoles(roles)) {
    return { isValid: false, error: 'User must have at least the "user" role' };
  }
  
  return { isValid: true };
};

/**
 * Validates verification code
 * @param code Verification code to validate
 * @returns True if code is valid, false otherwise
 */
export const isValidVerificationCode = (code: string): boolean => {
  // Verification code should be exactly 6 digits
  return /^\d{6}$/.test(code);
};
