
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ambulance, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConsultantsList from "@/components/services/ConsultantsList";
import AmbulanceList from "@/components/services/AmbulanceList";
import { getConsultants, getAmbulances, Consultant, Ambulance as AmbulanceType } from "@/services";

const Services = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("consultant");
  
  // State for consultants
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [isLoadingConsultants, setIsLoadingConsultants] = useState(false);
  
  // State for ambulances
  const [ambulances, setAmbulances] = useState<AmbulanceType[]>([]);
  const [isLoadingAmbulances, setIsLoadingAmbulances] = useState(false);

  // Fetch consultants when the consultant tab is active
  useEffect(() => {
    if (activeTab === "consultant") {
      fetchConsultants();
    }
  }, [activeTab]);

  // Fetch ambulances when the ambulance tab is active
  useEffect(() => {
    if (activeTab === "ambulance") {
      fetchAmbulances();
    }
  }, [activeTab]);

  // Function to fetch consultants
  const fetchConsultants = async () => {
    setIsLoadingConsultants(true);
    try {
      const data = await getConsultants();
      setConsultants(data);
    } catch (error) {
      console.error("Error fetching consultants:", error);
      toast({
        title: "Error",
        description: "Failed to load consultants. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingConsultants(false);
    }
  };

  // Function to fetch ambulances
  const fetchAmbulances = async () => {
    setIsLoadingAmbulances(true);
    try {
      const data = await getAmbulances();
      setAmbulances(data);
    } catch (error) {
      console.error("Error fetching ambulances:", error);
      toast({
        title: "Error",
        description: "Failed to load ambulances. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAmbulances(false);
    }
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
              <CardTitle>Blood Donation Consultants</CardTitle>
              <CardDescription>
                Speak with specialist consultants about blood donation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ConsultantsList 
                consultants={consultants} 
                isLoading={isLoadingConsultants} 
              />
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
              <AmbulanceList 
                ambulances={ambulances} 
                isLoading={isLoadingAmbulances} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Services;
