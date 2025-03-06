
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropletIcon, 
  Users, 
  Bell, 
  PlusCircle, 
  MapPin,
  Heart,
  ArrowRight
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Heart className="h-6 w-6 text-red-500 mr-2" />
          DonorTide
        </h1>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
        <AlertDescription className="flex items-center">
          <DropletIcon className="h-4 w-4 mr-2" /> 
          3 urgent requests in your area
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Link to="/donors">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium text-center">Find Donors</h3>
            </CardContent>
          </Card>
        </Link>
        <Link to="/create">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center">
              <PlusCircle className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium text-center">Request Blood</h3>
            </CardContent>
          </Card>
        </Link>
        <Link to="/requests">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center">
              <Bell className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium text-center">View Requests</h3>
            </CardContent>
          </Card>
        </Link>
        <Link to="/profile">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center">
              <DropletIcon className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium text-center">My Donations</h3>
            </CardContent>
          </Card>
        </Link>
      </div>

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
          <Button variant="outline" size="sm" className="w-full">Learn More</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
