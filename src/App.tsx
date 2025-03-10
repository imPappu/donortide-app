
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Donors from "./pages/Donors";
import Requests from "./pages/Requests";
import CreateRequest from "./pages/CreateRequest";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import AdminDashboard from "./pages/Admin";
import Navigation from "./components/Navigation";
import { getAppSettings } from "@/services/dbService";
import AdminLogin from "./pages/AdminLogin";
import Install from "./pages/Install";
import Volunteers from "./pages/Volunteers";
import Charities from "./pages/Charities";
import Notifications from "./pages/Notifications";
import CommunityFeed from "./pages/CommunityFeed";
import UserStories from "./pages/UserStories";
import DonationCategories from "./pages/DonationCategories";

const queryClient = new QueryClient();

const App = () => {
  const [adminPath, setAdminPath] = useState<string>("admin");
  const [loading, setLoading] = useState(true);
  const [isInstalled, setIsInstalled] = useState(true); // Default to true, will check in useEffect

  useEffect(() => {
    const fetchAppSettings = async () => {
      try {
        const settings = await getAppSettings();
        
        // Check if the app is installed
        const installationSetting = settings.find(s => s.settingKey === 'app_installed');
        if (installationSetting && installationSetting.settingValue === 'false') {
          setIsInstalled(false);
        }
        
        // Get admin path
        const adminPathSetting = settings.find(s => s.settingKey === 'admin_url_path');
        if (adminPathSetting && adminPathSetting.settingValue) {
          setAdminPath(adminPathSetting.settingValue);
        }
      } catch (error) {
        console.error("Error fetching app settings:", error);
        // Continue with default "admin" path if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchAppSettings();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading application...</div>;
  }

  if (!isInstalled) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Install />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/donors" element={<Donors />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/create" element={<CreateRequest />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/volunteers" element={<Volunteers />} />
                <Route path="/charities" element={<Charities />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/community" element={<CommunityFeed />} />
                <Route path="/stories" element={<UserStories />} />
                <Route path="/donate" element={<DonationCategories />} />
                <Route path={`/${adminPath}`} element={<AdminLogin />} />
                <Route path={`/${adminPath}/dashboard`} element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Navigation />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
