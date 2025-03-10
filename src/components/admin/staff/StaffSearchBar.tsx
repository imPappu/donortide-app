
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface StaffSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const StaffSearchBar: React.FC<StaffSearchBarProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search staff..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
};

export default StaffSearchBar;
