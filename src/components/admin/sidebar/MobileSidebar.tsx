
import React from "react";
import { 
  Users, 
  LayoutDashboard, 
  Building, 
  MessageSquare,
  Brain,
  Ambulance
} from "lucide-react";
import MobileNavItem from "./MobileNavItem";
import MobileThemeToggle from "./MobileThemeToggle";
import MobileLogoutButton from "./MobileLogoutButton";

interface MobileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const MobileSidebar = ({ activeTab, setActiveTab, handleLogout }: MobileSidebarProps) => {
  // Mobile navigation items
  const mobileNavItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "algorithm", label: "Algorithm", icon: <Brain className="h-5 w-5" /> },
    { id: "donors", label: "Donors", icon: <Users className="h-5 w-5" /> },
    { id: "organizations", label: "Organizations", icon: <Building className="h-5 w-5" /> },
    { id: "services", label: "Services", icon: <Ambulance className="h-5 w-5" /> },
    { id: "community", label: "Community", icon: <MessageSquare className="h-5 w-5" /> }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around p-2">
        {mobileNavItems.map(item => (
          <MobileNavItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            activeTab={activeTab}
            onClick={setActiveTab}
          />
        ))}
        
        <MobileThemeToggle />
        <MobileLogoutButton handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default MobileSidebar;
