
import React from "react";
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

const ContentRouter = ({ activeTab }: { activeTab: string }) => {
  // Mock stats for the dashboard
  const mockStats = {
    totalUsers: 254,
    totalDonations: 89,
    totalRequests: 42,
    totalLocations: 15
  };
  
  switch (activeTab) {
    case "dashboard":
      return <DashboardContent stats={mockStats} loading={false} />;
    case "users":
      return <UserManagement />;
    case "roles":
      return <RoleManagement />;
    case "blood-requests":
      return <BloodRequestsManagement />;
    case "donors":
      return <DonorsManagement />;
    case "database":
      return <DatabaseSettings />;
    case "payment":
      return <PaymentGatewaySettings />;
    case "app-settings":
      return <AppSettingsForm />;
    case "app-branding":
      return <AppBrandingForm />;
    case "splash-screen":
      return <SplashScreenSettings />;
    case "map-configuration":
      return <MapApiConfiguration />;
    case "email-templates":
      return <EmailTemplatesManagement />;
    case "social-media-ads":
      return <SocialMediaAdsConfiguration />;
    default:
      return <div>Select a tab</div>;
  }
};

export default ContentRouter;
