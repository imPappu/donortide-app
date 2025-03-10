
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  Home, 
  LayoutDashboard, 
  FileText, 
  Image, 
  Database, 
  CreditCard, 
  AlertCircle, 
  Truck, 
  BarChartHorizontal, 
  Building, 
  MessageSquare,
  Brain,
  Activity,
  Briefcase,
  UserCheck,
  Ambulance,
  Flame,
  BadgeDollarSign,
  Palette,
  Server,
  Package,
  TestTube,
  Shield,
  Power,
  Cog,
  Component,
  UserPlus
} from "lucide-react";
import { NavSection, NavItem } from "./NavSection";

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
          {/* DASHBOARD SECTION */}
          <NavSection title="Dashboard">
            <NavItem
              id="dashboard"
              label="Dashboard"
              icon={<LayoutDashboard className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="algorithm"
              label="Matching Algorithm"
              icon={<Brain className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          </NavSection>
          
          {/* CONTENT MANAGEMENT */}
          <NavSection title="Content">
            <NavItem
              id="banners"
              label="Banners"
              icon={<Image className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="blog"
              label="Blog Posts"
              icon={<FileText className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="community"
              label="Community Posts"
              icon={<MessageSquare className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          </NavSection>
          
          {/* USER MANAGEMENT */}
          <NavSection title="Users">
            <NavItem
              id="staff"
              label="Staff"
              icon={<Briefcase className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="donors"
              label="Donors"
              icon={<Users className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="volunteers"
              label="Volunteers"
              icon={<UserCheck className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          </NavSection>
          
          {/* ORGANIZATION & SERVICES MANAGEMENT */}
          <NavSection title="Organizations & Services">
            <NavItem
              id="organizations"
              label="Organizations"
              icon={<Building className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="ambulances"
              label="Ambulances"
              icon={<Ambulance className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="services"
              label="Services"
              icon={<UserPlus className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          </NavSection>
          
          {/* MARKETING & NOTIFICATIONS */}
          <NavSection title="Marketing">
            <NavItem
              id="push-notifications"
              label="Firebase Push"
              icon={<Flame className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="notifications"
              label="Notifications"
              icon={<Bell className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="ads"
              label="Ads Management"
              icon={<BadgeDollarSign className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          </NavSection>
          
          {/* SYSTEM & AI */}
          <NavSection title="System">
            <NavItem
              id="system-updates"
              label="System Updates"
              icon={<Server className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="addons"
              label="Addon Modules"
              icon={<Component className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="ai-config"
              label="AI Configuration"
              icon={<Brain className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="test-mode"
              label="Test Environment"
              icon={<TestTube className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="maintenance"
              label="Maintenance Mode"
              icon={<Cog className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          </NavSection>
          
          {/* SETTINGS */}
          <NavSection title="Settings">
            <NavItem
              id="app-branding"
              label="App Branding"
              icon={<Palette className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="database"
              label="Database"
              icon={<Database className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="payment"
              label="Payment Gateways"
              icon={<CreditCard className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="app-settings"
              label="App Settings"
              icon={<Settings className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
            <NavItem
              id="splash-screen"
              label="Splash Screen"
              icon={<Palette className="mr-2 h-4 w-4" />}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          </NavSection>
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
