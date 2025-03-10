
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import HomeBanner from "@/components/HomeBanner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, ThumbsUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold flex items-center">
              <Award className="h-5 w-5 text-yellow-500 mr-2" />
              Top Donors
            </h2>
            <Button variant="link" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="flex overflow-x-auto pb-2 space-x-4">
            <TooltipProvider>
              {topDonors.map((donor) => (
                <Tooltip key={donor.id}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center min-w-[80px]">
                      <Avatar className="h-14 w-14 border-2 border-primary mb-2">
                        <AvatarImage src={donor.avatar} alt={donor.name} />
                        <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-xs font-medium truncate w-full text-center">{donor.name}</div>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {donor.bloodType}
                        </Badge>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>
                      <p className="font-semibold">{donor.name}</p>
                      <p className="text-xs">{donor.donations} donations</p>
                      <p className="text-xs">Blood Type: {donor.bloodType}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar/shortcut column - visible on large screens */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Donations</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Lives Impacted</span>
                      <span className="font-medium">36</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Last Donated</span>
                      <span className="font-medium">2 months ago</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Full Profile</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-3 py-1">
                      <h4 className="font-medium">Downtown Blood Drive</h4>
                      <p className="text-sm text-muted-foreground">This Saturday, 9 AM - 5 PM</p>
                    </div>
                    <div className="border-l-4 border-primary pl-3 py-1">
                      <h4 className="font-medium">Volunteer Training</h4>
                      <p className="text-sm text-muted-foreground">Next Tuesday, 6 PM - 8 PM</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">See All Events</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Banner */}
            <HomeBanner images={bannerImages} />
            
            {/* Create post card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full justify-start text-muted-foreground h-12 px-4">
                    Share your donation story...
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* News Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className={post.isUrgent ? "border-red-500" : ""}>
                  <CardHeader className="pb-2 flex flex-row items-start gap-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{post.author.name}</CardTitle>
                        {post.isUrgent && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                      </div>
                      <CardDescription>{post.timeAgo}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{post.content}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="hover:bg-secondary cursor-pointer">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-3">
                    <div className="w-full flex items-center justify-between">
                      <Button variant="ghost" size="sm" className={post.isLiked ? "text-primary" : ""}>
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        {post.shares}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
