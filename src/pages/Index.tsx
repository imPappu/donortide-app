
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import HomeBanner from "@/components/HomeBanner";
import TopDonors from "@/components/TopDonors";
import TopNavbar from "@/components/TopNavbar";
import UrgentRequestsRow from "@/components/UrgentRequestsRow";
import QuickActionsGrid from "@/components/home/QuickActionsGrid";
import EventsCampaignsSection from "@/components/home/EventsCampaignsSection";
import UserStoriesSection from "@/components/home/UserStoriesSection";
import CommunityActivitySection from "@/components/home/CommunityActivitySection";
import BloodDonationFacts from "@/components/home/BloodDonationFacts";

const Index = () => {
  const urgentRequests = [
    {
      id: "1",
      name: "Emily Johnson",
      bloodType: "O-",
      location: "Memorial Hospital",
      distance: "2.5 miles",
      urgency: "Urgent",
      postedTime: "30 min ago"
    },
    {
      id: "2",
      name: "Michael Chen",
      bloodType: "A+",
      location: "City Medical Center",
      distance: "4.2 miles",
      urgency: "High",
      postedTime: "2 hours ago"
    },
    {
      id: "3",
      name: "Sarah Williams",
      bloodType: "B-",
      location: "County Hospital",
      distance: "3.7 miles",
      urgency: "Critical",
      postedTime: "15 min ago"
    },
    {
      id: "4",
      name: "David Patel",
      bloodType: "AB+",
      location: "University Medical",
      distance: "5.1 miles",
      urgency: "Urgent",
      postedTime: "1 hour ago"
    }
  ];

  const bannerImages = [
    {
      src: "https://placehold.co/1200x400/red/white?text=Donate+Blood+Save+Lives",
      alt: "Donate Blood Save Lives",
      url: "/create"
    },
    {
      src: "https://placehold.co/1200x400/blue/white?text=World+Blood+Donor+Day",
      alt: "World Blood Donor Day",
      url: "/blog"
    },
    {
      src: "https://placehold.co/1200x400/green/white?text=Find+Donors+Near+You",
      alt: "Find Donors Near You",
      url: "/donors"
    }
  ];

  const upcomingEvents = [
    {
      id: "1",
      title: "Blood Drive at Central Park",
      date: "May 15, 2023",
      location: "Central Park, New York",
      type: "Blood Drive"
    },
    {
      id: "2",
      title: "Donor Appreciation Day",
      date: "June 14, 2023",
      location: "Memorial Hospital",
      type: "Appreciation"
    }
  ];

  const activeCampaigns = [
    {
      id: "1",
      title: "Summer Blood Drive Campaign",
      goal: "500 donors",
      progress: 65,
      endDate: "Aug 31, 2023"
    },
    {
      id: "2",
      title: "Hospital Emergency Reserves",
      goal: "1000 units",
      progress: 42,
      endDate: "July 15, 2023"
    }
  ];

  const recentStories = [
    {
      id: '1',
      userName: 'Sarah Williams',
      title: 'My Donation Journey',
      excerpt: 'How becoming a regular donor changed my perspective on community service...',
      likes: 24,
      comments: 5,
      badge: 'Hero Donor'
    }
  ];

  const recentCommunityPosts = [
    {
      id: '1',
      userName: 'John Doe',
      content: 'Just donated for the 10th time today! Feeling great about helping others...',
      timestamp: '1 hour ago',
      likes: 15,
      comments: 3
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      
      <div className="container mx-auto px-4 py-6 flex-1 pb-20 max-w-6xl">
        {/* Banner Slider */}
        <div className="mb-6">
          <HomeBanner images={bannerImages} />
        </div>

        {/* Urgent Requests Alert - Mobile Only */}
        <div className="md:hidden">
          <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
            <AlertDescription className="flex items-center">
              <Heart className="h-4 w-4 mr-2 text-red-600" /> 
              {urgentRequests.length} urgent requests in your area
            </AlertDescription>
          </Alert>
        </div>

        {/* Urgent Requests Row */}
        <UrgentRequestsRow requests={urgentRequests} />

        {/* Quick Actions */}
        <QuickActionsGrid />
        
        {/* Events & Campaigns Section */}
        <EventsCampaignsSection events={upcomingEvents} campaigns={activeCampaigns} />
        
        {/* User Stories */}
        <UserStoriesSection stories={recentStories} />
        
        {/* Community Posts */}
        <CommunityActivitySection posts={recentCommunityPosts} />

        {/* Top/Recent Donors Section */}
        <div className="mb-6">
          <TopDonors />
        </div>

        {/* Blood Donation Facts */}
        <BloodDonationFacts />
      </div>
    </div>
  );
};

export default Index;
