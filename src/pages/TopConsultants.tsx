
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Star, MessageSquare } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import { useToast } from "@/hooks/use-toast";

interface Consultant {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  consultations: number;
  experience: string;
  availability: string;
  bio: string;
}

const TopConsultants = () => {
  const { toast } = useToast();

  // Mock data - would be replaced with actual data from an API
  const consultants: Consultant[] = [
    {
      id: "1",
      name: "Dr. Emily Rodriguez",
      specialization: "Hematology",
      avatar: "",
      rating: 4.9,
      reviewCount: 128,
      consultations: 312,
      experience: "12 years",
      availability: "Mon, Wed, Fri",
      bio: "Specialist in blood disorders and donation medicine with focus on donor health and blood banking procedures.",
    },
    {
      id: "2",
      name: "Dr. James Wilson",
      specialization: "Transfusion Medicine",
      avatar: "",
      rating: 4.8,
      reviewCount: 96,
      consultations: 243,
      experience: "15 years",
      availability: "Tue, Thu, Sat",
      bio: "Expert in blood transfusion protocols and managing complex donation cases.",
    },
    {
      id: "3",
      name: "Dr. Lisa Chang",
      specialization: "Immunohematology",
      avatar: "",
      rating: 4.7,
      reviewCount: 87,
      consultations: 201,
      experience: "9 years",
      availability: "Mon-Fri",
      bio: "Specialized in blood group serology and compatibility testing for safe donations.",
    },
    {
      id: "4",
      name: "Dr. Mark Patel",
      specialization: "Donor Medicine",
      avatar: "",
      rating: 4.9,
      reviewCount: 112,
      consultations: 276,
      experience: "11 years",
      availability: "Wed-Sun",
      bio: "Focuses on donor health assessment and optimization for safe donation experiences.",
    },
    {
      id: "5",
      name: "Dr. Sarah Johnson",
      specialization: "Blood Banking",
      avatar: "",
      rating: 4.8,
      reviewCount: 94,
      consultations: 187,
      experience: "8 years",
      availability: "Tue, Wed, Fri, Sat",
      bio: "Expert in blood component preparation and storage procedures.",
    },
  ];

  const handleScheduleConsultation = (consultantId: string, consultantName: string) => {
    toast({
      title: "Consultation Request Sent",
      description: `Your request for a consultation with ${consultantName} has been submitted.`,
    });
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader 
        title="Top Medical Consultants"
        description="Expert consultants available for donation-related advice" 
      />
      
      <div className="grid grid-cols-1 gap-6 mt-6">
        {consultants.map((consultant) => (
          <Card key={consultant.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-1/4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={consultant.avatar} />
                  <AvatarFallback className="text-xl">
                    {consultant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(consultant.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm">{consultant.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {consultant.reviewCount} reviews
                  </p>
                </div>
              </div>
              
              <div className="p-6 md:w-3/4">
                <CardHeader className="p-0 pb-4">
                  <CardTitle>{consultant.name}</CardTitle>
                  <div className="text-sm font-medium text-primary">
                    {consultant.specialization}
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <p className="text-sm mb-4">{consultant.bio}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
                    <div>
                      <span className="font-medium">Experience:</span> {consultant.experience}
                    </div>
                    <div>
                      <span className="font-medium">Consultations:</span> {consultant.consultations}
                    </div>
                    <div>
                      <span className="font-medium">Available:</span> {consultant.availability}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleScheduleConsultation(consultant.id, consultant.name)}
                      className="flex-1"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopConsultants;
