
import React from "react";
import DesktopSidebar from "./sidebar/DesktopSidebar";
import MobileSidebar from "./sidebar/MobileSidebar";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const AdminSidebar = ({ activeTab, setActiveTab, handleLogout }: AdminSidebarProps) => {
  return (
    <>
      <DesktopSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
      />
      <MobileSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
      />
    </>
  );
};

export default AdminSidebar;
