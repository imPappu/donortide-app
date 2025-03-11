
import React from "react";
import DropletIcon from "./DropletIcon";

interface EmptyRequestsStateProps {
  searchQuery: string;
  activeTab: string;
}

const EmptyRequestsState: React.FC<EmptyRequestsStateProps> = ({ 
  searchQuery, 
  activeTab 
}) => {
  return (
    <div className="text-center py-8">
      <DropletIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
      {searchQuery.trim() ? (
        <p className="text-center text-muted-foreground">No results matching "{searchQuery}"</p>
      ) : (
        <p className="text-center text-muted-foreground">
          {activeTab === "nearby" ? "No nearby requests found" : 
           activeTab === "urgent" ? "No urgent requests found" : 
           "No requests available"}
        </p>
      )}
    </div>
  );
};

export default EmptyRequestsState;
