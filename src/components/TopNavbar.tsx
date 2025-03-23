
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import NavbarBranding from "./navbar/NavbarBranding";
import NavbarDesktopMenu from "./navbar/NavbarDesktopMenu";
import NavbarUserActions from "./navbar/NavbarUserActions";
import NavbarSearch from "./navbar/NavbarSearch";

interface TopNavbarProps {
  onSearch?: (query: string) => void;
  showSearchBar?: boolean;
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ 
  onSearch, 
  showSearchBar = false,
  title = "DonorTide",
  showBackButton = false,
  onBackClick
}) => {
  const navigate = useNavigate();
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm dark:bg-gray-950 dark:border-gray-800 backdrop-blur-sm bg-white/95 dark:bg-gray-950/95">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {!searchExpanded ? (
            <>
              <NavbarBranding 
                title={title}
                showBackButton={showBackButton}
                onBackClick={handleBackClick}
                showSearchBar={showSearchBar}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
              
              <NavbarDesktopMenu />
              
              <NavbarUserActions 
                showSearchBar={showSearchBar}
                onSearchClick={handleSearchClick}
              />
            </>
          ) : (
            <NavbarSearch 
              searchQuery={searchQuery}
              searchExpanded={searchExpanded}
              onSearchChange={handleSearchChange}
              onCancelSearch={() => setSearchExpanded(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
