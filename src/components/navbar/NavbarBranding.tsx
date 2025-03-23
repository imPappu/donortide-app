
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarBrandingProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showSearchBar?: boolean;
  searchQuery?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NavbarBranding: React.FC<NavbarBrandingProps> = ({
  title,
  showBackButton = false,
  onBackClick,
  showSearchBar = false,
  searchQuery = "",
  onSearchChange
}) => {
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    }
  };

  return (
    <div className="flex items-center gap-3">
      {showBackButton && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 mr-1"
          onClick={handleBackClick}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
      )}
      <Link to="/" className="flex items-center group">
        <h1 className="text-xl font-bold text-primary group-hover:text-primary/90 transition-colors">
          {title}
        </h1>
      </Link>
      {showSearchBar && (
        <div className="relative hidden md:flex items-center max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="desktop-search"
            className="pl-9 bg-gray-100/80 border-none rounded-full dark:bg-gray-800/50 focus-visible:ring-primary/30"
            placeholder="Search..."
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
      )}
    </div>
  );
};

export default NavbarBranding;
