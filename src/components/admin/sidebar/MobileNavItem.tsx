
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeTab: string;
  onClick: (id: string) => void;
}

const MobileNavItem = ({ id, label, icon, activeTab, onClick }: MobileNavItemProps) => {
  const isActive = activeTab === id;
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => onClick(id)} 
      key={id}
      className={cn(
        isActive ? "text-blue-600 dark:text-blue-400" : "",
        "flex flex-col items-center justify-center"
      )}
      title={label}
    >
      {icon}
    </Button>
  );
};

export default MobileNavItem;
