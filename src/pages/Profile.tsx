
import React, { useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Import the extracted components
import ProfileHeader from "@/components/profile/ProfileHeader";
import DonationHistory from "@/components/profile/DonationHistory";
import Achievements from "@/components/profile/Achievements";
import VerificationTab from "@/components/profile/VerificationTab";
import SettingsTab from "@/components/profile/SettingsTab";

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated && !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to view your profile",
      });
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);
  
  const userData = user || {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "",
    isVerified: false
  };
  
  const handleAvatarChange = async (imageUrl: string) => {
    if (user) {
      await updateProfile({ avatar: imageUrl });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <ProfileHeader userData={userData} handleAvatarChange={handleAvatarChange} />
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="history">
            <TabsList className="w-full">
              <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
              <TabsTrigger value="achievements" className="flex-1">Achievements</TabsTrigger>
              <TabsTrigger value="verify" className="flex-1">Verify</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="history">
                <DonationHistory />
              </TabsContent>
              <TabsContent value="achievements">
                <Achievements />
              </TabsContent>
              <TabsContent value="verify">
                <VerificationTab />
              </TabsContent>
              <TabsContent value="settings">
                <SettingsTab />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t flex justify-center py-4">
          <p className="text-sm text-muted-foreground">Last donation: 4 months ago • Eligible to donate</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
