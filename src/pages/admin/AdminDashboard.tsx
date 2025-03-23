
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleUserRound, AlertCircle, Heart, Users, Settings } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ContentRouter from "@/components/admin/content/ContentRouter";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const handleLogout = () => {
    // Add logout logic here
    console.log("Admin logout");
  };
  
  return (
    <div className="min-h-screen flex">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
      />
      
      <div className="flex-1 p-6">
        <ContentRouter activeTab={activeTab} />
      </div>
    </div>
  );
};

export default AdminDashboard;
