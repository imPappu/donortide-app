
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Clock, Calendar, DropletIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

const BloodRequestCard = ({ name, bloodType, location, urgency, postedTime, distance, hospital, notes }) => {
  const [responded, setResponded] = useState(false);

  const handleRespond = () => {
    setResponded(true);
    toast({
      title: "Response sent",
      description: `You have responded to ${name}'s blood request.`,
    });
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <DropletIcon className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {location} • {distance}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
              {bloodType}
            </span>
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end">
              <Clock className="h-3 w-3 mr-1" />
              {postedTime}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm"><span className="font-medium">Hospital:</span> {hospital}</p>
          {notes && <p className="text-sm mt-1">{notes}</p>}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            urgency === "Urgent" ? "bg-red-100 text-red-600" : 
            urgency === "High" ? "bg-orange-100 text-orange-600" : 
            "bg-yellow-100 text-yellow-600"
          }`}>
            {urgency}
          </span>
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            Needed ASAP
          </span>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/20 px-6 py-3">
        {responded ? (
          <div className="w-full text-center text-green-600 text-sm font-medium">
            You've responded to this request
          </div>
        ) : (
          <div className="w-full flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1" 
              size="sm"
            >
              Message
            </Button>
            <Button 
              className="flex-1" 
              size="sm"
              onClick={handleRespond}
            >
              Respond
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

const Requests = () => {
  const requests = [
    {
      name: "Emily Johnson",
      bloodType: "O-",
      location: "Memorial Hospital",
      distance: "2.5 miles",
      urgency: "Urgent",
      postedTime: "30 min ago",
      hospital: "Memorial Hospital, Floor 3, Room 302",
      notes: "Needed for emergency surgery, any donors welcome."
    },
    {
      name: "Michael Chen",
      bloodType: "A+",
      location: "City Medical Center",
      distance: "4.2 miles",
      urgency: "High",
      postedTime: "2 hours ago",
      hospital: "City Medical Center, ER Department",
      notes: "Patient needs blood for scheduled surgery tomorrow morning."
    },
    {
      name: "Sophia Martinez",
      bloodType: "B-",
      location: "University Hospital",
      distance: "3.7 miles",
      urgency: "Medium",
      postedTime: "5 hours ago",
      hospital: "University Hospital, Hematology Department",
      notes: "Needed for a patient with ongoing treatment."
    }
  ];

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blood Requests</h1>
      </div>

      <Alert className="mb-4 border-red-200 bg-red-50 text-red-800">
        <AlertDescription className="flex items-center">
          <DropletIcon className="h-4 w-4 mr-2" /> 
          3 urgent requests in your area
        </AlertDescription>
      </Alert>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search by location, blood type..." />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          <TabsTrigger value="nearby" className="flex-1">Nearby</TabsTrigger>
          <TabsTrigger value="urgent" className="flex-1">Urgent</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="mt-4">
            {requests.map((request, index) => (
              <BloodRequestCard key={index} {...request} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="nearby">
          <div className="mt-4">
            {requests.filter(r => parseFloat(r.distance) < 4).map((request, index) => (
              <BloodRequestCard key={index} {...request} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="urgent">
          <div className="mt-4">
            {requests.filter(r => r.urgency === "Urgent").map((request, index) => (
              <BloodRequestCard key={index} {...request} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Requests;
