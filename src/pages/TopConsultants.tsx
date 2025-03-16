
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Calendar, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";

const TopConsultants = () => {
  // Mock data - in a real app this would come from an API
  const topConsultants = [
    { 
      id: 1, 
      name: "Dr. Emily Wong", 
      specialty: "Hematologist", 
      hospital: "Memorial Hospital",
      rating: 4.9,
      reviewCount: 124,
      availability: "Mon-Fri",
      phone: "+1 (555) 123-4567",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=Dr.W"
    },
    { 
      id: 2, 
      name: "Dr. Robert Chen", 
      specialty: "Blood Bank Specialist", 
      hospital: "City Medical Center",
      rating: 4.8,
      reviewCount: 98,
      availability: "Weekends & Evenings",
      phone: "+1 (555) 234-5678",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=Dr.C"
    },
    { 
      id: 3, 
      name: "Dr. Sarah Johnson", 
      specialty: "Transfusion Medicine", 
      hospital: "University Hospital",
      rating: 4.7,
      reviewCount: 156,
      availability: "Tues & Thurs",
      phone: "+1 (555) 345-6789",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=Dr.J"
    },
    { 
      id: 4, 
      name: "Dr. Michael Brown", 
      specialty: "Immunohematologist", 
      hospital: "General Hospital",
      rating: 4.6,
      reviewCount: 87,
      availability: "Mon, Wed, Fri",
      phone: "+1 (555) 456-7890",
      image: "https://placehold.co/200x200/e2e8f0/1e293b?text=Dr.B"
    },
  ];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader 
        title="Top Consultants" 
        description="Expert consultants in blood donation and transfusion"
        icon={<Award className="h-5 w-5 text-purple-500" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topConsultants.map((consultant) => (
          <Card key={consultant.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={consultant.image} 
                    alt={consultant.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{consultant.name}</h3>
                  <p className="text-sm text-muted-foreground">{consultant.specialty}</p>
                  <p className="text-sm text-muted-foreground">{consultant.hospital}</p>
                  
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium">{consultant.rating}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({consultant.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Available: {consultant.availability}</span>
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Phone className="h-3 w-3" />
                      <span className="text-xs">Call</span>
                    </Button>
                    <Button size="sm" className="gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span className="text-xs">Consult</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopConsultants;
