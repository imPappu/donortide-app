
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import DashboardSection from "./sections/DashboardSection";
import ContentSection from "./sections/ContentSection";
import UserSection from "./sections/UserSection";
import OrganizationSection from "./sections/OrganizationSection";
import MarketingSection from "./sections/MarketingSection";
import SystemSection from "./sections/SystemSection";
import SettingsSection from "./sections/SettingsSection";

interface DesktopSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const DesktopSidebar = ({ activeTab, setActiveTab, handleLogout }: DesktopSidebarProps) => {
  return (
    <div className="hidden md:flex w-64 flex-col bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm">
      <div className="p-4 border-b dark:border-gray-700">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage your application</p>
      </div>
      
      <div className="flex flex-col flex-1 py-4 overflow-y-auto">
        <nav className="flex-1">
          <DashboardSection activeTab={activeTab} setActiveTab={setActiveTab} />
          <ContentSection activeTab={activeTab} setActiveTab={setActiveTab} />
          <UserSection activeTab={activeTab} setActiveTab={setActiveTab} />
          <OrganizationSection activeTab={activeTab} setActiveTab={setActiveTab} />
          <MarketingSection activeTab={activeTab} setActiveTab={setActiveTab} />
          <SystemSection activeTab={activeTab} setActiveTab={setActiveTab} />
          <SettingsSection activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>
        
        <div className="px-3 py-2 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
