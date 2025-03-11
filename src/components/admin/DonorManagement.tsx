import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Donor } from "@/types/apiTypes";

interface Donor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  bloodType: string;
  location: string;
  lastDonation?: string;
  totalDonations: number;
  availableForEmergency: boolean;
  status?: 'available' | 'unavailable' | 'pending';
  createdAt: string;
  contactNumber?: string; // Added for compatibility
}

const DonorManagement = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching donors from an API
    setTimeout(() => {
      // Fixed mock donors data to match Donor type
      const mockDonors: Donor[] = [
        {
          id: "1",
          name: "John Doe",
          bloodType: "A+",
          location: "New York",
          contactNumber: "123-456-7890",
          totalDonations: 5,
          availableForEmergency: true,
          createdAt: "2023-01-15T09:30:00Z",
          status: "available"
        },
        {
          id: "2",
          name: "Jane Smith",
          bloodType: "O-",
          location: "Los Angeles",
          contactNumber: "987-654-3210",
          totalDonations: 3,
          availableForEmergency: true,
          createdAt: "2023-02-20T14:45:00Z",
          status: "available"
        },
        {
          id: "3",
          name: "Robert Johnson",
          bloodType: "B+",
          location: "Chicago",
          contactNumber: "555-123-4567",
          totalDonations: 2,
          availableForEmergency: false,
          createdAt: "2023-03-05T11:15:00Z",
          status: "unavailable"
        },
        {
          id: "4",
          name: "Emily Davis",
          bloodType: "AB+",
          location: "Houston",
          contactNumber: "444-789-1234",
          totalDonations: 7,
          availableForEmergency: true,
          createdAt: "2023-01-30T16:20:00Z",
          status: "available"
        },
        {
          id: "5",
          name: "Michael Wilson",
          bloodType: "A-",
          location: "Phoenix",
          contactNumber: "333-222-1111",
          totalDonations: 1,
          availableForEmergency: false,
          createdAt: "2023-04-10T08:50:00Z",
          status: "pending"
        }
      ];
      
      setDonors(mockDonors);
      setFilteredDonors(mockDonors);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = donors.filter(donor =>
      donor.name.toLowerCase().includes(query.toLowerCase()) ||
      donor.bloodType.toLowerCase().includes(query.toLowerCase()) ||
      donor.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDonors(filtered);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Donors</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              type="search"
              placeholder="Search donors..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          {isLoading ? (
            <div className="text-center py-4">Loading donors...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonors.map((donor) => (
                  <TableRow key={donor.id}>
                    <TableCell className="font-medium">{donor.name}</TableCell>
                    <TableCell>{donor.bloodType}</TableCell>
                    <TableCell>{donor.location}</TableCell>
                    <TableCell>{donor.contactNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DonorManagement;
