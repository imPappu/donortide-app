
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
import AIManagement from "@/components/admin/AIManagement";
import { Banner, BlogPost, Notification } from "@/types/apiTypes";
import { Skeleton } from "@/components/ui/skeleton";
import AlgorithmDashboard from "./algorithm/AlgorithmDashboard";
import SystemUpdatePanel from "./SystemUpdatePanel";
import TestEnvironment from "./system/TestEnvironment";
import MaintenanceMode from "./system/MaintenanceMode";
import AddonModules from "./system/AddonModules";
import AIConfiguration from "./system/AIConfiguration";

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
  loading?: boolean;
}

const AdminContent = ({ 
  activeTab, 
  stats, 
  banners, 
  setBanners, 
  blogPosts, 
  setBlogPosts,
  notification,
  setNotification,
  loading = false
}: AdminContentProps) => {
  // Loading skeleton for dashboard stats
  if (loading && activeTab === "dashboard") {
    return (
      <main className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <div className="mt-3">
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <Skeleton className="h-[320px] w-full rounded-md" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <Skeleton className="h-[320px] w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <div className="p-6">
      {/* Dashboard and Analytics */}
      {activeTab === "dashboard" && (
        <DashboardStats stats={stats} />
      )}
      
      {activeTab === "algorithm" && (
        <AlgorithmDashboard />
      )}
      
      {/* Content Management */}
      {activeTab === "banners" && <BannerManagement banners={banners} setBanners={setBanners} />}
      
      {activeTab === "blog" && <BlogManagement blogPosts={blogPosts} setBlogPosts={setBlogPosts} />}
      
      {activeTab === "community" && <CommunityPostManagement />}
      
      {/* User Management */}
      {activeTab === "staff" && <StaffManagement />}
      
      {activeTab === "donors" && <DonorManagement />}
      
      {activeTab === "volunteers" && <VolunteerManagement />}
      
      {/* Organization Management */}
      {activeTab === "organizations" && <OrganizationManagement />}
      
      {activeTab === "ambulances" && <AmbulanceManagement />}
      
      {/* Marketing & Notifications */}
      {activeTab === "push-notifications" && <FirebasePushComponent />}
      
      {activeTab === "notifications" && (
        <PushNotificationCenter 
          notification={notification} 
          setNotification={setNotification} 
        />
      )}
      
      {activeTab === "ads" && <AdsManagement />}
      
      {/* System & AI */}
      {activeTab === "system-updates" && <SystemUpdatePanel />}
      
      {activeTab === "addons" && <AddonModules />}
      
      {activeTab === "ai-config" && <AIConfiguration />}
      
      {activeTab === "test-mode" && <TestEnvironment />}
      
      {activeTab === "maintenance" && <MaintenanceMode />}
      
      {/* Settings */}
      {activeTab === "app-branding" && <AppBrandingForm />}
      
      {activeTab === "database" && <DatabaseSettings />}
      
      {activeTab === "payment" && <PaymentGatewaySettings />}
      
      {activeTab === "app-settings" && (
        <Card>
          <CardContent className="pt-6">
            <AppSettingsForm />
          </CardContent>
        </Card>
      )}
      
      {activeTab === "splash-screen" && <SplashScreenSettings />}
    </div>
  );
};

export default AdminContent;
