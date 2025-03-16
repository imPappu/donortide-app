
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";

const NearbyVolunteers = () => {
  // Mock data - in a real app this would come from an API
  const nearbyVolunteers = [
    { 
      id: 1, 
      name: "Sarah Johnson", 
      location: "Downtown Medical Center", 
      distance: "0.8 miles", 
      availability: "Weekends", 
      phone: "+1 (555) 123-4567",
      skills: ["First Aid", "Driver"]
    },
    { 
      id: 2, 
      name: "Michael Chen", 
      location: "Westside Community", 
      distance: "1.2 miles", 
      availability: "Evenings", 
      phone: "+1 (555) 234-5678",
      skills: ["Medical Assistant", "Coordinator"]
    },
    { 
      id: 3, 
      name: "Jessica Williams", 
      location: "South District", 
      distance: "2.5 miles", 
      availability: "Weekdays", 
      phone: "+1 (555) 345-6789",
      skills: ["Phlebotomist", "Event Organizer"]
    },
    { 
      id: 4, 
      name: "David Rodriguez", 
      location: "Central Hospital", 
      distance: "3.1 miles", 
      availability: "On Call", 
      phone: "+1 (555) 456-7890",
      skills: ["Nurse", "Blood Collection"]
    },
  ];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader 
        title="Nearby Volunteers" 
        description="Volunteers ready to help in your area"
        icon={<Users className="h-5 w-5 text-blue-500" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearbyVolunteers.map((volunteer) => (
          <Card key={volunteer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{volunteer.name}</h3>
                
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{volunteer.location} • {volunteer.distance}</span>
                </div>
                
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Available: {volunteer.availability}</span>
                </div>
                
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>{volunteer.phone}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {volunteer.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <Button size="sm" className="mt-3">Contact</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NearbyVolunteers;
