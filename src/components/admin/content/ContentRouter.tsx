import React, { useState } from "react";
import DashboardContent from "./DashboardContent";
import UserManagement from "../UserManagement";
import RoleManagement from "../RoleManagement";
import BloodRequestsManagement from "../BloodRequestsManagement";
import DonorsManagement from "../DonorsManagement";
import Settings from "../AppSettings";
import PaymentGatewaySettings from "../PaymentGatewaySettings";
import DatabaseSettings from "../DatabaseSettings";
import AppSettingsForm from "../AppSettingsForm";
import AppBrandingForm from "../AppBrandingForm";
import SplashScreenSettings from "../SplashScreenSettings";
import MapApiConfiguration from "../MapApiConfiguration";
import EmailTemplatesManagement from "../EmailTemplatesManagement";
import SocialMediaAdsConfiguration from "../SocialMediaAdsConfiguration";
import AlgorithmContent from "./AlgorithmContent";
import StaffManagement from "../StaffManagement";
import ServicesManagement from "../ServicesManagement";
import OrganizationManagement from "../OrganizationManagement";
import BannerManagement from "../BannerManagement";
import BlogManagement from "../BlogManagement";
import CommunityPostManagement from "../CommunityPostManagement";
import StoryManagement from "../stories/StoryManagement";
import AIConfiguration from "../system/AIConfiguration";
import AddonModules from "../system/AddonModules";
import EventsCampaignsAddon from "../system/events-campaigns/EventsCampaignsAddon";
import MaintenanceMode from "../system/MaintenanceMode";
import TestEnvironment from "../system/TestEnvironment";
import SystemUpdatePanel from "../SystemUpdatePanel";
import FirebasePushComponent from "../FirebasePushComponent";
import NotificationPanel from "../NotificationPanel";
import AdsManagement from "../AdsManagement";
import VolunteerManagement from "../VolunteerManagement";
import InstallationGuide from "../system/InstallationGuide";
import UrgentRequests from "../UrgentRequests";
import MostDonatedItems from "../MostDonatedItems";
import NearbyVolunteers from "../NearbyVolunteers";
import TopConsultants from "../TopConsultants";
import { Notification } from "@/types/apiTypes";

const ContentRouter = ({ activeTab, stats, loading }: { 
  activeTab: string;
  stats?: {
    totalUsers: number;
    totalDonations: number;
    totalRequests: number;
    totalLocations: number;
  };
  loading?: boolean;
}) => {
  // State for notification panel
  const [notification, setNotification] = useState<Partial<Notification>>({
    title: '',
    message: '',
    targetType: 'all'
  });

  // Default message for tabs not implemented yet
  const NotImplementedTab = () => (
    <div className="p-6 text-center">
      <h3 className="text-lg font-medium text-muted-foreground">In Development</h3>
      <p className="text-sm text-muted-foreground mt-2">This feature is currently under development and will be available soon.</p>
    </div>
  );

  switch (activeTab) {
    // Dashboard section
    case "dashboard":
      return <DashboardContent stats={stats || {
        totalUsers: 254,
        totalDonations: 89,
        totalRequests: 42,
        totalLocations: 15
      }} loading={loading || false} />;
    case "algorithm":
      return <AlgorithmContent />;
    
    // Content section
    case "banners":
      return <BannerManagement />;
    case "blog":
      return <BlogManagement />;
    case "community":
      return <CommunityPostManagement />;
    case "stories":
      return <StoryManagement />;
    
    // Users section
    case "staff":
      return <StaffManagement />;
    case "donors":
      return <DonorsManagement />;
    case "volunteers":
      return <VolunteerManagement />;
    
    // Organizations & Services section
    case "organizations":
      return <OrganizationManagement />;
    case "services":
      return <ServicesManagement />;

    // Marketing section
    case "push-notifications":
      return <FirebasePushComponent />;
    case "notifications":
      return <NotificationPanel 
        notification={notification} 
        setNotification={setNotification} 
      />;
    case "ads":
      return <AdsManagement />;
    
    // System section
    case "system-updates":
      return <SystemUpdatePanel />;
    case "addons":
      return <AddonModules />;
    case "events-campaigns":
      return <EventsCampaignsAddon />;
    case "maintenance":
      return <MaintenanceMode />;
    case "test-environment":
      return <TestEnvironment />;
    case "ai-configuration":
      return <AIConfiguration />;
    case "installation-guide":
      return <InstallationGuide />;
    
    // Settings section
    case "app-branding":
      return <AppBrandingForm />;
    case "database":
      return <DatabaseSettings />;
    case "payment":
      return <PaymentGatewaySettings />;
    case "map-configuration":
      return <MapApiConfiguration />;
    case "email-templates":
      return <EmailTemplatesManagement />;
    case "social-media-ads":
      return <SocialMediaAdsConfiguration />;
    case "app-settings":
      return <Settings />;
    case "splash-screen":
      return <SplashScreenSettings />;
    
    // Legacy routes - keeping for compatibility
    case "users":
      return <UserManagement />;
    case "roles":
      return <RoleManagement />;
    case "blood-requests":
      return <BloodRequestsManagement />;
    case "app-settings-form":
      return <AppSettingsForm />;
    
    // New routes
    case "urgent-requests":
      return <UrgentRequests />;
    case "most-donated":
      return <MostDonatedItems />;
    case "nearby-volunteers":
      return <NearbyVolunteers />;
    case "top-consultants":
      return <TopConsultants />;
      
    default:
      return <div className="p-6 text-center">
        <h3 className="text-lg font-medium text-muted-foreground">Select a tab from the sidebar</h3>
        <p className="text-sm text-muted-foreground mt-2">This feature will be available soon.</p>
      </div>;
  }
};

export default ContentRouter;
