
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Award, DropletIcon } from "lucide-react";

interface DonorProps {
  name: string;
  location: string;
  bloodType: string;
  donationsCount: number;
  isVerified?: boolean;
}

const DonorCard = ({ name, location, bloodType, donationsCount, isVerified = false }: DonorProps) => {
  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium">{name}</h3>
              {isVerified && (
                <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">Verified</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{location}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                {bloodType}
              </span>
              <Badge variant="outline" className="flex items-center">
                <DropletIcon className="h-3 w-3 mr-1 text-red-500" />
                {donationsCount}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TopDonors = () => {
  const topDonors = [
    { name: "John Doe", location: "New York, NY", bloodType: "O+", donationsCount: 12, isVerified: true },
    { name: "Jane Smith", location: "Los Angeles, CA", bloodType: "A-", donationsCount: 10, isVerified: true },
    { name: "Robert Johnson", location: "Chicago, IL", bloodType: "B+", donationsCount: 8 },
    { name: "Emily Davis", location: "Houston, TX", bloodType: "AB+", donationsCount: 7, isVerified: true },
    { name: "Michael Brown", location: "Phoenix, AZ", bloodType: "O-", donationsCount: 6 },
  ];

  const recentDonors = [
    { name: "Sarah Wilson", location: "Miami, FL", bloodType: "A+", donationsCount: 3 },
    { name: "David Miller", location: "Seattle, WA", bloodType: "B-", donationsCount: 2, isVerified: true },
    { name: "Jennifer Taylor", location: "Boston, MA", bloodType: "O+", donationsCount: 1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-500" />
            Top Donors
          </h2>
        </div>
        {topDonors.map((donor, index) => (
          <DonorCard key={index} {...donor} />
        ))}
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <DropletIcon className="h-5 w-5 mr-2 text-red-500" />
            Recent Donors
          </h2>
        </div>
        {recentDonors.map((donor, index) => (
          <DonorCard key={index} {...donor} />
        ))}
      </div>
    </div>
  );
};

export default TopDonors;
