
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ambulance, UserPlus, PhoneCall, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("consultant");

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Consultation Requested",
      description: "A consultant will contact you shortly",
    });
  };

  const handleBookAmbulance = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ambulance Booked",
      description: "Your ambulance has been dispatched",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 mb-20">
      <h1 className="text-2xl font-bold mb-6">Services</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="consultant" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Consultant</span>
          </TabsTrigger>
          <TabsTrigger value="ambulance" className="flex items-center gap-2">
            <Ambulance className="h-4 w-4" />
            <span>Ambulance</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="consultant">
          <Card>
            <CardHeader>
              <CardTitle>Request a Blood Donation Consultant</CardTitle>
              <CardDescription>
                Our consultants can help you with donation eligibility and answer your questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitConsultation} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                    <Input id="phone" placeholder="Your phone number" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="query" className="text-sm font-medium">Your Query</label>
                  <Textarea id="query" placeholder="Describe what you need help with" rows={4} required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Contact Method</label>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" className="flex items-center gap-2 flex-1">
                      <PhoneCall className="h-4 w-4" />
                      <span>Phone Call</span>
                    </Button>
                    <Button type="button" variant="outline" className="flex items-center gap-2 flex-1">
                      <Calendar className="h-4 w-4" />
                      <span>Video Chat</span>
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">Request Consultation</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ambulance">
          <Card>
            <CardHeader>
              <CardTitle>Book an Ambulance</CardTitle>
              <CardDescription>
                Emergency services available 24/7 for blood donation patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBookAmbulance} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="patient" className="text-sm font-medium">Patient Name</label>
                    <Input id="patient" placeholder="Patient name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="emergency-contact" className="text-sm font-medium">Emergency Contact</label>
                    <Input id="emergency-contact" placeholder="Phone number" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="pickup" className="text-sm font-medium">Pickup Location</label>
                  <Input id="pickup" placeholder="Full address" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="destination" className="text-sm font-medium">Destination</label>
                  <Input id="destination" placeholder="Hospital/Clinic name and address" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">Additional Notes</label>
                  <Textarea id="notes" placeholder="Any special instructions or medical conditions" rows={2} />
                </div>
                
                <Button type="submit" className="w-full">Book Ambulance Now</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Services;
