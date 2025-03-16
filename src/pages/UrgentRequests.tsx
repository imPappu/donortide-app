
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import UrgentRequestsRow from "@/components/home/UrgentRequestsRow";
import PageHeader from "@/components/common/PageHeader";
import { useUrgentRequests } from "@/hooks/useUrgentRequests";

const UrgentRequests = () => {
  const { urgentRequests, loading, error } = useUrgentRequests(8); // Get more requests for this dedicated page
  
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader 
        title="Urgent Blood Requests" 
        description="Urgent requests that need immediate attention"
        icon={<AlertCircle className="h-5 w-5 text-red-500" />}
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
            Blood Needed Urgently
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500 p-4">
              {error}
            </p>
          ) : urgentRequests.length === 0 ? (
            <p className="text-center text-muted-foreground p-4">
              No urgent requests at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {urgentRequests.map(request => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-red-600">{request.bloodType}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{request.patientName}</h3>
                        <p className="text-xs text-muted-foreground">
                          {request.hospital}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Contact: {request.contactNumber}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                            {request.urgency}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {request.units} units
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UrgentRequests;
