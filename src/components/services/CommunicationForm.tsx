
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PhoneCall, Video, Send } from "lucide-react";
import { submitCommunicationRequest, CommunicationRequest } from "@/services/servicesService";

const CommunicationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CommunicationRequest>({
    name: "",
    phone: "",
    query: "",
    preferredMethod: "call"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMethodChange = (value: "call" | "video") => {
    setFormData(prev => ({ ...prev, preferredMethod: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.query) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await submitCommunicationRequest(formData);
      
      if (success) {
        toast({
          title: "Request Submitted",
          description: "A healthcare professional will contact you shortly",
        });
        
        // Reset form
        setFormData({
          name: "",
          phone: "",
          query: "",
          preferredMethod: "call"
        });
      } else {
        toast({
          title: "Submission Failed",
          description: "There was an error processing your request",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error processing your request",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Your contact number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="query">Your Query</Label>
        <Textarea
          id="query"
          name="query"
          placeholder="Describe what you need help with"
          rows={4}
          value={formData.query}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Preferred Contact Method</Label>
        <RadioGroup 
          value={formData.preferredMethod} 
          onValueChange={(value: "call" | "video") => handleMethodChange(value)}
          className="flex space-x-2"
        >
          <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-md flex-1 cursor-pointer hover:bg-muted">
            <RadioGroupItem value="call" id="call" />
            <Label htmlFor="call" className="flex items-center cursor-pointer">
              <PhoneCall className="h-4 w-4 mr-2" />
              Phone Call
            </Label>
          </div>
          <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-md flex-1 cursor-pointer hover:bg-muted">
            <RadioGroupItem value="video" id="video" />
            <Label htmlFor="video" className="flex items-center cursor-pointer">
              <Video className="h-4 w-4 mr-2" />
              Video Chat
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button 
        type="submit" 
        className="w-full mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          <span className="flex items-center">
            <Send className="mr-2 h-4 w-4" />
            Submit Request
          </span>
        )}
      </Button>
    </form>
  );
};

export default CommunicationForm;
