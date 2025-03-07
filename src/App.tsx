
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => {
  const [adminPath, setAdminPath] = useState<string>("admin");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminPath = async () => {
      try {
        const settings = await getAppSettings();
        const adminPathSetting = settings.find(s => s.settingKey === 'admin_url_path');
        if (adminPathSetting && adminPathSetting.settingValue) {
          setAdminPath(adminPathSetting.settingValue);
        }
      } catch (error) {
        console.error("Error fetching admin path:", error);
        // Continue with default "admin" path if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchAdminPath();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading application...</div>;
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
                {/* Use the exact value of adminPath, not a parameter notation */}
                <Route path={`/${adminPath}`} element={<AdminDashboard />} />
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
