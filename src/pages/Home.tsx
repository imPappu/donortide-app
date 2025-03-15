
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import TopDonorsRow from "@/components/home/TopDonorsRow";
import HomeSidebar from "@/components/home/HomeSidebar";
import UrgentRequestsRow from "@/components/home/UrgentRequestsRow";
import BannerSection from "@/components/home/BannerSection";
import NewsFeedSection from "@/components/home/NewsFeedSection";
import LoadingState from "@/components/home/LoadingState";
import HomeLayout from "@/components/home/HomeLayout";
import { useUrgentRequests } from "@/hooks/useUrgentRequests";
import { bannerImages, topDonors, newsFeedPosts } from "@/data/homeData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Calendar, Trophy } from "lucide-react";

const Home = () => {
  const { urgentRequests, loading } = useUrgentRequests();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavbar showSearchBar={true} />
      
      <HomeLayout>
        {/* Top Donors Row */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h2 className="text-lg font-semibold">Top Donors</h2>
          </div>
          <TopDonorsRow donors={topDonors} />
        </div>

        {/* Urgent Blood Requests Row */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Droplet className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold">Urgent Blood Requests</h2>
          </div>
          {loading ? (
            <LoadingState />
          ) : (
            urgentRequests.length > 0 && (
              <UrgentRequestsRow requests={urgentRequests} />
            )
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar/shortcut column - visible on large screens */}
          <div className="hidden lg:block">
            <HomeSidebar />
          </div>
          
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Banner */}
            <BannerSection images={bannerImages} />
            
            {/* News Feed */}
            <NewsFeedSection posts={newsFeedPosts} />
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default Home;
