
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import HomeBanner from "@/components/HomeBanner";
import TopDonorsRow from "@/components/home/TopDonorsRow";
import HomeSidebar from "@/components/home/HomeSidebar";
import CreatePostCard from "@/components/home/CreatePostCard";
import NewsFeedPost from "@/components/home/NewsFeedPost";

const Home = () => {
  // Sample banner images
  const bannerImages = [
    {
      src: "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
      alt: "Join our blood donation drive this weekend",
      url: "/donate",
    },
    {
      src: "https://images.unsplash.com/photo-1615461066841-6116e61059e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
      alt: "Volunteer opportunities available now",
      url: "/volunteers",
    },
    {
      src: "https://images.unsplash.com/photo-1612367289789-36526896fee7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
      alt: "Learn about blood compatibility",
      url: "/blog",
    },
  ];

  // Top donors
  const topDonors = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      donations: 24,
      bloodType: "O-",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      donations: 18,
      bloodType: "A+",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      donations: 15,
      bloodType: "B+",
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      donations: 12,
      bloodType: "AB-",
    },
    {
      id: 5,
      name: "Olivia Wilson",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      donations: 10,
      bloodType: "O+",
    },
  ];

  // Sample newsfeed posts
  const posts = [
    {
      id: 1,
      author: {
        name: "Jane Cooper",
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      },
      timeAgo: "3 hours ago",
      content: "Just donated blood for the first time! The process was so smooth and the staff were very friendly. Feeling good about making a difference today! 💉❤️",
      likes: 42,
      comments: 8,
      shares: 3,
      isLiked: true,
      tags: ["firsttime", "blooddonation"],
    },
    {
      id: 2,
      author: {
        name: "Robert Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      timeAgo: "Yesterday",
      content: "Our community blood drive exceeded expectations with over 200 donors! Thanks to everyone who participated and helped save lives. See you at the next one!",
      likes: 128,
      comments: 24,
      shares: 17,
      isLiked: false,
      tags: ["community", "blooddrive", "thankyou"],
    },
    {
      id: 3,
      author: {
        name: "City Hospital",
        avatar: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
      },
      timeAgo: "2 days ago",
      content: "URGENT: We're experiencing a critical shortage of O-negative blood type. If you're O-negative, please consider donating this week. Your donation could save multiple lives!",
      likes: 256,
      comments: 43,
      shares: 89,
      isLiked: false,
      tags: ["urgent", "onegative", "savealife"],
      isUrgent: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavbar showSearchBar={true} />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {/* Top Donors Row */}
        <TopDonorsRow donors={topDonors} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar/shortcut column - visible on large screens */}
          <HomeSidebar />
          
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Banner */}
            <HomeBanner images={bannerImages} />
            
            {/* Create post card */}
            <CreatePostCard />
            
            {/* News Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <NewsFeedPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
