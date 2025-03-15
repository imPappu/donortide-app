
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import TopDonorsRow from "@/components/home/TopDonorsRow";
import HomeSidebar from "@/components/home/HomeSidebar";
import UrgentRequestsRow from "@/components/home/UrgentRequestsRow";
import { Card } from "@/components/ui/card";
import BannerSection from "@/components/home/BannerSection";
import NewsFeedSection from "@/components/home/NewsFeedSection";
import LoadingState from "@/components/home/LoadingState";
import { useUrgentRequests } from "@/hooks/useUrgentRequests";
import { bannerImages, topDonors, newsFeedPosts } from "@/data/homeData";

const Home = () => {
  const { urgentRequests, loading } = useUrgentRequests();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavbar showSearchBar={true} />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {/* Top Donors Row */}
        <TopDonorsRow donors={topDonors} />

        {/* Urgent Blood Requests Row */}
        {urgentRequests.length > 0 && (
          <UrgentRequestsRow requests={urgentRequests} className="mb-6" />
        )}

        {loading && <LoadingState />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar/shortcut column - visible on large screens */}
          <HomeSidebar />
          
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Banner */}
            <BannerSection images={bannerImages} />
            
            {/* News Feed */}
            <NewsFeedSection posts={newsFeedPosts} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
