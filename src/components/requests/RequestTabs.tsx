
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
    if (activeTab === "nearby") return filteredRequests.filter(r => parseFloat(r.distance || "10") < 4);
    if (activeTab === "urgent") return filteredRequests.filter(r => r.urgency === "Urgent");
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
            <BloodRequestCard key={index} {...request} />
          ))
        ) : (
          <EmptyRequestsState searchQuery={searchQuery} activeTab={activeTab} />
        )}
      </div>
    </Tabs>
  );
};

export default RequestTabs;
