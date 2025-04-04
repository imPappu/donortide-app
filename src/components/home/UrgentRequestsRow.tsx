
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Droplet, AlertCircle } from "lucide-react";
import { UrgentRequest } from "@/hooks/useUrgentRequests";

interface UrgentRequestsRowProps {
  requests: UrgentRequest[];
  className?: string;
}

const UrgentRequestsRow = ({ requests, className = "" }: UrgentRequestsRowProps) => {
  if (!requests.length) return null;

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
          Urgent Blood Requests
        </h2>
        <Link to="/requests" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      
      <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 snap-x">
        {requests.map((request) => (
          <Card key={request.id} className="min-w-[250px] max-w-[280px] flex-shrink-0 snap-start hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Droplet className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">{request.patientName}</h3>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {request.location}
                    {request.distance && <span className="ml-1">• {request.distance}</span>}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Posted: {request.postedTime}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                    {request.bloodType}
                  </span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                    {request.urgency}
                  </span>
                </div>
                <Button size="sm" className="whitespace-nowrap">
                  <Link to={`/requests/${request.id}`}>Respond</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UrgentRequestsRow;
