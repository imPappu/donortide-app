
import React from "react";
import DesktopSidebar from "./sidebar/DesktopSidebar";
import MobileSidebar from "./sidebar/MobileSidebar";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, handleLogout }) => {
  // Pass only the props each component actually needs
  return (
    <>
      <DesktopSidebar 
        isCollapsed={false}
        onToggle={() => {}} // Placeholder empty function
        // Don't pass activeTab, setActiveTab, or handleLogout since DesktopSidebar doesn't use them
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
