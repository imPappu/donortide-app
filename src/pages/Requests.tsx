import React, { useState, useEffect } from 'react';
import TopNavbar from '@/components/TopNavbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBloodRequests } from '@/services/bloodRequestService';
import { BloodRequest } from '@/types/apiTypes';
import { sendNotification } from '@/services/notificationService';

const BloodRequestCard = ({ name, bloodType, location, urgency, postedTime, distance, hospital, notes, contactNumber }) => {
  const [responded, setResponded] = useState(false);

  const handleRespond = async () => {
    setResponded(true);
    
    toast({
      title: "Response sent",
      description: `You have responded to ${name}'s blood request.`,
    });
    
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
    window.location.href = `tel:${contactNumber || "1234567890"}`;
    
    toast({
      title: "Calling requester",
      description: `Dialing ${name}`,
    });
  };

  const nameInitial = name.charAt(0);
  
  const getBgColor = () => {
    switch (bloodType) {
      case "O-": return "bg-red-600";
      case "O+": return "bg-red-500";
      case "A-": return "bg-orange-600";
      case "A+": return "bg-orange-500";
      case "B-": return "bg-yellow-600";
      case "B+": return "bg-yellow-500";
      case "AB-": return "bg-green-600";
      case "AB+": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="mb-3 overflow-hidden border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-3">
              <AvatarImage src="" alt={name} />
              <AvatarFallback className="bg-gray-100 text-primary font-medium">
                {nameInitial}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">{name}</h3>
              <p className="text-xs text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {location} • <span className="font-medium text-green-600 ml-1">{distance}</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className={cn(
              "inline-block px-2 py-0.5 text-xs font-medium rounded-full text-white",
              getBgColor()
            )}>
              {bloodType}
            </span>
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end">
              <Clock className="h-3 w-3 mr-1" />
              {postedTime}
            </p>
          </div>
        </div>

        <div className="mb-3 bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
          <p className="text-xs"><span className="font-medium">Hospital:</span> {hospital}</p>
          {notes && <p className="text-xs mt-1 text-muted-foreground">{notes}</p>}
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            "px-2 py-0.5 text-xs font-medium rounded-full",
            urgency === "Urgent" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : 
            urgency === "High" ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" : 
            "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
          )}>
            {urgency}
          </span>
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            Needed ASAP
          </span>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-gray-50/50 dark:bg-gray-900/20 px-4 py-2">
        {responded ? (
          <div className="w-full text-center text-green-600 dark:text-green-400 text-xs font-medium py-1">
            You've responded to this request ✓
          </div>
        ) : (
          <div className="w-full flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 py-1 h-8 border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800" 
              size="sm"
              onClick={handleCall}
            >
              <Phone className="h-3.5 w-3.5 mr-1" />
              Call
            </Button>
            <Button 
              className="flex-1 py-1 h-8 bg-primary hover:bg-primary/90" 
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
  const [activeTab, setActiveTab] = useState("all");
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getBloodRequests();
      setRequests(data);
    };

    fetchRequests();
  }, []);

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

  const displayRequests = searchQuery.trim() ? filteredRequests : requests;
  
  const getFilteredRequests = () => {
    if (activeTab === "all") return displayRequests;
    if (activeTab === "nearby") return displayRequests.filter(r => parseFloat(r.distance) < 4);
    if (activeTab === "urgent") return displayRequests.filter(r => r.urgency === "Urgent");
    return displayRequests;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <TopNavbar 
        title="Blood Requests"
        showSearchBar={true}
        onSearch={handleSearch}
      />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <Alert className="mb-4 border-red-200 bg-red-50 text-red-800 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-300">
          <AlertDescription className="flex items-center">
            <DropletIcon className="h-4 w-4 mr-2" /> 
            3 urgent requests in your area
          </AlertDescription>
        </Alert>

        <Tabs 
          defaultValue="all" 
          className="mb-6"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full grid grid-cols-3 h-10">
            <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              All
            </TabsTrigger>
            <TabsTrigger value="nearby" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Nearby
            </TabsTrigger>
            <TabsTrigger value="urgent" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Urgent
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            {getFilteredRequests().length > 0 ? (
              getFilteredRequests().map((request, index) => (
                <BloodRequestCard key={index} {...request} />
              ))
            ) : (
              <div className="text-center py-8">
                <DropletIcon className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                {searchQuery.trim() ? (
                  <p className="text-center text-muted-foreground">No results matching "{searchQuery}"</p>
                ) : (
                  <p className="text-center text-muted-foreground">
                    {activeTab === "nearby" ? "No nearby requests found" : 
                     activeTab === "urgent" ? "No urgent requests found" : 
                     "No requests available"}
                  </p>
                )}
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Requests;
