
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
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
import { AuthProvider, useAuth } from "@/components/auth/AuthContext";
import AdminLink from "@/components/AdminLink";
import SplashScreen from "@/components/SplashScreen";
import LoginSignup from "./pages/LoginSignup";
import Home from "./pages/Home";
import Services from "./pages/Services";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

// Component to handle protected routes and redirect if not authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [adminPath, setAdminPath] = useState<string>("admin");
  const [loading, setLoading] = useState(true);
  const [isInstalled, setIsInstalled] = useState(true); // Default to true, will check in useEffect
  const [showSplash, setShowSplash] = useState(true);

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading application...</p>
        </div>
      </div>
    );
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
        <AuthProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
              <AnimatePresence>
                {showSplash && (
                  <SplashScreen onFinish={() => setShowSplash(false)} />
                )}
              </AnimatePresence>
              
              <div className="flex-1 pb-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/donors" element={<Donors />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/create" element={<CreateRequest />} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/login" element={<LoginSignup />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/volunteers" element={<Volunteers />} />
                  <Route path="/charities" element={<Charities />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/community" element={<CommunityFeed />} />
                  <Route path="/stories" element={<UserStories />} />
                  <Route path="/donate" element={<DonationCategories />} />
                  <Route path="/services" element={<Services />} />
                  <Route path={`/${adminPath}`} element={<AdminLogin />} />
                  <Route path={`/${adminPath}/dashboard`} element={<AdminDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Navigation />
              <AdminLink adminPath={adminPath} />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
