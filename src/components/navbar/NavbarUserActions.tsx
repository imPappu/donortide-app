
import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Bell, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthContext";

interface NavbarUserActionsProps {
  onSearchClick?: () => void;
  showSearchBar?: boolean;
}

const NavbarUserActions: React.FC<NavbarUserActionsProps> = ({ 
  onSearchClick,
  showSearchBar 
}) => {
  const { user } = useAuth();

  return (
    <div className="flex items-center space-x-3">
      {showSearchBar && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={onSearchClick}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      )}
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full relative hover:bg-gray-100 dark:hover:bg-gray-800" 
        asChild
      >
        <Link to="/request">
          <PlusCircle className="h-5 w-5" />
          <span className="sr-only">Create</span>
        </Link>
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full relative hover:bg-gray-100 dark:hover:bg-gray-800"
        asChild
      >
        <Link to="/notifications">
          <Bell className="h-5 w-5" />
          <Badge className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white">2</Badge>
          <span className="sr-only">Notifications</span>
        </Link>
      </Button>
      
      <Link to="/profile" className="hover:opacity-90 transition-opacity">
        <Avatar className="h-9 w-9 border border-border shadow-sm">
          {user?.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-primary/10 text-primary">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </Link>
    </div>
  );
};

export default NavbarUserActions;
