
import { toast } from "@/hooks/use-toast";
import { User } from '@/types/auth';
import { DEMO_USERS } from '@/data/mockUsers';

// Login user with provided credentials
export const loginUser = async (email: string, password: string): Promise<User | null> => {
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
    console.error("Login error:", error);
    toast({
      title: "Login error",
      description: "An error occurred during login",
      variant: "destructive",
    });
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
    console.error("Registration error:", error);
    toast({
      title: "Registration error",
      description: "An error occurred during registration",
      variant: "destructive",
    });
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
    console.error("Profile update error:", error);
    toast({
      title: "Update error",
      description: "An error occurred while updating your profile",
      variant: "destructive",
    });
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
    console.error("Verification error:", error);
    toast({
      title: "Verification error",
      description: "An error occurred during verification",
      variant: "destructive",
    });
    return null;
  }
};
