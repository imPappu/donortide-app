
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ambulance as AmbulanceIcon, MapPin, Phone, User } from "lucide-react";
import { Ambulance } from "@/services/servicesService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface AmbulanceListProps {
  ambulances: Ambulance[];
  isLoading: boolean;
}

const AmbulanceList: React.FC<AmbulanceListProps> = ({ ambulances, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-3 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ambulances.map((ambulance) => (
        <Card key={ambulance.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{ambulance.vehicleNumber}</h3>
                <Badge variant={ambulance.status === "Available" ? "success" : "destructive"}>
                  {ambulance.status}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground flex items-center mb-1">
                <MapPin className="h-3 w-3 mr-1" />
                {ambulance.location}
              </p>
              
              <p className="text-sm text-muted-foreground flex items-center mb-2">
                <User className="h-3 w-3 mr-1" />
                {ambulance.driverName}
              </p>
              
              <div className="flex justify-between items-center mt-3">
                <a 
                  href={`tel:${ambulance.driverPhone}`} 
                  className="text-sm text-primary flex items-center"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  {ambulance.driverPhone}
                </a>
                
                {ambulance.status === "Available" && (
                  <Button size="sm">Book Now</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {ambulances.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <AmbulanceIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No ambulances available at the moment</p>
        </div>
      )}
    </div>
  );
};

export default AmbulanceList;
