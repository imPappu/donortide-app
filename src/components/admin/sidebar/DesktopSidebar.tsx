
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
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DesktopSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const DesktopSidebar = ({ activeTab, setActiveTab, handleLogout }: DesktopSidebarProps) => {
  return (
    <div className="hidden md:flex w-64 flex-col h-screen bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm">
      <div className="p-4 border-b dark:border-gray-700 flex flex-col">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage your organization</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="flex flex-col py-4">
          <nav className="space-y-1 px-3">
            <DashboardSection activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <Separator className="my-4" />
            
            <ContentSection activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <Separator className="my-4" />
            
            <UserSection activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <Separator className="my-4" />
            
            <OrganizationSection activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <Separator className="my-4" />
            
            <MarketingSection activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <Separator className="my-4" />
            
            <SystemSection activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <Separator className="my-4" />
            
            <SettingsSection activeTab={activeTab} setActiveTab={setActiveTab} />
          </nav>
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t dark:border-gray-700">
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DesktopSidebar;
