
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { registerDonor } from "@/services/donorService";
import { useNavigate } from "react-router-dom";
import { Donor } from "@/types/apiTypes";

export function useDonorForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Donor registration form state
  const [donorForm, setDonorForm] = useState<Partial<Donor>>({
    name: '',
    bloodType: '',
    location: '',
    contactNumber: '',
    totalDonations: 0,
    availableForEmergency: true,
    createdAt: new Date().toISOString()
  });
  
  // Blood type selection handler for donor form
  const handleDonorBloodTypeSelect = (type: string) => {
    setDonorForm({...donorForm, bloodType: type});
  };
  
  // Handle donor form input changes
  const handleDonorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDonorForm({...donorForm, [id.replace('donor-', '')]: value});
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
      const response = await registerDonor(donorForm as Donor);
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

  return {
    donorForm,
    isSubmitting,
    handleDonorBloodTypeSelect,
    handleDonorInputChange,
    handleDonorSubmit
  };
}
