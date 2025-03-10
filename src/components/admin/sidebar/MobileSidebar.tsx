
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  LogOut, 
  LayoutDashboard, 
  Building, 
  MessageSquare,
  Brain,
  Moon,
  Sun,
  Ambulance
} from "lucide-react";
import { useTheme } from "next-themes";

interface MobileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const MobileSidebar = ({ activeTab, setActiveTab, handleLogout }: MobileSidebarProps) => {
  const { theme, setTheme } = useTheme();
  
  // Mobile navigation items
  const mobileNavItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "algorithm", label: "Algorithm", icon: <Brain className="h-5 w-5" /> },
    { id: "donors", label: "Donors", icon: <Users className="h-5 w-5" /> },
    { id: "organizations", label: "Organizations", icon: <Building className="h-5 w-5" /> },
    { id: "services", label: "Services", icon: <Ambulance className="h-5 w-5" /> },
    { id: "community", label: "Community", icon: <MessageSquare className="h-5 w-5" /> }
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around p-2">
        {mobileNavItems.map(item => (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setActiveTab(item.id)} 
            key={item.id}
            className={activeTab === item.id ? "text-blue-600 dark:text-blue-400" : ""}
          >
            {item.icon}
          </Button>
        ))}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout} 
          className="text-red-500"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MobileSidebar;
