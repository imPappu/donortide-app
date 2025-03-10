
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Phone, Calendar, Award } from "lucide-react";

const VolunteerApplicationTab = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    skills: "",
    availability: "",
    experience: "",
    motivation: "",
    location: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Application submitted",
        description: "We'll review your volunteer application and get back to you soon.",
      });
      
      // Reset form
      setFormData({
        skills: "",
        availability: "",
        experience: "",
        motivation: "",
        location: "",
        phone: ""
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Become a Volunteer</h3>
        <p className="text-sm text-muted-foreground">
          Help save lives in your community by volunteering with us
        </p>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium">Volunteer Benefits</h4>
              <p className="text-xs text-muted-foreground">
                Special recognition, community service hours, and more
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Input 
            id="skills" 
            name="skills"
            placeholder="What skills can you contribute?" 
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="availability">Availability</Label>
          <Select 
            onValueChange={(value) => handleSelectChange("availability", value)}
            value={formData.availability}
          >
            <SelectTrigger id="availability">
              <SelectValue placeholder="Select your availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekdays">Weekdays</SelectItem>
              <SelectItem value="weekends">Weekends</SelectItem>
              <SelectItem value="evenings">Evenings</SelectItem>
              <SelectItem value="mornings">Mornings</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="experience">Prior Experience</Label>
          <Textarea 
            id="experience" 
            name="experience"
            placeholder="Describe any previous volunteer or related experience" 
            value={formData.experience}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="motivation">Motivation</Label>
          <Textarea 
            id="motivation" 
            name="motivation"
            placeholder="Why do you want to volunteer with us?" 
            value={formData.motivation}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="location" 
              name="location"
              className="pl-9" 
              placeholder="Your location" 
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="phone" 
              name="phone"
              className="pl-9" 
              placeholder="Your phone number" 
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting Application..." : "Apply as Volunteer"}
        </Button>
      </form>
    </div>
  );
};

export default VolunteerApplicationTab;
