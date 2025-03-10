
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Newspaper, Heart, UsersRound, MessageCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

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

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800 z-50">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <Link
            to="/"
            className={`flex flex-1 flex-col items-center justify-center py-2 ${
              path === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="h-6 w-6 transition-transform hover:scale-110" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link
            to="/requests"
            className={`flex flex-1 flex-col items-center justify-center py-2 ${
              path === "/requests" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Heart className="h-6 w-6 transition-transform hover:scale-110" />
            <span className="text-xs mt-1">Requests</span>
          </Link>
          
          <Link
            to="/community"
            className={`flex flex-1 flex-col items-center justify-center py-2 ${
              path === "/community" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <MessageCircle className="h-6 w-6 transition-transform hover:scale-110" />
            <span className="text-xs mt-1">Community</span>
          </Link>
          
          <Link
            to="/blog"
            className={`flex flex-1 flex-col items-center justify-center py-2 ${
              path === "/blog" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Newspaper className="h-6 w-6 transition-transform hover:scale-110" />
            <span className="text-xs mt-1">Blog</span>
          </Link>
          
          <Link
            to="/profile"
            className={`flex flex-1 flex-col items-center justify-center py-2 ${
              path === "/profile" ? "text-primary" : "text-muted-foreground"
            }`}
            onClick={handleProfileClick}
          >
            <User className="h-6 w-6 transition-transform hover:scale-110" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
