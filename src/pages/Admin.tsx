
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  getDashboardStats, 
  getBloodRequests, 
  getBlogPosts, 
  getBanners,
  getAppSettings,
  BlogPost,
  Banner,
  Notification,
  BloodRequest
} from "@/services/dbService";

// Import our new components
import DashboardStats from "@/components/admin/DashboardStats";
import BlogManagement from "@/components/admin/BlogManagement";
import BannerManagement from "@/components/admin/BannerManagement";
import RecentRequests from "@/components/admin/RecentRequests";
import NotificationPanel from "@/components/admin/NotificationPanel";
import PushNotificationCenter from "@/components/admin/PushNotificationCenter";
import AppSettingsForm from "@/components/admin/AppSettingsForm";
import PaymentGatewaySettings from "@/components/admin/PaymentGatewaySettings";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    totalRequests: 0,
    totalLocations: 0,
    recentRequests: []
  });
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [adminPath, setAdminPath] = useState("admin");
  
  // State for notifications
  const [notification, setNotification] = useState<Partial<Notification>>({
    title: '',
    message: '',
    targetType: 'all'
  });

  // Check for admin authentication
  useEffect(() => {
    const checkAdminAuth = () => {
      const adminToken = localStorage.getItem("admin_token");
      if (!adminToken) {
        toast({
          title: "Authentication required",
          description: "Please login to access the admin dashboard",
          variant: "destructive",
        });
        navigate(`/${adminPath}`);
        return false;
      }
      
      // Parse token and check if it's expired
      try {
        const tokenData = JSON.parse(adminToken);
        const now = new Date().getTime();
        const expiryTime = tokenData.timestamp + tokenData.expiresIn;
        
        if (now > expiryTime) {
          localStorage.removeItem("admin_token");
          toast({
            title: "Session expired",
            description: "Your session has expired. Please login again",
            variant: "destructive",
          });
          navigate(`/${adminPath}`);
          return false;
        }
      } catch (error) {
        localStorage.removeItem("admin_token");
        navigate(`/${adminPath}`);
        return false;
      }
      
      return true;
    };

    const fetchAdminPath = async () => {
      try {
        const settings = await getAppSettings();
        const adminPathSetting = settings.find(s => s.settingKey === 'admin_url_path');
        if (adminPathSetting && adminPathSetting.settingValue) {
          setAdminPath(adminPathSetting.settingValue);
        }
      } catch (error) {
        console.error("Error fetching admin path:", error);
      }
    };

    fetchAdminPath();
    const isAuthenticated = checkAdminAuth();
    
    if (isAuthenticated) {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      const dashboardData = await getDashboardStats();
      setStats({
        totalUsers: dashboardData.totalUsers || 0,
        totalDonations: dashboardData.totalDonations || 0,
        totalRequests: dashboardData.totalRequests || 0,
        totalLocations: dashboardData.totalLocations || 0,
        recentRequests: dashboardData.recentRequests || []
      });
      
      // Fetch blood requests
      const requestsData = await getBloodRequests();
      setRequests(requestsData);
      
      // Fetch blog posts
      const blogData = await getBlogPosts();
      setBlogPosts(blogData);
      
      // Fetch banners
      const bannerData = await getBanners();
      setBanners(bannerData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate(`/${adminPath}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-xl">Loading admin dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Send Alert
          </Button>
        </div>
      </div>

      <DashboardStats stats={stats} />

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blog">Blog Management</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="app-settings">App Settings</TabsTrigger>
          <TabsTrigger value="payments">Payment Gateways</TabsTrigger>
          <TabsTrigger value="push">Push Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentRequests requests={requests} />
            <NotificationPanel notification={notification} setNotification={setNotification} />
          </div>
        </TabsContent>
        
        <TabsContent value="blog">
          <BlogManagement blogPosts={blogPosts} setBlogPosts={setBlogPosts} />
        </TabsContent>
        
        <TabsContent value="banners">
          <BannerManagement banners={banners} setBanners={setBanners} />
        </TabsContent>
        
        <TabsContent value="app-settings">
          <Card>
            <AppSettingsForm />
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <PaymentGatewaySettings />
        </TabsContent>
        
        <TabsContent value="push">
          <PushNotificationCenter notification={notification} setNotification={setNotification} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
