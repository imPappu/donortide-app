
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Users } from "lucide-react";

const DonorCard = ({ name, bloodType, location, lastDonation, contactNumber }) => (
  <Card className="mb-4">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 font-bold">{bloodType}</span>
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
        <Button size="sm" variant="outline">Contact</Button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Last Donation:</span>
          <p>{lastDonation}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Contact:</span>
          <p>{contactNumber}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Donors = () => {
  const donors = [
    { name: "John Doe", bloodType: "A+", location: "New York, NY", lastDonation: "4 months ago", contactNumber: "+1 (555) 123-4567" },
    { name: "Jane Smith", bloodType: "O-", location: "Boston, MA", lastDonation: "2 months ago", contactNumber: "+1 (555) 987-6543" },
    { name: "Robert Johnson", bloodType: "B+", location: "Chicago, IL", lastDonation: "6 months ago", contactNumber: "+1 (555) 456-7890" },
    { name: "Sarah Williams", bloodType: "AB+", location: "Los Angeles, CA", lastDonation: "1 month ago", contactNumber: "+1 (555) 789-0123" },
  ];

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Donors</h1>
        <div className="flex items-center">
          <Users className="h-5 w-5 text-muted-foreground mr-2" />
          <span className="text-muted-foreground">{donors.length} active donors</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search donors by name, blood type..." />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">All Donors</TabsTrigger>
          <TabsTrigger value="nearby" className="flex-1">Nearby</TabsTrigger>
          <TabsTrigger value="available" className="flex-1">Available</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="mt-4">
            {donors.map((donor, index) => (
              <DonorCard key={index} {...donor} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="nearby">
          <div className="mt-4">
            {donors.filter((_, i) => i < 2).map((donor, index) => (
              <DonorCard key={index} {...donor} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="available">
          <div className="mt-4">
            {donors.filter((_, i) => i % 2 === 0).map((donor, index) => (
              <DonorCard key={index} {...donor} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Donors;
