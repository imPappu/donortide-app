
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash, Building } from "lucide-react";

interface Organization {
  id: string;
  name: string;
  type: string;
  address: string;
  contactPerson: string;
  contactNumber: string;
  status: "active" | "inactive";
}

const OrganizationManagement = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: "1",
      name: "Red Cross Society",
      type: "Blood Bank",
      address: "123 Main St, New York, NY",
      contactPerson: "John Walker",
      contactNumber: "+1 (555) 123-4567",
      status: "active",
    },
    {
      id: "2",
      name: "City Hospital",
      type: "Hospital",
      address: "456 Park Ave, Boston, MA",
      contactPerson: "Jane Anderson",
      contactNumber: "+1 (555) 987-6543",
      status: "active",
    },
    {
      id: "3",
      name: "Community Health Center",
      type: "Health Center",
      address: "789 Oak Dr, Chicago, IL",
      contactPerson: "Robert Brown",
      contactNumber: "+1 (555) 456-7890",
      status: "inactive",
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>(organizations);

  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredOrganizations(organizations);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = organizations.filter(
      org => 
        org.name.toLowerCase().includes(query) ||
        org.type.toLowerCase().includes(query) ||
        org.contactPerson.toLowerCase().includes(query)
    );
    
    setFilteredOrganizations(results);
  }, [searchQuery, organizations]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Organization Management</CardTitle>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="Search organizations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizations.length > 0 ? (
                filteredOrganizations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-gray-500" />
                        {org.name}
                      </div>
                    </TableCell>
                    <TableCell>{org.type}</TableCell>
                    <TableCell>{org.contactPerson}</TableCell>
                    <TableCell>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          org.status === "active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {org.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No organizations found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationManagement;
