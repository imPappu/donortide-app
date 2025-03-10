import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminContent from "@/components/admin/AdminContent";
import SystemUpdatePanel from "@/components/admin/SystemUpdatePanel";
import { useToast } from "@/hooks/use-toast";
import { Banner, BlogPost, Notification } from "@/types/apiTypes";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  
  // Stats for the dashboard
  const [stats, setStats] = useState({
    totalUsers: 450,
    totalDonations: 1256,
    totalRequests: 876,
    totalLocations: 24
  });
  
  // Banners state
  const [banners, setBanners] = useState<Banner[]>([]);
  
  // Blog posts state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  
  // Notification state
  const [notification, setNotification] = useState<Partial<Notification>>({
    title: '',
    message: '',
    targetType: 'all'
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
  }, [toast]);
  
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
      />
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <AdminHeader activeTab={activeTab} />
        
        {updateAvailable && activeTab === "dashboard" && (
          <div className="mx-4 mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm-1-5a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  A system update is available. Go to System Updates to learn more.
                </p>
              </div>
              <div>
                <button 
                  onClick={() => setActiveTab("system-updates")}
                  className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        )}
        
        <AdminContent 
          activeTab={activeTab}
          stats={stats}
          banners={banners}
          setBanners={setBanners}
          blogPosts={blogPosts}
          setBlogPosts={setBlogPosts}
          notification={notification}
          setNotification={setNotification}
        />
        
        {activeTab === "system-updates" && (
          <SystemUpdatePanel />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
