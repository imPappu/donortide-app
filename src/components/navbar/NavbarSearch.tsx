
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NavbarSearchProps {
  searchQuery: string;
  searchExpanded: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancelSearch: () => void;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  searchQuery,
  searchExpanded,
  onSearchChange,
  onCancelSearch
}) => {
  if (!searchExpanded) return null;

  return (
    <div className="w-full flex items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="search-input"
          className="pl-9 rounded-full border-none bg-gray-100 dark:bg-gray-800"
          placeholder="Search..."
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onCancelSearch}
        className="hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Cancel
      </Button>
    </div>
  );
};

export default NavbarSearch;
