
import React from "react";
import DesktopSidebar from "./sidebar/DesktopSidebar";
import MobileSidebar from "./sidebar/MobileSidebar";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, handleLogout }) => {
  return (
    <>
      <DesktopSidebar 
        // We need to pass only props that DesktopSidebar accepts
        isCollapsed={false}
        onToggle={() => {}} // Placeholder empty function
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
