
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropletIcon, MapPin, Phone, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["Standard", "High", "Urgent"];

const CreateRequest = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Request created",
      description: "Your blood request has been created successfully."
    });
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create Request</h1>
      </div>

      <Tabs defaultValue="request" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="request" className="flex-1">Request Blood</TabsTrigger>
          <TabsTrigger value="donate" className="flex-1">Donate Blood</TabsTrigger>
        </TabsList>
        
        <TabsContent value="request">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Blood Request Form</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-name">Patient Name</Label>
                  <Input id="patient-name" placeholder="Full name of the patient" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blood-type">Blood Type Required</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodTypes.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant="outline"
                        className="flex items-center justify-center h-12"
                      >
                        <DropletIcon className="h-4 w-4 mr-1 text-red-500" />
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hospital">Hospital/Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="hospital" className="pl-9" placeholder="Hospital name and address" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="contact" className="pl-9" placeholder="Your contact number" required type="tel" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {urgencyLevels.map((level) => (
                      <Button
                        key={level}
                        type="button"
                        variant={level === "Urgent" ? "default" : "outline"}
                        className={level === "Urgent" ? "bg-red-500 hover:bg-red-600" : ""}
                      >
                        {level === "Urgent" && <AlertCircle className="h-4 w-4 mr-1" />}
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <textarea
                    id="notes"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Any additional information or special requirements..."
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full">Create Blood Request</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="donate">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Donor Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="donor-name">Your Name</Label>
                <Input id="donor-name" placeholder="Your full name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="donor-blood-type">Your Blood Type</Label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodTypes.map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant="outline"
                      className="flex items-center justify-center h-12"
                    >
                      <DropletIcon className="h-4 w-4 mr-1 text-red-500" />
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="donor-location">Your Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="donor-location" className="pl-9" placeholder="Your current location" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="donor-contact">Contact Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="donor-contact" className="pl-9" placeholder="Your contact number" required type="tel" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Availability</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button type="button" variant="outline">Weekdays</Button>
                  <Button type="button" variant="outline">Weekends</Button>
                  <Button type="button" variant="outline">Mornings</Button>
                  <Button type="button" variant="outline">Evenings</Button>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full">Register as Donor</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateRequest;
