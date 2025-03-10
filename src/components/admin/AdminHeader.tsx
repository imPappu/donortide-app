
import React from "react";

interface AdminHeaderProps {
  activeTab: string;
}

const AdminHeader = ({ activeTab }: AdminHeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 p-4">
      <div className="flex justify-between items-center">
        <div className="md:hidden">
          <h1 className="text-xl font-bold">Admin</h1>
        </div>
        <h2 className="text-xl font-semibold hidden md:block">
          {activeTab === "dashboard" && "Dashboard Overview"}
          {activeTab === "banners" && "Banner Management"}
          {activeTab === "blog" && "Blog Posts"}
          {activeTab === "staff" && "Staff Management"}
          {activeTab === "volunteers" && "Volunteer Management"}
          {activeTab === "ambulances" && "Ambulance Management"}
          {activeTab === "app-branding" && "App Branding"}
          {activeTab === "database" && "Database Settings"}
          {activeTab === "notifications" && "Push Notifications"}
          {activeTab === "payment" && "Payment Gateways"}
          {activeTab === "app-settings" && "App Settings"}
          {activeTab === "splash-screen" && "Splash Screen Settings"}
        </h2>
        <div>
          {/* Additional header elements could go here */}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
