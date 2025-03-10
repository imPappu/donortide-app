
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Consultant,
  getConsultants, 
  addConsultant,
  updateConsultant,
  deleteConsultant
} from "@/services";

export function useConsultantManagement() {
  const { toast } = useToast();
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return {
    consultants,
    isLoading,
    fetchConsultants,
    handleAddConsultant,
    handleUpdateConsultant,
    handleDeleteConsultant
  };
}
