
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Ambulance,
  getAmbulances, 
  addAmbulance,
  updateAmbulance,
  deleteAmbulance
} from "@/services";

export function useAmbulanceManagement() {
  const { toast } = useToast();
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAddAmbulance = async (ambulance: Omit<Ambulance, 'id'>) => {
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

  const handleUpdateAmbulance = async (ambulance: Ambulance) => {
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

  return {
    ambulances,
    isLoading,
    fetchAmbulances,
    handleAddAmbulance,
    handleUpdateAmbulance,
    handleDeleteAmbulance
  };
}
