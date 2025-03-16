
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, MapPin, Mail, Phone } from "lucide-react";

interface Volunteer {
  id: string;
  name: string;
  distance: number;
  location: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  rating: number;
  completedTasks: number;
}

const NearbyVolunteers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - would be replaced with actual data from an API
  const volunteers: Volunteer[] = [
    {
      id: "1",
      name: "David Chen",
      distance: 0.8,
      location: "Downtown Medical Center",
      email: "david.chen@example.com",
      phone: "(555) 123-4567",
      skills: ["Blood Collection", "First Aid", "Transportation"],
      availability: "Weekdays",
      rating: 4.9,
      completedTasks: 47,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      distance: 1.2,
      location: "Westside Hospital",
      email: "sarah.j@example.com",
      phone: "(555) 234-5678",
      skills: ["Nursing", "Patient Care", "Blood Drive Organization"],
      availability: "Evenings & Weekends",
      rating: 4.8,
      completedTasks: 36,
    },
    {
      id: "3",
      name: "Michael Patel",
      distance: 1.5,
      location: "Community Health Clinic",
      email: "michael.p@example.com",
      phone: "(555) 345-6789",
      skills: ["Emergency Response", "Transportation", "Medical Assistance"],
      availability: "24/7 On-call",
      rating: 4.7,
      completedTasks: 52,
    },
    {
      id: "4",
      name: "Jessica Wong",
      distance: 2.3,
      location: "Memorial Hospital",
      email: "jessica.w@example.com",
      phone: "(555) 456-7890",
      skills: ["Blood Drive Coordination", "Public Relations", "Administrative Support"],
      availability: "Flexible",
      rating: 4.6,
      completedTasks: 29,
    },
    {
      id: "5",
      name: "Robert Kim",
      distance: 3.0,
      location: "Northside Medical Center",
      email: "robert.k@example.com",
      phone: "(555) 567-8901",
      skills: ["Transportation", "Donor Support", "Community Outreach"],
      availability: "Weekends",
      rating: 4.8,
      completedTasks: 41,
    },
  ];

  const filteredVolunteers = searchQuery
    ? volunteers.filter(
        (volunteer) =>
          volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          volunteer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          volunteer.skills.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : volunteers;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Nearby Volunteers</h2>
        <Button>Add Volunteer</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Volunteer Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search volunteers by name, location, or skills..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVolunteers.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell>
                      <div className="font-medium">{volunteer.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {volunteer.rating} stars • {volunteer.completedTasks} tasks
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>{volunteer.location}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {volunteer.distance} miles away
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {volunteer.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{volunteer.availability}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm">Assign</Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredVolunteers.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No volunteers found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NearbyVolunteers;
