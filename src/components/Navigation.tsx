
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Newspaper, Heart, UsersRound, MessageCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { cn } from "@/lib/utils";

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

  const NavItem = ({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) => (
    <Link
      to={to}
      className={cn(
        "flex flex-1 flex-col items-center justify-center py-2 transition-all",
        active ? "text-primary" : "text-muted-foreground"
      )}
      onClick={to === "/profile" ? handleProfileClick : undefined}
    >
      <div className={cn(
        "h-6 w-6 transition-transform hover:scale-110",
        active && "text-primary"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-xs mt-1 font-medium transition-colors",
        active ? "text-primary" : "text-muted-foreground"
      )}>
        {label}
      </span>
      {active && (
        <div className="h-1 w-1 bg-primary rounded-full mt-0.5" />
      )}
    </Link>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/90 backdrop-blur-sm dark:bg-gray-950/90 dark:border-gray-800 z-50 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <NavItem
            to="/"
            icon={<Home />}
            label="Home"
            active={path === "/"}
          />
          
          <NavItem
            to="/requests"
            icon={<Heart />}
            label="Requests"
            active={path === "/requests"}
          />
          
          <NavItem
            to="/community"
            icon={<MessageCircle />}
            label="Community"
            active={path === "/community"}
          />
          
          <NavItem
            to="/blog"
            icon={<Newspaper />}
            label="Blog"
            active={path === "/blog"}
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
