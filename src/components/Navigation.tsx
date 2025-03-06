
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusCircle, User, Newspaper } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname;

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
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link
            to="/donors"
            className={`flex flex-1 flex-col items-center justify-center py-2 ${
              path === "/donors" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">Donors</span>
          </Link>
          
          <Link
            to="/create"
            className={`flex flex-1 flex-col items-center justify-center py-2 ${
              path === "/create" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <PlusCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Request</span>
          </Link>
          
          <Link
            to="/blog"
            className={`flex flex-1 flex-col items-center justify-center py-2 ${
              path === "/blog" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Newspaper className="h-6 w-6" />
            <span className="text-xs mt-1">Blog</span>
          </Link>
          
          <Link
            to="/profile"
            className={`flex flex-1 flex-col items-center justify-center py-2 ${
              path === "/profile" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
