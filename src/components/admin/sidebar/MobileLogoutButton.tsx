
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface MobileLogoutButtonProps {
  handleLogout: () => void;
}

const MobileLogoutButton = ({ handleLogout }: MobileLogoutButtonProps) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleLogout} 
      className="text-red-500"
      title="Logout"
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );
};

export default MobileLogoutButton;
