
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Heart, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NavbarDesktopMenu: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/index";
    }
    if (path === "/community") {
      return location.pathname.includes("/community");
    }
    return location.pathname === path;
  };

  return (
    <div className="hidden md:flex items-center justify-center space-x-1 flex-1">
      <Link to="/">
        <Button 
          variant={isActive("/") ? "secondary" : "ghost"} 
          size="lg"
          className="relative rounded-md px-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Button>
      </Link>
      <Link to="/urgent-requests">
        <Button 
          variant={isActive("/urgent-requests") ? "secondary" : "ghost"} 
          size="lg"
          className="relative rounded-md px-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Heart className="h-5 w-5" />
          <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white">3</Badge>
          <span className="sr-only">Requests</span>
        </Button>
      </Link>
      <Link to="/community/feed">
        <Button 
          variant={isActive("/community") ? "secondary" : "ghost"} 
          size="lg"
          className="relative rounded-md px-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white">5</Badge>
          <span className="sr-only">Community</span>
        </Button>
      </Link>
      <Link to="/profile">
        <Button 
          variant={isActive("/profile") ? "secondary" : "ghost"} 
          size="lg"
          className="relative rounded-md px-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
      </Link>
    </div>
  );
};

export default NavbarDesktopMenu;
