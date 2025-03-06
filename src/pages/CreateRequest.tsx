
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropletIcon, MapPin, Phone, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { createBloodRequest, registerDonor } from "@/services/dbService";
import { useNavigate } from "react-router-dom";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["Standard", "High", "Urgent"];

const CreateRequest = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Blood request form state
  const [requestForm, setRequestForm] = useState({
    patientName: '',
    bloodType: '',
    hospital: '',
    location: '',
    contactNumber: '',
    urgency: 'Standard' as 'Standard' | 'High' | 'Urgent',
    notes: ''
  });
  
  // Donor registration form state
  const [donorForm, setDonorForm] = useState({
    name: '',
    bloodType: '',
    location: '',
    contactNumber: ''
  });
  
  // Blood type selection handler for request form
  const handleRequestBloodTypeSelect = (type: string) => {
    setRequestForm({...requestForm, bloodType: type});
  };
  
  // Urgency level selection handler
  const handleUrgencySelect = (level: 'Standard' | 'High' | 'Urgent') => {
    setRequestForm({...requestForm, urgency: level});
  };
  
  // Blood type selection handler for donor form
  const handleDonorBloodTypeSelect = (type: string) => {
    setDonorForm({...donorForm, bloodType: type});
  };
  
  // Handle request form input changes
  const handleRequestInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setRequestForm({...requestForm, [id.replace('request-', '')]: value});
  };
  
  // Handle donor form input changes
  const handleDonorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDonorForm({...donorForm, [id.replace('donor-', '')]: value});
  };
  
  // Submit blood request
  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.bloodType) {
      toast({
        title: "Blood type required",
        description: "Please select a blood type for the request.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await createBloodRequest(requestForm);
      if (response) {
        toast({
          title: "Request created",
          description: "Your blood request has been created successfully."
        });
        navigate('/requests');
      } else {
        toast({
          title: "Error",
          description: "There was a problem creating your request. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error creating request:", error);
      toast({
        title: "Server error",
        description: "Could not connect to the server. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Submit donor registration
  const handleDonorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorForm.bloodType) {
      toast({
        title: "Blood type required",
        description: "Please select your blood type.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await registerDonor(donorForm);
      if (response) {
        toast({
          title: "Registration successful",
          description: "You have been registered as a donor successfully."
        });
        navigate('/donors');
      } else {
        toast({
          title: "Error",
          description: "There was a problem with your registration. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error registering donor:", error);
      toast({
        title: "Server error",
        description: "Could not connect to the server. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <form onSubmit={handleRequestSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="request-patientName">Patient Name</Label>
                  <Input 
                    id="request-patientName" 
                    placeholder="Full name of the patient" 
                    required 
                    value={requestForm.patientName}
                    onChange={handleRequestInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blood-type">Blood Type Required</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodTypes.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={requestForm.bloodType === type ? "default" : "outline"}
                        className={`flex items-center justify-center h-12 ${
                          requestForm.bloodType === type ? "bg-primary" : ""
                        }`}
                        onClick={() => handleRequestBloodTypeSelect(type)}
                      >
                        <DropletIcon className="h-4 w-4 mr-1 text-red-500" />
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="request-hospital">Hospital/Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="request-hospital" 
                      className="pl-9" 
                      placeholder="Hospital name and address" 
                      required 
                      value={requestForm.hospital}
                      onChange={handleRequestInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="request-location">City/Area</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="request-location" 
                      className="pl-9" 
                      placeholder="City or area" 
                      required 
                      value={requestForm.location}
                      onChange={handleRequestInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="request-contactNumber">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="request-contactNumber" 
                      className="pl-9" 
                      placeholder="Your contact number" 
                      required 
                      type="tel" 
                      value={requestForm.contactNumber}
                      onChange={handleRequestInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {urgencyLevels.map((level) => (
                      <Button
                        key={level}
                        type="button"
                        variant={requestForm.urgency === level ? "default" : "outline"}
                        className={level === "Urgent" && requestForm.urgency === level ? "bg-red-500 hover:bg-red-600" : ""}
                        onClick={() => handleUrgencySelect(level as 'Standard' | 'High' | 'Urgent')}
                      >
                        {level === "Urgent" && <AlertCircle className="h-4 w-4 mr-1" />}
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="request-notes">Additional Notes</Label>
                  <textarea
                    id="request-notes"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Any additional information or special requirements..."
                    value={requestForm.notes}
                    onChange={handleRequestInputChange}
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Blood Request"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="donate">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Donor Registration</CardTitle>
            </CardHeader>
            <form onSubmit={handleDonorSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="donor-name">Your Name</Label>
                  <Input 
                    id="donor-name" 
                    placeholder="Your full name" 
                    required 
                    value={donorForm.name}
                    onChange={handleDonorInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donor-blood-type">Your Blood Type</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodTypes.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={donorForm.bloodType === type ? "default" : "outline"}
                        className={`flex items-center justify-center h-12 ${
                          donorForm.bloodType === type ? "bg-primary" : ""
                        }`}
                        onClick={() => handleDonorBloodTypeSelect(type)}
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
                    <Input 
                      id="donor-location" 
                      className="pl-9" 
                      placeholder="Your current location" 
                      required 
                      value={donorForm.location}
                      onChange={handleDonorInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donor-contactNumber">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="donor-contactNumber" 
                      className="pl-9" 
                      placeholder="Your contact number" 
                      required 
                      type="tel" 
                      value={donorForm.contactNumber}
                      onChange={handleDonorInputChange}
                    />
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
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register as Donor"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateRequest;
