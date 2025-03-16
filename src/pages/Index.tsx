import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import HomeBanner from "@/components/HomeBanner";
import TopDonors from "@/components/TopDonors";
import TopNavbar from "@/components/TopNavbar";
import UrgentRequestsRow from "@/components/home/UrgentRequestsRow";
import QuickActionsGrid from "@/components/home/QuickActionsGrid";
import EventsCampaignsSection from "@/components/home/EventsCampaignsSection";
import UserStoriesSection from "@/components/home/UserStoriesSection";
import CommunityActivitySection from "@/components/home/CommunityActivitySection";
import BloodDonationFacts from "@/components/home/BloodDonationFacts";
import { UrgentRequest } from "@/hooks/useUrgentRequests";

const Index = () => {
  const urgentRequests: UrgentRequest[] = [
    {
      id: "1",
      patientName: "Emily Johnson",
      bloodType: "O-",
      location: "Memorial Hospital",
      hospital: "Memorial Hospital",
      contactNumber: "(555) 123-4567",
      distance: "2.5 miles",
      urgency: "urgent",
      postedTime: "30 min ago",
      units: 2,
      createdAt: new Date().toISOString(),
      status: "open"
    },
    {
      id: "2",
      patientName: "Michael Chen",
      bloodType: "A+",
      location: "City Medical Center",
      hospital: "City Medical Center",
      contactNumber: "(555) 234-5678",
      distance: "4.2 miles",
      urgency: "high",
      postedTime: "2 hours ago",
      units: 3,
      createdAt: new Date().toISOString(),
      status: "open"
    },
    {
      id: "3",
      patientName: "Sarah Williams",
      bloodType: "B-",
      location: "County Hospital",
      hospital: "County Hospital",
      contactNumber: "(555) 345-6789",
      distance: "3.7 miles",
      urgency: "critical",
      postedTime: "15 min ago",
      units: 1,
      createdAt: new Date().toISOString(),
      status: "open"
    },
    {
      id: "4",
      patientName: "David Patel",
      bloodType: "AB+",
      location: "University Medical",
      hospital: "University Medical",
      contactNumber: "(555) 456-7890",
      distance: "5.1 miles",
      urgency: "urgent",
      postedTime: "1 hour ago",
      units: 2,
      createdAt: new Date().toISOString(),
      status: "open"
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
      url: "/events"
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
      time: "9:00 AM - 5:00 PM",
      location: "Central Park, New York",
      organizer: "Red Cross",
      description: "Join us for our annual blood drive at Central Park. Your donation can save up to three lives!",
      image: "https://placehold.co/600x400/red/white?text=Blood+Drive"
    },
    {
      id: "2",
      title: "Donor Appreciation Day",
      date: "June 14, 2023",
      time: "12:00 PM - 3:00 PM",
      location: "Memorial Hospital",
      organizer: "Memorial Hospital",
      description: "A special event to thank our regular donors. Refreshments and recognition awards will be provided.",
      image: "https://placehold.co/600x400/blue/white?text=Donor+Appreciation"
    }
  ];

  const activeCampaigns = [
    {
      id: "1",
      title: "Summer Blood Drive Campaign",
      goal: "500 donors",
      progress: 65,
      endDate: "Aug 31, 2023",
      description: "Help us reach our summer donation goal of 500 donors. Each donation makes a difference during this critical season.",
      image: "https://placehold.co/600x400/orange/white?text=Summer+Campaign"
    },
    {
      id: "2",
      title: "Hospital Emergency Reserves",
      goal: "1000 units",
      progress: 42,
      endDate: "July 15, 2023",
      description: "Our local hospitals are experiencing shortages in emergency blood reserves. Your donation directly supports emergency care.",
      image: "https://placehold.co/600x400/red/white?text=Emergency+Reserves"
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

        {/* Urgent Requests Row - Now directly below banner for both mobile and desktop */}
        <UrgentRequestsRow requests={urgentRequests} />

        {/* Urgent Requests Alert - Mobile Only */}
        <div className="md:hidden">
          <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
            <AlertDescription className="flex items-center">
              <Heart className="h-4 w-4 mr-2 text-red-600" /> 
              {urgentRequests.length} urgent requests in your area
            </AlertDescription>
          </Alert>
        </div>

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
