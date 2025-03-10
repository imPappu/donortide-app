
import { toast } from "@/hooks/use-toast";
import { User } from '@/types/auth';

export const useProfileManagement = (
  user: User | null, 
  setUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
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
    updateProfile,
    verifyAccount
  };
};
