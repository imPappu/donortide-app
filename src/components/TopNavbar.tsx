
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, PlusCircle, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

  return (
    <div className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
      <div className="container max-w-md mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {!searchExpanded ? (
            <>
              <div className="flex items-center">
                <h1 className="text-xl font-bold flex items-center">
                  {title}
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                {showSearchBar && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={handleSearchClick}
                  >
                    <Search className="h-5 w-5 transition-transform hover:scale-110" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full" 
                  asChild
                >
                  <Link to="/create">
                    <PlusCircle className="h-5 w-5 transition-transform hover:scale-110" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full"
                  asChild
                >
                  <Link to="/notifications">
                    <Bell className="h-5 w-5 transition-transform hover:scale-110" />
                  </Link>
                </Button>
                
                <Link to="/profile">
                  <Avatar className="h-8 w-8 border border-border">
                    {user?.profileImage || user?.avatar ? (
                      <AvatarImage src={user.profileImage || user.avatar} alt={user.name} />
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
