
import React from 'react';
import Navigation from '@/components/Navigation';
import TopNavbar from '@/components/TopNavbar';

const CommunityFeed = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Community Feed" showSearchBar={true} />
      
      <div className="container mx-auto p-4 pb-20">
        <h1 className="text-2xl font-bold mb-6">Community Feed</h1>
        
        <div className="space-y-4">
          {/* Community feed content will go here */}
          <div className="p-4 border rounded-md">
            <p>Community posts will be displayed here.</p>
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default CommunityFeed;
