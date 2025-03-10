
import { toast } from "@/hooks/use-toast";

/**
 * Custom hook for handling toast notifications throughout the application
 * Centralizes all toast message creation for consistent styling and wording
 */
export const useNotification = () => {
  // Authentication related notifications
  const notifyLoginSuccess = (name: string) => {
    toast({
      title: "Login successful",
      description: `Welcome back, ${name}!`,
    });
  };

  const notifyLoginError = (message: string = "Invalid email or password") => {
    toast({
      title: "Login failed",
      description: message,
      variant: "destructive",
    });
  };

  const notifyRegistrationSuccess = (roles: string[]) => {
    const roleNames = roles.map(r => r.replace('_', ' ')).join(', ');
    
    toast({
      title: "Registration successful",
      description: `Your account has been created with roles: ${roleNames}`,
    });
  };

  const notifyRegistrationError = (message: string = "An error occurred during registration") => {
    toast({
      title: "Registration failed",
      description: message,
      variant: "destructive",
    });
  };

  const notifyLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const notifyProfileUpdate = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  const notifyProfileUpdateError = (message: string = "An error occurred while updating your profile") => {
    toast({
      title: "Update error",
      description: message,
      variant: "destructive",
    });
  };

  const notifyVerificationSuccess = () => {
    toast({
      title: "Account verified",
      description: "Your account has been verified successfully",
    });
  };

  const notifyVerificationError = (message: string = "Invalid verification code") => {
    toast({
      title: "Verification failed",
      description: message,
      variant: "destructive",
    });
  };

  // Generic error notification
  const notifyError = (title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "destructive",
    });
  };

  // Generic success notification
  const notifySuccess = (title: string, message: string) => {
    toast({
      title,
      description: message,
    });
  };

  return {
    notifyLoginSuccess,
    notifyLoginError,
    notifyRegistrationSuccess,
    notifyRegistrationError,
    notifyLogout,
    notifyProfileUpdate,
    notifyProfileUpdateError,
    notifyVerificationSuccess,
    notifyVerificationError,
    notifyError,
    notifySuccess
  };
};
