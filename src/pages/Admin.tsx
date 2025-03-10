
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import DashboardStats from "@/components/admin/DashboardStats";
import BannerManagement from "@/components/admin/BannerManagement";
import BlogManagement from "@/components/admin/BlogManagement";
import PushNotificationCenter from "@/components/admin/PushNotificationCenter";
import PaymentGatewaySettings from "@/components/admin/PaymentGatewaySettings";
import AppSettingsForm from "@/components/admin/AppSettingsForm";
import SplashScreenSettings from "@/components/admin/SplashScreenSettings";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, LayoutDashboard, Image, Bell, CreditCard, FileText, Palette } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your application</p>
        </div>
        
        <div className="flex flex-col flex-1 py-4">
          <nav className="flex-1">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">General</h2>
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
              </div>
            </div>
            
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Settings</h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "notifications" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
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
          <Button variant="ghost" size="sm" onClick={() => setActiveTab("dashboard")}>
            <LayoutDashboard className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setActiveTab("banners")}>
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setActiveTab("blog")}>
            <FileText className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setActiveTab("app-settings")}>
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <div className="md:hidden">
              <h1 className="text-xl font-bold">Admin</h1>
            </div>
            <h2 className="text-xl font-semibold hidden md:block">
              {activeTab === "dashboard" && "Dashboard Overview"}
              {activeTab === "banners" && "Banner Management"}
              {activeTab === "blog" && "Blog Posts"}
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
        
        <main className="p-4 md:p-6">
          <TabsContent value="dashboard" className={activeTab === "dashboard" ? "block" : "hidden"}>
            <DashboardStats />
          </TabsContent>
          
          <TabsContent value="banners" className={activeTab === "banners" ? "block" : "hidden"}>
            <BannerManagement />
          </TabsContent>
          
          <TabsContent value="blog" className={activeTab === "blog" ? "block" : "hidden"}>
            <BlogManagement />
          </TabsContent>
          
          <TabsContent value="notifications" className={activeTab === "notifications" ? "block" : "hidden"}>
            <PushNotificationCenter />
          </TabsContent>
          
          <TabsContent value="payment" className={activeTab === "payment" ? "block" : "hidden"}>
            <PaymentGatewaySettings />
          </TabsContent>
          
          <TabsContent value="app-settings" className={activeTab === "app-settings" ? "block" : "hidden"}>
            <Card>
              <CardContent className="pt-6">
                <AppSettingsForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="splash-screen" className={activeTab === "splash-screen" ? "block" : "hidden"}>
            <SplashScreenSettings />
          </TabsContent>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
