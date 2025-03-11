
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { useBloodRequests } from '@/hooks/useBloodRequests';
import RequestTabs from '@/components/requests/RequestTabs';
import DropletIcon from '@/components/requests/DropletIcon';

const Requests = () => {
  const navigate = useNavigate();
  const { 
    filteredRequests, 
    searchQuery, 
    activeTab, 
    setActiveTab, 
    handleSearch 
  } = useBloodRequests();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <TopNavbar 
        title="Blood Requests"
        showSearchBar={true}
        onSearch={handleSearch}
      />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <Alert className="mb-4 border-red-200 bg-red-50 text-red-800 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-300">
          <AlertDescription className="flex items-center">
            <DropletIcon className="h-4 w-4 mr-2" /> 
            3 urgent requests in your area
          </AlertDescription>
        </Alert>

        <RequestTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          filteredRequests={filteredRequests}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default Requests;
