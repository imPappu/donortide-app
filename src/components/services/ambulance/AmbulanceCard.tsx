
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, User, Calendar, Clock, MessageSquare, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ambulance } from "@/services";
import { formatAvailableDays } from "./AmbulanceUtils";

interface AmbulanceCardProps {
  ambulance: Ambulance;
  onBookAmbulance: (ambulance: Ambulance) => void;
}

const AmbulanceCard: React.FC<AmbulanceCardProps> = ({ ambulance, onBookAmbulance }) => {
  return (
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
          
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span className="mr-3">{formatAvailableDays(ambulance.availableDays || [])}</span>
            <Clock className="h-3 w-3 mr-1 ml-2" />
            <span>{ambulance.availableTimeStart || "09:00"} - {ambulance.availableTimeEnd || "17:00"}</span>
          </div>
          
          <div className="flex items-center mt-3 mb-2">
            {ambulance.isFreeService ? (
              <Badge variant="outline" className="bg-green-50">Free Service</Badge>
            ) : (
              <Badge variant="outline" className="bg-blue-50">
                <DollarSign className="h-3 w-3 mr-1" />
                ${ambulance.price}
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <a 
                href={`https://wa.me/${ambulance.driverPhone.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </a>
              
              <a 
                href={`tel:${ambulance.driverPhone}`} 
                className="text-primary hover:text-primary/80"
              >
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Phone className="h-4 w-4" />
                </Button>
              </a>
            </div>
            
            {ambulance.status === "Available" && (
              <Button 
                size="sm" 
                onClick={() => onBookAmbulance(ambulance)}
              >
                Book {!ambulance.isFreeService && `$${ambulance.price}`}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmbulanceCard;
