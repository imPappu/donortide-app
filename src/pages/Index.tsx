
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowRight,
  MapPin,
  User,
  MessageSquare,
  Award
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import HomeBanner from "@/components/HomeBanner";
import TopDonors from "@/components/TopDonors";
import TopNavbar from "@/components/TopNavbar";

const Index = () => {
  const urgentRequests = [
    {
      name: "Emily Johnson",
      bloodType: "O-",
      location: "Memorial Hospital",
      distance: "2.5 miles",
      urgency: "Urgent",
      postedTime: "30 min ago"
    },
    {
      name: "Michael Chen",
      bloodType: "A+",
      location: "City Medical Center",
      distance: "4.2 miles",
      urgency: "High",
      postedTime: "2 hours ago"
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
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        {/* Banner Slider */}
        <div className="mb-6">
          <HomeBanner images={bannerImages} />
        </div>

        <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
          <AlertDescription className="flex items-center">
            <Heart className="h-4 w-4 mr-2 text-red-600" /> 
            3 urgent requests in your area
          </AlertDescription>
        </Alert>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link to="/requests">
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <Heart className="h-8 w-8 text-red-500 mb-2" />
                <h3 className="font-medium text-center">Blood Requests</h3>
              </CardContent>
            </Card>
          </Link>
          <Link to="/donors">
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <User className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium text-center">Find Donors</h3>
              </CardContent>
            </Card>
          </Link>
          <Link to="/donate">
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <Award className="h-8 w-8 text-amber-500 mb-2" />
                <h3 className="font-medium text-center">Donate Items</h3>
              </CardContent>
            </Card>
          </Link>
          <Link to="/community">
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <MessageSquare className="h-8 w-8 text-blue-500 mb-2" />
                <h3 className="font-medium text-center">Community</h3>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Urgent Requests */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Urgent Requests</h2>
            <Link to="/requests" className="text-sm text-primary flex items-center">
              View all <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
          {urgentRequests.map((request, index) => (
            <Card key={index} className="mb-3">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                        <span className="text-red-600 font-bold text-xs">{request.bloodType}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{request.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {request.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <Link to={`/requests`}>Respond</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* User Stories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Stories</h2>
            <Link to="/stories" className="text-sm text-primary flex items-center">
              View all <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
          
          {recentStories.map(story => (
            <Card key={story.id} className="mb-3">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-sm">{story.userName}</h3>
                      {story.badge && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Award className="h-3 w-3 mr-1" />
                          {story.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <h4 className="font-medium mb-1">{story.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{story.excerpt}</p>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="flex items-center mr-3">
                    <Heart className="h-3 w-3 mr-1" />
                    {story.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {story.comments}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Community Posts */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Community Activity</h2>
            <Link to="/community" className="text-sm text-primary flex items-center">
              View all <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
          
          {recentCommunityPosts.map(post => (
            <Card key={post.id} className="mb-3">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{post.userName}</h3>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                
                <p className="text-sm mb-2">{post.content}</p>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="flex items-center mr-3">
                    <Heart className="h-3 w-3 mr-1" />
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {post.comments}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top/Recent Donors Section */}
        <div className="mb-6">
          <TopDonors />
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Blood Donation Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                One donation can save up to three lives
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                Every two seconds someone needs blood
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                Type O- is a universal donor blood type
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/blog">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
