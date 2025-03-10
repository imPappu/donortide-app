
import { toast } from "@/hooks/use-toast";
import { User } from '@/types/auth';
import { DEMO_USERS } from '@/data/mockUsers';
import { validateLoginCredentials, validateRegistrationData } from '@/utils/authUtils';

// Utility function to handle API errors consistently
const handleApiError = (error: any, errorMessage: string) => {
  console.error(errorMessage, error);
  toast({
    title: "API Error",
    description: "Could not connect to the server. Using offline mode.",
    variant: "destructive",
  });
};

// Login user with provided credentials
export const loginUser = async (email: string, password: string): Promise<User | null> => {
  // Validate credentials first
  const validation = validateLoginCredentials(email, password);
  if (!validation.isValid) {
    toast({
      title: "Validation Error",
      description: validation.error || "Invalid login credentials",
      variant: "destructive",
    });
    return null;
  }

  try {
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      // Convert the readonly roles array to a mutable array
      const userWithMutableRoles = {
        ...userWithoutPassword,
        roles: [...userWithoutPassword.roles] // Create a mutable copy of the roles array
      };
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      return userWithMutableRoles;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return null;
    }
  } catch (error) {
    handleApiError(error, "Login error:");
    return null;
  }
};

// Register a new user
export const registerUser = async (
  name: string, 
  email: string, 
  password: string, 
  roles: User['roles'] = ['user']
): Promise<User | null> => {
  // Validate registration data first
  const validation = validateRegistrationData(name, email, password, roles);
  if (!validation.isValid) {
    toast({
      title: "Validation Error",
      description: validation.error || "Invalid registration data",
      variant: "destructive",
    });
    return null;
  }

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
      return null;
    }
    
    // Ensure user role is always included
    if (!roles.includes('user')) {
      roles.push('user');
    }
    
    // In a real app, we would save to a database here
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      avatar: '',
      isVerified: false,
      roles: roles,
      role: roles[0] // For backward compatibility
    };
    
    const roleNames = roles.map(r => r.replace('_', ' ')).join(', ');
    
    toast({
      title: "Registration successful",
      description: `Your account has been created with roles: ${roleNames}`,
    });
    return newUser;
  } catch (error) {
    handleApiError(error, "Registration error:");
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (user: User, data: Partial<User>): Promise<User | null> => {
  try {
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...user, ...data };
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
    return updatedUser;
  } catch (error) {
    handleApiError(error, "Profile update error:");
    return null;
  }
};

// Verify user account
export const verifyUserAccount = async (user: User, code: string): Promise<User | null> => {
  try {
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, we would validate the code against one sent to the user
    if (code === '123456') {
      const updatedUser = { ...user, isVerified: true };
      
      toast({
        title: "Account verified",
        description: "Your account has been verified successfully",
      });
      return updatedUser;
    } else {
      toast({
        title: "Verification failed",
        description: "Invalid verification code",
        variant: "destructive",
      });
      return null;
    }
  } catch (error) {
    handleApiError(error, "Verification error:");
    return null;
  }
};
