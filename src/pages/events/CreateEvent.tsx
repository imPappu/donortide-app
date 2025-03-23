
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, ImageIcon, MapPin, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import TopNavbar from '@/components/TopNavbar';
import Navigation from '@/components/Navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EventFormData {
  title: string;
  description: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  location: string;
  isPaid: boolean;
  price?: number;
  currency?: string;
  maxAttendees?: number;
  imageUrl?: string;
}

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    startDate: undefined,
    endDate: undefined,
    location: "",
    isPaid: false,
    price: undefined,
    currency: "USD",
    maxAttendees: undefined,
    imageUrl: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value ? parseFloat(value) : undefined }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPaid: checked }));
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ 
      ...prev, 
      startDate: date,
      // If end date is before start date, update it
      endDate: prev.endDate && date && prev.endDate < date ? date : prev.endDate
    }));
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, endDate: date }));
  };

  const handleCurrencyChange = (value: string) => {
    setFormData(prev => ({ ...prev, currency: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title) {
      toast({ title: "Missing title", description: "Please provide a title for your event" });
      return;
    }
    if (!formData.startDate) {
      toast({ title: "Missing start date", description: "Please select a start date for your event" });
      return;
    }
    if (!formData.location) {
      toast({ title: "Missing location", description: "Please provide a location for your event" });
      return;
    }
    if (formData.isPaid && !formData.price) {
      toast({ title: "Missing price", description: "Please set a price for your paid event" });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      
      toast({
        title: "Event created successfully",
        description: "Your event has been published to the community",
      });
      
      navigate('/events'); // Redirect to events page
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Failed to create event",
        description: "There was an error creating your event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Create Event" showBackButton={true} />
      
      <div className="container mx-auto px-4 py-6 pb-20 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
              Create New Event
            </CardTitle>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your event..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal mt-1"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? format(formData.startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={handleStartDateChange}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal mt-1"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={handleEndDateChange}
                          initialFocus
                          disabled={(date) => 
                            date < new Date() || 
                            (formData.startDate ? date < formData.startDate : false)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative mt-1">
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter event location"
                      className="pl-9"
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      title="Upload image (coming soon)"
                    >
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPaid"
                    checked={formData.isPaid}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="isPaid">This is a paid event</Label>
                </div>
                
                {formData.isPaid && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-l-primary/20">
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price || ""}
                        onChange={handleNumberChange}
                        placeholder="Enter price"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={formData.currency}
                        onValueChange={handleCurrencyChange}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="INR">INR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                  <div className="relative mt-1">
                    <Input
                      id="maxAttendees"
                      name="maxAttendees"
                      type="number"
                      min="1"
                      value={formData.maxAttendees || ""}
                      onChange={handleNumberChange}
                      placeholder="Leave empty for unlimited"
                      className="pl-9"
                    />
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/events')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating Event..." : "Create Event"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
};

export default CreateEvent;
