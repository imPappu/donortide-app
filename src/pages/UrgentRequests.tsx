
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/common/PageHeader";
import { useUrgentRequests } from "@/hooks/useUrgentRequests";

const UrgentRequests = () => {
  const { urgentRequests, loading } = useUrgentRequests();

  return (
    <div className="container px-4 py-8 mx-auto">
      <PageHeader 
        title="Urgent Blood Requests"
        description="Critical requests that need immediate attention" 
      />
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="bg-gray-100 dark:bg-gray-800 h-24"></CardHeader>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md mb-2"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : urgentRequests && urgentRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {urgentRequests.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-red-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-red-500 text-white text-sm flex items-center justify-center mr-2">
                    {request.bloodType}
                  </span>
                  {request.patientName}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {request.hospital}, {request.location}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <span className="font-medium">Units needed:</span> {request.units}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Contact:</span> {request.contactNumber}
                </div>
                {request.notes && (
                  <div className="text-sm mt-2 text-muted-foreground">
                    {request.notes}
                  </div>
                )}
                <div className="mt-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    {request.urgency}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mt-6">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No urgent requests at the moment.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UrgentRequests;
