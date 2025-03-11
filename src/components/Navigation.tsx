
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Heart, MessageCircle, Calendar } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleProfileClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate("/login");
    }
  };

  const NavItem = ({ to, icon, label, active, notificationCount = 0 }: { 
    to: string; 
    icon: React.ReactNode; 
    label: string; 
    active: boolean;
    notificationCount?: number;
  }) => (
    <Link
      to={to}
      className={cn(
        "flex flex-1 flex-col items-center justify-center py-2 transition-all",
        active ? "text-primary" : "text-muted-foreground"
      )}
      onClick={to === "/profile" ? handleProfileClick : undefined}
    >
      <div className={cn(
        "relative h-6 w-6 transition-transform hover:scale-110",
        active && "text-primary"
      )}>
        {icon}
        {notificationCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-[10px]"
          >
            {notificationCount}
          </Badge>
        )}
      </div>
      <span className={cn(
        "text-xs mt-1 font-medium transition-colors",
        active ? "text-primary" : "text-muted-foreground"
      )}>
        {label}
      </span>
      {active && (
        <div className="h-1 w-6 bg-primary rounded-full mt-0.5" />
      )}
    </Link>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur-md dark:bg-gray-950/95 dark:border-gray-800 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <NavItem
            to="/"
            icon={<Home />}
            label="Home"
            active={path === "/" || path === "/index"}
          />
          
          <NavItem
            to="/requests"
            icon={<Heart />}
            label="Requests"
            active={path === "/requests"}
            notificationCount={3}
          />
          
          <NavItem
            to="/community"
            icon={<MessageCircle />}
            label="Community"
            active={path === "/community"}
            notificationCount={5}
          />
          
          <NavItem
            to="/events"
            icon={<Calendar />}
            label="Events"
            active={path.startsWith("/events") || path.startsWith("/campaigns")}
          />
          
          <NavItem
            to="/profile"
            icon={<User />}
            label="Profile"
            active={path === "/profile"}
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
