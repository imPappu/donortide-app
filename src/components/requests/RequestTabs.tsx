
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DropletIcon from "./DropletIcon";
import BloodRequestCard from "./BloodRequestCard";
import EmptyRequestsState from "./EmptyRequestsState";
import { BloodRequest } from "@/types/apiTypes";

interface RequestTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  filteredRequests: BloodRequest[];
  searchQuery: string;
}

const RequestTabs: React.FC<RequestTabsProps> = ({
  activeTab,
  onTabChange,
  filteredRequests,
  searchQuery
}) => {
  const getFilteredRequests = () => {
    if (activeTab === "all") return filteredRequests;
    
    // For nearby, we're using a mock implementation since distance isn't in the type
    // We can assume any request with a mock distance < 4 is nearby
    if (activeTab === "nearby") {
      return filteredRequests.filter(r => {
        // Handle the case where distance might not exist in the type
        const distanceStr = (r as any).distance || "10 km";
        const distance = parseFloat(distanceStr.split(' ')[0]);
        return distance < 4;
      });
    }
    
    // For urgent tab, filter by urgency being "urgent" - note the case sensitivity
    if (activeTab === "urgent") {
      return filteredRequests.filter(r => r.urgency === "urgent" || r.urgency === "critical");
    }
    
    return filteredRequests;
  };

  const displayRequests = getFilteredRequests();

  return (
    <Tabs 
      defaultValue="all" 
      className="mb-6"
      value={activeTab}
      onValueChange={onTabChange}
    >
      <TabsList className="w-full grid grid-cols-3 h-10">
        <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          All
        </TabsTrigger>
        <TabsTrigger value="nearby" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          Nearby
        </TabsTrigger>
        <TabsTrigger value="urgent" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          Urgent
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-4">
        {displayRequests.length > 0 ? (
          displayRequests.map((request, index) => (
            <BloodRequestCard 
              key={index} 
              {...request} 
              postedTime={(request as any).postedTime || "Recently"}
              distance={(request as any).distance || "Unknown"} 
            />
          ))
        ) : (
          <EmptyRequestsState searchQuery={searchQuery} activeTab={activeTab} />
        )}
      </div>
    </Tabs>
  );
};

export default RequestTabs;
