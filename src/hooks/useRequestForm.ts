
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { createBloodRequest } from "@/services/dbService";
import { useNavigate } from "react-router-dom";
import { BloodRequest } from "@/types/apiTypes";

export function useRequestForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Blood request form state
  const [requestForm, setRequestForm] = useState<BloodRequest>({
    patientName: '',
    bloodType: '',
    hospital: '',
    location: '',
    contactNumber: '',
    urgency: 'Standard',
    notes: ''
  });
  
  // Blood type selection handler for request form
  const handleRequestBloodTypeSelect = (type: string) => {
    setRequestForm({...requestForm, bloodType: type});
  };
  
  // Urgency level selection handler
  const handleUrgencySelect = (level: 'Standard' | 'High' | 'Urgent') => {
    setRequestForm({...requestForm, urgency: level});
  };
  
  // Handle request form input changes
  const handleRequestInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setRequestForm({...requestForm, [id.replace('request-', '')]: value});
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

  return {
    requestForm,
    isSubmitting,
    handleRequestBloodTypeSelect,
    handleUrgencySelect,
    handleRequestInputChange,
    handleRequestSubmit
  };
}
