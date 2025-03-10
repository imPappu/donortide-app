
import React, { ReactNode } from "react";
import TopNavbar from "@/components/TopNavbar";
import Navigation from "@/components/Navigation";

interface CommunityLayoutProps {
  children: ReactNode;
  title: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CommunityLayout = ({ 
  children, 
  title, 
  searchQuery, 
  setSearchQuery 
}: CommunityLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar 
        title={title} 
        showSearchBar={true} 
        onSearch={setSearchQuery} 
      />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        {children}
      </div>

      <Navigation />
    </div>
  );
};

export default CommunityLayout;
