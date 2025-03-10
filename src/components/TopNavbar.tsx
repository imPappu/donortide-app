
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, PlusCircle, Bell, Home, MessageCircle, User, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthContext";

interface TopNavbarProps {
  onSearch?: (query: string) => void;
  showSearchBar?: boolean;
  title?: string;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ 
  onSearch, 
  showSearchBar = false,
  title = "DonorTide"
}) => {
  const location = useLocation();
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user } = useAuth();

  const handleSearchClick = () => {
    if (!showSearchBar) return;
    
    setSearchExpanded(!searchExpanded);
    if (!searchExpanded) {
      // Focus the input when expanding
      setTimeout(() => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm dark:bg-gray-950 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {!searchExpanded ? (
            <>
              <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center">
                  <h1 className="text-xl font-bold text-primary">{title}</h1>
                </Link>
                {showSearchBar && (
                  <div className="relative hidden md:flex items-center max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="desktop-search"
                      className="pl-9 bg-gray-100 border-none dark:bg-gray-800"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="hidden md:flex items-center justify-center space-x-1 flex-1">
                <Link to="/">
                  <Button 
                    variant={isActive("/") ? "secondary" : "ghost"} 
                    size="lg"
                    className="relative rounded-md px-6"
                  >
                    <Home className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/requests">
                  <Button 
                    variant={isActive("/requests") ? "secondary" : "ghost"} 
                    size="lg"
                    className="relative rounded-md px-6"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/community">
                  <Button 
                    variant={isActive("/community") ? "secondary" : "ghost"} 
                    size="lg"
                    className="relative rounded-md px-6"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center">3</Badge>
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button 
                    variant={isActive("/profile") ? "secondary" : "ghost"} 
                    size="lg"
                    className="relative rounded-md px-6"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-3">
                {showSearchBar && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full md:hidden"
                    onClick={handleSearchClick}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full relative" 
                  asChild
                >
                  <Link to="/create">
                    <PlusCircle className="h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full relative"
                  asChild
                >
                  <Link to="/notifications">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center">2</Badge>
                  </Link>
                </Button>
                
                <Link to="/profile">
                  <Avatar className="h-8 w-8 border border-border">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback>
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Link>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-input"
                  className="pl-9"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSearchExpanded(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
