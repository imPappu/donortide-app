
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import DashboardStats from "@/components/admin/DashboardStats";
import BannerManagement from "@/components/admin/BannerManagement";
import BlogManagement from "@/components/admin/BlogManagement";
import PushNotificationCenter from "@/components/admin/PushNotificationCenter";
import PaymentGatewaySettings from "@/components/admin/PaymentGatewaySettings";
import AppSettingsForm from "@/components/admin/AppSettingsForm";
import SplashScreenSettings from "@/components/admin/SplashScreenSettings";
import AppBrandingForm from "@/components/admin/AppBrandingForm";
import DatabaseSettings from "@/components/admin/DatabaseSettings";
import StaffManagement from "@/components/admin/StaffManagement";
import VolunteerManagement from "@/components/admin/VolunteerManagement";
import AmbulanceManagement from "@/components/admin/AmbulanceManagement";
import DonorManagement from "@/components/admin/DonorManagement";
import OrganizationManagement from "@/components/admin/OrganizationManagement";
import CommunityPostManagement from "@/components/admin/CommunityPostManagement";
import FirebasePushComponent from "@/components/admin/FirebasePushComponent";
import AdsManagement from "@/components/admin/AdsManagement";
import { Banner, BlogPost, Notification } from "@/types/apiTypes";

interface AdminContentProps {
  activeTab: string;
  stats: {
    totalUsers: number;
    totalDonations: number;
    totalRequests: number;
    totalLocations: number;
  };
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  notification: Partial<Notification>;
  setNotification: React.Dispatch<React.SetStateAction<Partial<Notification>>>;
}

const AdminContent = ({ 
  activeTab, 
  stats, 
  banners, 
  setBanners, 
  blogPosts, 
  setBlogPosts,
  notification,
  setNotification 
}: AdminContentProps) => {
  return (
    <main className="p-4 md:p-6">
      {activeTab === "dashboard" && <DashboardStats stats={stats} />}
      
      {activeTab === "banners" && <BannerManagement banners={banners} setBanners={setBanners} />}
      
      {activeTab === "blog" && <BlogManagement blogPosts={blogPosts} setBlogPosts={setBlogPosts} />}
      
      {activeTab === "staff" && <StaffManagement />}
      
      {activeTab === "donors" && <DonorManagement />}
      
      {activeTab === "volunteers" && <VolunteerManagement />}
      
      {activeTab === "organizations" && <OrganizationManagement />}
      
      {activeTab === "community" && <CommunityPostManagement />}
      
      {activeTab === "ambulances" && <AmbulanceManagement />}
      
      {activeTab === "push-notifications" && <FirebasePushComponent />}
      
      {activeTab === "ads" && <AdsManagement />}
      
      {activeTab === "app-branding" && <AppBrandingForm />}
      
      {activeTab === "database" && <DatabaseSettings />}
      
      {activeTab === "notifications" && (
        <PushNotificationCenter 
          notification={notification} 
          setNotification={setNotification} 
        />
      )}
      
      {activeTab === "payment" && <PaymentGatewaySettings />}
      
      {activeTab === "app-settings" && (
        <Card>
          <CardContent className="pt-6">
            <AppSettingsForm />
          </CardContent>
        </Card>
      )}
      
      {activeTab === "splash-screen" && <SplashScreenSettings />}
    </main>
  );
};

export default AdminContent;
