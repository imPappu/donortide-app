
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminContent from "@/components/admin/AdminContent";
import SystemUpdatePanel from "@/components/admin/SystemUpdatePanel";
import { useToast } from "@/hooks/use-toast";
import { Notification } from "@/types/apiTypes";
import { getDashboardStats } from "@/services/dashboardService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Stats for the dashboard
  const [stats, setStats] = useState({
    totalUsers: 450,
    totalDonations: 1256,
    totalRequests: 876,
    totalLocations: 24
  });
  
  // Notification state
  const [notification, setNotification] = useState<Partial<Notification>>({
    title: '',
    message: '',
    type: 'info' // This is the type for the notification, not the Alert component
  });

  // System update state
  const [updateAvailable, setUpdateAvailable] = useState(false);
  
  useEffect(() => {
    // Check for system updates when dashboard loads
    const checkForUpdates = async () => {
      try {
        // Simulate checking for updates
        await new Promise(resolve => setTimeout(resolve, 1500));
        setUpdateAvailable(true);
        toast({
          title: "System Update Available",
          description: "A new version of the system is available. Check the System Updates section for details.",
        });
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };
    
    checkForUpdates();
    
    // Fetch dashboard statistics
    const fetchDashboardStats = async () => {
      setLoading(true);
      try {
        const dashboardStats = await getDashboardStats();
        if (dashboardStats) {
          setStats(dashboardStats);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics. Using cached data.",
          variant: "destructive", // This is the correct variant value
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardStats();
  }, [toast]);
  
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader activeTab={activeTab} />
        
        <div className="flex-1 overflow-auto p-4">
          {updateAvailable && activeTab === "dashboard" && (
            <Alert variant="default" className="mb-4 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>System Update Available</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>A new version of the system is available with bug fixes and new features.</span>
                <button 
                  onClick={() => setActiveTab("system-updates")}
                  className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  View Details
                </button>
              </AlertDescription>
            </Alert>
          )}
          
          <AdminContent 
            activeTab={activeTab}
            stats={stats}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
