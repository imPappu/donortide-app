
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

interface Volunteer {
  id: string;
  name: string;
  distance: number;
  location: string;
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
    <div className="container px-4 py-8 mx-auto">
      <PageHeader 
        title="Nearby Volunteers"
        description="Connect with local volunteers ready to assist with donations" 
      />

      <div className="flex items-center mb-6 mt-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search volunteers by name, location, or skills..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVolunteers.map((volunteer) => (
          <Card key={volunteer.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{volunteer.name}</span>
                <Badge variant="outline" className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {volunteer.distance} miles
                </Badge>
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {volunteer.location}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {volunteer.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium">Availability:</span>{" "}
                      {volunteer.availability}
                    </div>
                    <div>
                      <span className="font-medium">Rating:</span>{" "}
                      {volunteer.rating} ({volunteer.completedTasks} tasks)
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Message
                  </Button>
                  <Button size="sm" className="flex-1">
                    Request Help
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVolunteers.length === 0 && (
        <Card className="mt-4">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No volunteers found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NearbyVolunteers;
