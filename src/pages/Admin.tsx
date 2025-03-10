
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Banner, BlogPost, Notification } from "@/services/dbService";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminContent from "@/components/admin/AdminContent";

const AdminDashboard = () => {
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
      </div>
    </div>
  );
};

export default AdminDashboard;
