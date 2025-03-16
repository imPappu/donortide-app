
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useUrgentRequests } from "@/hooks/useUrgentRequests";
import { BloodRequest } from "@/types/apiTypes";

const UrgentRequests = () => {
  const { urgentRequests, loading, error, fetchRequests } = useUrgentRequests();
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "urgent":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "standard":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleMarkFulfilled = (id: string) => {
    // Implementation would call an API to update the request status
    console.log(`Marking request ${id} as fulfilled`);
  };

  const handleContactDonors = (request: BloodRequest) => {
    setSelectedRequest(request);
    // Implementation would open a modal to contact potential donors
    console.log(`Contacting donors for ${request.patientName}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Urgent Blood Requests</h2>
        <Button onClick={() => fetchRequests()}>Refresh</Button>
      </div>

      <Alert className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
        <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
        <AlertDescription className="text-red-700 dark:text-red-300">
          The following requests require immediate attention due to critical need.
        </AlertDescription>
      </Alert>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="bg-gray-100 dark:bg-gray-800 h-24"></CardHeader>
              <CardContent className="h-32"></CardContent>
            </Card>
          ))}
        </div>
      ) : urgentRequests && urgentRequests.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {urgentRequests.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-red-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="inline-block w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center mr-2">
                      {request.bloodType}
                    </span>
                    {request.patientName}
                  </div>
                  <Badge className={getUrgencyColor(request.urgency)}>
                    {request.urgency.toUpperCase()}
                  </Badge>
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {request.hospital}, {request.location}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-medium">Units needed:</span> {request.units}
                  </div>
                  <div>
                    <span className="font-medium">Contact:</span> {request.contactNumber}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(request.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {request.notes && (
                  <div className="text-sm mb-4 text-muted-foreground">
                    <span className="font-medium">Notes:</span> {request.notes}
                  </div>
                )}
                <div className="flex space-x-2 mt-4">
                  <Button
                    variant="default"
                    onClick={() => {
                      // Create a BloodRequest object from UrgentRequest
                      // This is a workaround for type compatibility
                      const bloodRequest: BloodRequest = {
                        id: request.id,
                        patientName: request.patientName,
                        bloodType: request.bloodType,
                        units: request.units,
                        hospital: request.hospital,
                        location: request.location,
                        contactNumber: request.contactNumber,
                        urgency: request.urgency as any,
                        notes: request.notes,
                        status: request.status as any || 'open',
                        createdAt: request.createdAt
                      };
                      handleContactDonors(bloodRequest);
                    }}
                    className="flex-1"
                  >
                    Contact Potential Donors
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleMarkFulfilled(request.id)}
                    className="flex-1"
                  >
                    Mark as Fulfilled
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No urgent requests at the moment.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UrgentRequests;
