
import React from "react";
import DashboardStats from "./DashboardStats";
import RecentRequests from "./RecentRequests";
import BannerManagement from "./BannerManagement";
import BlogManagement from "./BlogManagement";
import NotificationPanel from "./NotificationPanel";
import DonorManagement from "./DonorManagement";
import OrganizationManagement from "./OrganizationManagement";
import StaffManagement from "./StaffManagement";
import VolunteerManagement from "./VolunteerManagement";
import CommunityPostManagement from "./CommunityPostManagement";
import AdsManagement from "./AdsManagement";
import AIManagement from "./AIManagement";
import PaymentGatewaySettings from "./PaymentGatewaySettings";
import DatabaseSettings from "./DatabaseSettings";
import SystemUpdatePanel from "./SystemUpdatePanel";
import ServicesManagement from "./ServicesManagement";
import AlgorithmDashboard from "./algorithm/AlgorithmDashboard";
import { Banner, BlogPost, Notification } from "@/types/apiTypes";
import AddonModules from "./system/AddonModules";
import MaintenanceMode from "./system/MaintenanceMode";
import TestEnvironment from "./system/TestEnvironment";
import AIConfiguration from "./system/AIConfiguration";
import EventsCampaignsAddon from "./system/events-campaigns/EventsCampaignsAddon";

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
  loading: boolean;
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
  loading
}: AdminContentProps) => {
  
  // Mock recent requests data for demonstration
  const mockRequests = [
    {
      id: 1,
      patientName: "John Doe",
      bloodType: "A+",
      hospital: "City Hospital",
      location: "Downtown",
      urgency: "Urgent",
      createdAt: new Date().toISOString(),
      status: "Pending"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      bloodType: "O-",
      hospital: "General Hospital",
      location: "Westside",
      urgency: "High",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      status: "Pending"
    },
    {
      id: 3,
      patientName: "Robert Brown",
      bloodType: "B+",
      hospital: "Memorial Hospital",
      location: "Eastside",
      urgency: "Normal",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      status: "Pending"
    }
  ];
  
  return (
    <div className="p-4 md:p-6 pb-16">
      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <DashboardStats stats={stats} loading={loading} />
          <RecentRequests requests={mockRequests} />
        </div>
      )}
      
      {/* Banners */}
      {activeTab === "banners" && (
        <BannerManagement banners={banners} setBanners={setBanners} />
      )}
      
      {/* Blog */}
      {activeTab === "blog" && (
        <BlogManagement blogPosts={blogPosts} setBlogPosts={setBlogPosts} />
      )}
      
      {/* Notifications */}
      {activeTab === "notifications" && (
        <NotificationPanel notification={notification} setNotification={setNotification} />
      )}
      
      {/* Donors */}
      {activeTab === "donors" && (
        <DonorManagement />
      )}
      
      {/* Organizations */}
      {activeTab === "organizations" && (
        <OrganizationManagement />
      )}
      
      {/* Staff */}
      {activeTab === "staff" && (
        <StaffManagement />
      )}
      
      {/* Volunteers */}
      {activeTab === "volunteers" && (
        <VolunteerManagement />
      )}
      
      {/* Community posts */}
      {activeTab === "community-posts" && (
        <CommunityPostManagement />
      )}
      
      {/* Advertisements */}
      {activeTab === "ads" && (
        <AdsManagement />
      )}
      
      {/* AI */}
      {activeTab === "ai" && (
        <AIManagement />
      )}
      
      {/* Payment */}
      {activeTab === "payment" && (
        <PaymentGatewaySettings />
      )}
      
      {/* Database */}
      {activeTab === "database" && (
        <DatabaseSettings />
      )}
      
      {/* System updates */}
      {activeTab === "system-updates" && (
        <SystemUpdatePanel />
      )}
      
      {/* Services */}
      {activeTab === "services" && (
        <ServicesManagement />
      )}
      
      {/* Algorithm */}
      {activeTab === "algorithm" && (
        <AlgorithmDashboard />
      )}

      {/* Addon modules */}
      {activeTab === "addons" && (
        <AddonModules />
      )}
      
      {/* Maintenance */}
      {activeTab === "maintenance" && (
        <MaintenanceMode />
      )}
      
      {/* Test Environment */}
      {activeTab === "test-environment" && (
        <TestEnvironment />
      )}
      
      {/* AI Configuration */}
      {activeTab === "ai-configuration" && (
        <AIConfiguration />
      )}
      
      {/* Events & Campaigns */}
      {activeTab === "events-campaigns" && (
        <EventsCampaignsAddon />
      )}
    </div>
  );
};

export default AdminContent;
