import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Users, Phone, AlertTriangle } from "lucide-react";
import { getDonors, Donor } from "@/services/dbService";
import { toast } from "@/hooks/use-toast";

const DonorCard = ({ name, bloodType, location, lastDonation, contactNumber }: Donor & { lastDonation?: string }) => {
  const handleCallClick = () => {
    // Launch phone dialer with the contact number
    window.location.href = `tel:${contactNumber}`;
    
    // Show toast notification
    toast({
      title: "Calling donor",
      description: `Dialing ${name} at ${contactNumber}`,
    });
  };
  
  return (
    <Card className="mb-3">
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 font-bold">{bloodType}</span>
            </div>
            <div>
              <h3 className="font-medium text-sm">{name}</h3>
              <p className="text-xs text-muted-foreground">{location}</p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={handleCallClick} className="h-8 px-3">
            <Phone className="h-3.5 w-3.5 mr-1" />
            Call
          </Button>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          {lastDonation && (
            <div>
              <span className="text-muted-foreground">Last Donation:</span>
              <p>{lastDonation}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Donors = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    async function fetchDonors() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getDonors();
        
        // If our API is not available yet, use mock data
        if (data.length === 0) {
          const mockDonors = [
            { name: "John Doe", bloodType: "A+", location: "New York, NY", lastDonation: "4 months ago", contactNumber: "+1 (555) 123-4567" },
            { name: "Jane Smith", bloodType: "O-", location: "Boston, MA", lastDonation: "2 months ago", contactNumber: "+1 (555) 987-6543" },
            { name: "Robert Johnson", bloodType: "B+", location: "Chicago, IL", lastDonation: "6 months ago", contactNumber: "+1 (555) 456-7890" },
            { name: "Sarah Williams", bloodType: "AB+", location: "Los Angeles, CA", lastDonation: "1 month ago", contactNumber: "+1 (555) 789-0123" },
          ];
          setDonors(mockDonors as Donor[]);
          setFilteredDonors(mockDonors as Donor[]);
          setIsError(true);
          // Show a toast when using mock data
          toast({
            title: "Using mock data",
            description: "Could not connect to database. Using sample data instead.",
            variant: "default",
          });
        } else {
          setDonors(data);
          setFilteredDonors(data);
        }
      } catch (error) {
        console.error("Error fetching donors:", error);
        setIsError(true);
        
        // Fallback to mock data
        const mockDonors = [
          { name: "John Doe", bloodType: "A+", location: "New York, NY", lastDonation: "4 months ago", contactNumber: "+1 (555) 123-4567" },
          { name: "Jane Smith", bloodType: "O-", location: "Boston, MA", lastDonation: "2 months ago", contactNumber: "+1 (555) 987-6543" },
          { name: "Robert Johnson", bloodType: "B+", location: "Chicago, IL", lastDonation: "6 months ago", contactNumber: "+1 (555) 456-7890" },
          { name: "Sarah Williams", bloodType: "AB+", location: "Los Angeles, CA", lastDonation: "1 month ago", contactNumber: "+1 (555) 789-0123" },
        ];
        setDonors(mockDonors as Donor[]);
        setFilteredDonors(mockDonors as Donor[]);
        
        toast({
          title: "Connection error",
          description: "Failed to connect to the database. Using sample data.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDonors();
  }, []);
  
  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDonors(donors);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = donors.filter(
      donor => 
        donor.name.toLowerCase().includes(query) ||
        donor.bloodType.toLowerCase().includes(query) ||
        donor.location.toLowerCase().includes(query)
    );
    
    setFilteredDonors(results);
  }, [searchQuery, donors]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filterByTab = (tab: string) => {
    if (tab === "all") {
      setFilteredDonors(donors);
    } else if (tab === "nearby") {
      // In a real app, this would filter by geolocation proximity
      // For now, we'll just show some of the donors as an example
      setFilteredDonors(donors.filter((_, i) => i < Math.ceil(donors.length / 2)));
    } else if (tab === "available") {
      // In a real app, this would check availability status
      // For now, just showing every other donor as an example
      setFilteredDonors(donors.filter((_, i) => i % 2 === 0));
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Donors</h1>
        <div className="flex items-center">
          <Users className="h-5 w-5 text-muted-foreground mr-2" />
          <span className="text-muted-foreground">{filteredDonors.length} active donors</span>
        </div>
      </div>

      {isError && (
        <Card className="mb-4 border-yellow-300">
          <CardContent className="pt-4">
            <div className="flex items-center text-yellow-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p className="text-sm">Using sample data. Database connection not available.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Search donors by name, blood type..." 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={filterByTab}>
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">All Donors</TabsTrigger>
          <TabsTrigger value="nearby" className="flex-1">Nearby</TabsTrigger>
          <TabsTrigger value="available" className="flex-1">Available</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="mt-4">
            {isLoading ? (
              <p className="text-center py-8">Loading donors...</p>
            ) : filteredDonors.length > 0 ? (
              filteredDonors.map((donor, index) => (
                <DonorCard key={index} {...donor} />
              ))
            ) : (
              <p className="text-center py-8">No donors found</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="nearby">
          <div className="mt-4">
            {isLoading ? (
              <p className="text-center py-8">Loading nearby donors...</p>
            ) : filteredDonors.length > 0 ? (
              filteredDonors.map((donor, index) => (
                <DonorCard key={index} {...donor} />
              ))
            ) : (
              <p className="text-center py-8">No nearby donors found</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="available">
          <div className="mt-4">
            {isLoading ? (
              <p className="text-center py-8">Loading available donors...</p>
            ) : filteredDonors.length > 0 ? (
              filteredDonors.map((donor, index) => (
                <DonorCard key={index} {...donor} />
              ))
            ) : (
              <p className="text-center py-8">No available donors found</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Donors;
