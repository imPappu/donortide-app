
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

interface ConsultantSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddClick: () => void;
}

const ConsultantSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  onAddClick 
}: ConsultantSearchProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="relative w-full md:w-auto flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search consultants..."
          className="pl-8 w-full md:w-[300px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button onClick={onAddClick}>
        <Plus className="mr-2 h-4 w-4" />
        Add Consultant
      </Button>
    </div>
  );
};

export default ConsultantSearch;
