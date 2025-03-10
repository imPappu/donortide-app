
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Mail, Download, Check, X } from "lucide-react";
import { useEventManagement } from "@/hooks/useEventManagement";
import { Event, EventRegistration } from "@/hooks/addon-modules/types/eventManagement";
import { toast } from "@/hooks/use-toast";

interface EventRegistrationsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

const EventRegistrationsDialog = ({ isOpen, onClose, event }: EventRegistrationsDialogProps) => {
  const { userRegistrations } = useEventManagement();
  const [searchTerm, setSearchTerm] = useState("");
  
  const eventRegistrations = userRegistrations.filter(
    reg => reg.eventId === event.id
  );
  
  const filteredRegistrations = eventRegistrations.filter(reg => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reg.userName.toLowerCase().includes(searchLower) ||
      reg.userEmail.toLowerCase().includes(searchLower)
    );
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleExportCSV = () => {
    // Create CSV content
    const headers = ["Name", "Email", "Ticket Type", "Payment Status", "Registered At"];
    const rows = eventRegistrations.map(reg => [
      reg.userName,
      reg.userEmail,
      reg.ticketType,
      reg.hasPaid ? "Paid" : "Pending",
      new Date(reg.registeredAt).toLocaleString()
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${event.title.replace(/\s+/g, "_")}_registrations.csv`);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Registrations exported to CSV file.",
    });
  };
  
  const handleSendEmail = () => {
    toast({
      title: "Email Feature",
      description: "Email functionality would be implemented with an actual mail service.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrations: {event.title}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm">
              <p>
                Total Registrations: <Badge>{eventRegistrations.length}</Badge>
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" variant="outline" onClick={handleSendEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Email All
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="search-registrations" className="sr-only">
              Search Registrations
            </Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-registrations"
                placeholder="Search by name or email..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          {filteredRegistrations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No registrations found.</p>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="py-2 px-4 text-left font-medium text-sm">Name</th>
                    <th className="py-2 px-4 text-left font-medium text-sm">Email</th>
                    <th className="py-2 px-4 text-left font-medium text-sm">Type</th>
                    <th className="py-2 px-4 text-center font-medium text-sm">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((registration) => (
                    <RegistrationRow key={registration.id} registration={registration} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface RegistrationRowProps {
  registration: EventRegistration;
}

const RegistrationRow = ({ registration }: RegistrationRowProps) => {
  const formattedDate = new Date(registration.registeredAt).toLocaleDateString();
  
  return (
    <tr className="border-t">
      <td className="py-3 px-4 text-sm">{registration.userName}</td>
      <td className="py-3 px-4 text-sm">{registration.userEmail}</td>
      <td className="py-3 px-4 text-sm">{registration.ticketType}</td>
      <td className="py-3 px-4 text-sm text-center">
        {registration.hasPaid ? (
          <Badge variant="outline" className="bg-green-50 border-green-200 text-green-600">
            <Check className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-600">
            <X className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )}
      </td>
    </tr>
  );
};

export default EventRegistrationsDialog;
