
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Users, Calendar, Mail, Phone } from "lucide-react";

interface Consultant {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
  email: string;
  phone: string;
  rating: number;
  reviewCount: number;
  consultations: number;
  experience: string;
  availability: string;
  status: "active" | "on-leave" | "unavailable";
}

const TopConsultants = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Mock data - would be replaced with actual data from an API
  const consultants: Consultant[] = [
    {
      id: "1",
      name: "Dr. Emily Rodriguez",
      specialization: "Hematology",
      avatar: "",
      email: "emily.rodriguez@example.com",
      phone: "(555) 123-4567",
      rating: 4.9,
      reviewCount: 128,
      consultations: 312,
      experience: "12 years",
      availability: "Mon, Wed, Fri",
      status: "active",
    },
    {
      id: "2",
      name: "Dr. James Wilson",
      specialization: "Transfusion Medicine",
      avatar: "",
      email: "james.wilson@example.com",
      phone: "(555) 234-5678",
      rating: 4.8,
      reviewCount: 96,
      consultations: 243,
      experience: "15 years",
      availability: "Tue, Thu, Sat",
      status: "active",
    },
    {
      id: "3",
      name: "Dr. Lisa Chang",
      specialization: "Immunohematology",
      avatar: "",
      email: "lisa.chang@example.com",
      phone: "(555) 345-6789",
      rating: 4.7,
      reviewCount: 87,
      consultations: 201,
      experience: "9 years",
      availability: "Mon-Fri",
      status: "on-leave",
    },
    {
      id: "4",
      name: "Dr. Mark Patel",
      specialization: "Donor Medicine",
      avatar: "",
      email: "mark.patel@example.com",
      phone: "(555) 456-7890",
      rating: 4.9,
      reviewCount: 112,
      consultations: 276,
      experience: "11 years",
      availability: "Wed-Sun",
      status: "active",
    },
    {
      id: "5",
      name: "Dr. Sarah Johnson",
      specialization: "Blood Banking",
      avatar: "",
      email: "sarah.johnson@example.com",
      phone: "(555) 567-8901",
      rating: 4.8,
      reviewCount: 94,
      consultations: 187,
      experience: "8 years",
      availability: "Tue, Wed, Fri, Sat",
      status: "unavailable",
    },
  ];

  const filteredConsultants = statusFilter === "all" 
    ? consultants 
    : consultants.filter(c => c.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "on-leave":
        return <Badge className="bg-yellow-100 text-yellow-800">On Leave</Badge>;
      case "unavailable":
        return <Badge className="bg-red-100 text-red-800">Unavailable</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Top Medical Consultants</h2>
        <Button>Add Consultant</Button>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Medical Consultants Directory</CardTitle>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredConsultants.map((consultant) => (
              <div 
                key={consultant.id} 
                className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={consultant.avatar} />
                    <AvatarFallback>
                      {consultant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{consultant.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {consultant.specialization}
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs ml-1">{consultant.rating}</span>
                      </div>
                      <span className="text-xs mx-2 text-muted-foreground">•</span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        {consultant.consultations} consultations
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 flex-1">
                  <div>
                    <div className="text-xs text-muted-foreground">Experience</div>
                    <div className="text-sm">{consultant.experience}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Availability</div>
                    <div className="text-sm">{consultant.availability}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Status</div>
                    <div>{getStatusBadge(consultant.status)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button size="sm">View Profile</Button>
                </div>
              </div>
            ))}

            {filteredConsultants.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                No consultants found with the selected status.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopConsultants;
