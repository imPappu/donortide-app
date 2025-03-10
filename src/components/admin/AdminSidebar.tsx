
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
  Component
} from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const AdminSidebar = ({ activeTab, setActiveTab, handleLogout }: AdminSidebarProps) => {
  // Mobile navigation items
  const mobileNavItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "algorithm", label: "Algorithm", icon: <Brain className="h-5 w-5" /> },
    { id: "donors", label: "Donors", icon: <Users className="h-5 w-5" /> },
    { id: "organizations", label: "Organizations", icon: <Building className="h-5 w-5" /> },
    { id: "community", label: "Community", icon: <MessageSquare className="h-5 w-5" /> }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your application</p>
        </div>
        
        <div className="flex flex-col flex-1 py-4 overflow-y-auto">
          <nav className="flex-1">
            {/* DASHBOARD SECTION */}
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dashboard</h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "dashboard" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("dashboard")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "algorithm" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("algorithm")}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Matching Algorithm
                </Button>
              </div>
            </div>
            
            {/* CONTENT MANAGEMENT */}
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "banners" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("banners")}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Banners
                </Button>
                <Button
                  variant={activeTab === "blog" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("blog")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Blog Posts
                </Button>
                <Button
                  variant={activeTab === "community" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("community")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Community Posts
                </Button>
              </div>
            </div>
            
            {/* USER MANAGEMENT */}
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "staff" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("staff")}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Staff
                </Button>
                <Button
                  variant={activeTab === "donors" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("donors")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Donors
                </Button>
                <Button
                  variant={activeTab === "volunteers" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("volunteers")}
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Volunteers
                </Button>
              </div>
            </div>
            
            {/* ORGANIZATION MANAGEMENT */}
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organizations</h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "organizations" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("organizations")}
                >
                  <Building className="mr-2 h-4 w-4" />
                  Organizations
                </Button>
                <Button
                  variant={activeTab === "ambulances" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("ambulances")}
                >
                  <Ambulance className="mr-2 h-4 w-4" />
                  Ambulances
                </Button>
              </div>
            </div>
            
            {/* MARKETING & NOTIFICATIONS */}
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Marketing</h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "push-notifications" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("push-notifications")}
                >
                  <Flame className="mr-2 h-4 w-4" />
                  Firebase Push
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === "ads" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("ads")}
                >
                  <BadgeDollarSign className="mr-2 h-4 w-4" />
                  Ads Management
                </Button>
              </div>
            </div>
            
            {/* SYSTEM & AI */}
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">System</h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "system-updates" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("system-updates")}
                >
                  <Server className="mr-2 h-4 w-4" />
                  System Updates
                </Button>
                <Button
                  variant={activeTab === "addons" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("addons")}
                >
                  <Component className="mr-2 h-4 w-4" />
                  Addon Modules
                </Button>
                <Button
                  variant={activeTab === "ai-config" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("ai-config")}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  AI Configuration
                </Button>
                <Button
                  variant={activeTab === "test-mode" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("test-mode")}
                >
                  <TestTube className="mr-2 h-4 w-4" />
                  Test Environment
                </Button>
                <Button
                  variant={activeTab === "maintenance" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("maintenance")}
                >
                  <Cog className="mr-2 h-4 w-4" />
                  Maintenance Mode
                </Button>
              </div>
            </div>
            
            {/* SETTINGS */}
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Settings</h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "app-branding" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("app-branding")}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  App Branding
                </Button>
                <Button
                  variant={activeTab === "database" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("database")}
                >
                  <Database className="mr-2 h-4 w-4" />
                  Database
                </Button>
                <Button
                  variant={activeTab === "payment" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("payment")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Gateways
                </Button>
                <Button
                  variant={activeTab === "app-settings" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("app-settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  App Settings
                </Button>
                <Button
                  variant={activeTab === "splash-screen" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("splash-screen")}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Splash Screen
                </Button>
              </div>
            </div>
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
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 z-10">
        <div className="flex justify-around p-2">
          {mobileNavItems.map(item => (
            <Button variant="ghost" size="sm" onClick={() => setActiveTab(item.id)} key={item.id}>
              {item.icon}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
