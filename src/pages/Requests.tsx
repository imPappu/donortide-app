
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Calendar, DropletIcon, Phone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { sendNotification } from "@/services/dbService";
import TopNavbar from "@/components/TopNavbar";

const BloodRequestCard = ({ name, bloodType, location, urgency, postedTime, distance, hospital, notes, contactNumber }) => {
  const [responded, setResponded] = useState(false);

  const handleRespond = async () => {
    setResponded(true);
    
    // Show toast notification
    toast({
      title: "Response sent",
      description: `You have responded to ${name}'s blood request.`,
    });
    
    // Send push notification to the requester
    try {
      await sendNotification({
        title: `Response to your ${bloodType} blood request`,
        message: `A donor has responded to your blood request at ${hospital}. They will contact you soon.`,
        targetType: 'specific_users',
        targetData: { requesterId: name.replace(/\s+/g, '-').toLowerCase() }
      });
    } catch (error) {
      console.error("Failed to send push notification:", error);
    }
  };
  
  const handleCall = () => {
    // Launch phone dialer with the contact number
    window.location.href = `tel:${contactNumber || "1234567890"}`;
    
    toast({
      title: "Calling requester",
      description: `Dialing ${name}`,
    });
  };

  return (
    <Card className="mb-3">
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
              <DropletIcon className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{name}</h3>
              <p className="text-xs text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {location} • {distance}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-600">
              {bloodType}
            </span>
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end">
              <Clock className="h-3 w-3 mr-1" />
              {postedTime}
            </p>
          </div>
        </div>

        <div className="mb-2">
          <p className="text-xs"><span className="font-medium">Hospital:</span> {hospital}</p>
          {notes && <p className="text-xs mt-1">{notes}</p>}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
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

      <CardFooter className="border-t bg-muted/20 px-4 py-2">
        {responded ? (
          <div className="w-full text-center text-green-600 text-xs font-medium">
            You've responded to this request
          </div>
        ) : (
          <div className="w-full flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 py-1 h-8" 
              size="sm"
              onClick={handleCall}
            >
              <Phone className="h-3.5 w-3.5 mr-1" />
              Call
            </Button>
            <Button 
              className="flex-1 py-1 h-8" 
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  
  const requests = [
    {
      name: "Emily Johnson",
      bloodType: "O-",
      location: "Memorial Hospital",
      distance: "2.5 miles",
      urgency: "Urgent",
      postedTime: "30 min ago",
      hospital: "Memorial Hospital, Floor 3, Room 302",
      notes: "Needed for emergency surgery, any donors welcome.",
      contactNumber: "555-123-4567"
    },
    {
      name: "Michael Chen",
      bloodType: "A+",
      location: "City Medical Center",
      distance: "4.2 miles",
      urgency: "High",
      postedTime: "2 hours ago",
      hospital: "City Medical Center, ER Department",
      notes: "Patient needs blood for scheduled surgery tomorrow morning.",
      contactNumber: "555-987-6543"
    },
    {
      name: "Sophia Martinez",
      bloodType: "B-",
      location: "University Hospital",
      distance: "3.7 miles",
      urgency: "Medium",
      postedTime: "5 hours ago",
      hospital: "University Hospital, Hematology Department",
      notes: "Needed for a patient with ongoing treatment.",
      contactNumber: "555-456-7890"
    }
  ];

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredRequests([]);
      return;
    }
    
    const filtered = requests.filter(
      request => 
        request.name.toLowerCase().includes(query.toLowerCase()) ||
        request.bloodType.toLowerCase().includes(query.toLowerCase()) ||
        request.location.toLowerCase().includes(query.toLowerCase()) ||
        request.hospital.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredRequests(filtered);
  };

  // Determine which requests to display
  const displayRequests = searchQuery.trim() ? filteredRequests : requests;

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar 
        title="Blood Requests"
        showSearchBar={true}
        onSearch={handleSearch}
      />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <Alert className="mb-4 border-red-200 bg-red-50 text-red-800">
          <AlertDescription className="flex items-center">
            <DropletIcon className="h-4 w-4 mr-2" /> 
            3 urgent requests in your area
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="nearby" className="flex-1">Nearby</TabsTrigger>
            <TabsTrigger value="urgent" className="flex-1">Urgent</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="mt-4">
              {displayRequests.length > 0 ? (
                displayRequests.map((request, index) => (
                  <BloodRequestCard key={index} {...request} />
                ))
              ) : (
                searchQuery.trim() ? (
                  <p className="text-center py-4 text-muted-foreground">No results matching "{searchQuery}"</p>
                ) : (
                  <p className="text-center py-4 text-muted-foreground">No requests available</p>
                )
              )}
            </div>
          </TabsContent>
          <TabsContent value="nearby">
            <div className="mt-4">
              {displayRequests.filter(r => parseFloat(r.distance) < 4).length > 0 ? (
                displayRequests
                  .filter(r => parseFloat(r.distance) < 4)
                  .map((request, index) => (
                    <BloodRequestCard key={index} {...request} />
                  ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No nearby requests found</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="urgent">
            <div className="mt-4">
              {displayRequests.filter(r => r.urgency === "Urgent").length > 0 ? (
                displayRequests
                  .filter(r => r.urgency === "Urgent")
                  .map((request, index) => (
                    <BloodRequestCard key={index} {...request} />
                  ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No urgent requests found</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Requests;
