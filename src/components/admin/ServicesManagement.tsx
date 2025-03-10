
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Ambulance } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  getConsultants, 
  getAmbulances, 
  Consultant, 
  Ambulance as AmbulanceType,
  addConsultant,
  updateConsultant,
  deleteConsultant,
  addAmbulance,
  updateAmbulance,
  deleteAmbulance
} from "@/services/servicesService";
import ConsultantManagement from "./services/ConsultantManagement";
import AmbulanceManagement from "./services/AmbulanceManagement";

const ServicesManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("consultants");
  const [isLoading, setIsLoading] = useState(false);
  
  // State for consultants
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  
  // State for ambulances
  const [ambulances, setAmbulances] = useState<AmbulanceType[]>([]);
  
  // Fetch consultants and ambulances when the component mounts
  useEffect(() => {
    fetchConsultants();
    fetchAmbulances();
  }, []);

  const fetchConsultants = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const fetchAmbulances = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  // Consultant CRUD operations
  const handleAddConsultant = async (consultant: Omit<Consultant, 'id'>) => {
    try {
      await addConsultant(consultant);
      fetchConsultants();
      toast({
        title: "Success",
        description: "Consultant added successfully",
      });
    } catch (error) {
      console.error("Error adding consultant:", error);
      toast({
        title: "Error",
        description: "Failed to add consultant",
        variant: "destructive",
      });
    }
  };

  const handleUpdateConsultant = async (consultant: Consultant) => {
    try {
      await updateConsultant(consultant);
      fetchConsultants();
      toast({
        title: "Success",
        description: "Consultant updated successfully",
      });
    } catch (error) {
      console.error("Error updating consultant:", error);
      toast({
        title: "Error",
        description: "Failed to update consultant",
        variant: "destructive",
      });
    }
  };

  const handleDeleteConsultant = async (id: number) => {
    try {
      await deleteConsultant(id);
      fetchConsultants();
      toast({
        title: "Success",
        description: "Consultant deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting consultant:", error);
      toast({
        title: "Error",
        description: "Failed to delete consultant",
        variant: "destructive",
      });
    }
  };

  // Ambulance CRUD operations
  const handleAddAmbulance = async (ambulance: Omit<AmbulanceType, 'id'>) => {
    try {
      await addAmbulance(ambulance);
      fetchAmbulances();
      toast({
        title: "Success",
        description: "Ambulance added successfully",
      });
    } catch (error) {
      console.error("Error adding ambulance:", error);
      toast({
        title: "Error",
        description: "Failed to add ambulance",
        variant: "destructive",
      });
    }
  };

  const handleUpdateAmbulance = async (ambulance: AmbulanceType) => {
    try {
      await updateAmbulance(ambulance);
      fetchAmbulances();
      toast({
        title: "Success",
        description: "Ambulance updated successfully",
      });
    } catch (error) {
      console.error("Error updating ambulance:", error);
      toast({
        title: "Error",
        description: "Failed to update ambulance",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAmbulance = async (id: number) => {
    try {
      await deleteAmbulance(id);
      fetchAmbulances();
      toast({
        title: "Success",
        description: "Ambulance deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting ambulance:", error);
      toast({
        title: "Error",
        description: "Failed to delete ambulance",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Services Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="consultants" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Consultants</span>
            </TabsTrigger>
            <TabsTrigger value="ambulances" className="flex items-center gap-2">
              <Ambulance className="h-4 w-4" />
              <span>Ambulances</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="consultants">
            <ConsultantManagement 
              consultants={consultants} 
              isLoading={isLoading}
              onAdd={handleAddConsultant}
              onUpdate={handleUpdateConsultant}
              onDelete={handleDeleteConsultant}
            />
          </TabsContent>
          
          <TabsContent value="ambulances">
            <AmbulanceManagement 
              ambulances={ambulances} 
              isLoading={isLoading}
              onAdd={handleAddAmbulance}
              onUpdate={handleUpdateAmbulance}
              onDelete={handleDeleteAmbulance}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServicesManagement;
