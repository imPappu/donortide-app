
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Calendar, Clock, MessageSquare, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Consultant } from "@/services";
import { formatAvailableDays } from "./ConsultantUtils";

interface ConsultantCardProps {
  consultant: Consultant;
  onBookService: (consultant: Consultant) => void;
}

const ConsultantCard: React.FC<ConsultantCardProps> = ({ consultant, onBookService }) => {
  return (
    <Card key={consultant.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border border-gray-200">
              {consultant.imageUrl ? (
                <AvatarImage src={consultant.imageUrl} alt={consultant.name} />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary">
                  {consultant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium">{consultant.name}</h3>
                <Badge variant={consultant.status === "Available" ? "success" : "outline"}>
                  {consultant.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{consultant.specialty}</p>
              
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span className="mr-3">{formatAvailableDays(consultant.availableDays || [])}</span>
                <Clock className="h-3 w-3 mr-1 ml-2" />
                <span>{consultant.availableTimeStart || "09:00"} - {consultant.availableTimeEnd || "17:00"}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-3 md:mt-0 md:ml-auto">
            <div className="flex items-center">
              {consultant.isFreeService ? (
                <Badge variant="outline" className="bg-green-50">Free Service</Badge>
              ) : (
                <Badge variant="outline" className="bg-blue-50">
                  <DollarSign className="h-3 w-3 mr-1" />
                  ${consultant.price}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <a 
                href={`https://wa.me/${consultant.phone.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </a>
              
              <a 
                href={`tel:${consultant.phone}`} 
                className="text-primary hover:text-primary/80"
              >
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Phone className="h-4 w-4" />
                </Button>
              </a>
              
              <Button
                size="sm"
                onClick={() => onBookService(consultant)}
                disabled={consultant.status !== "Available"}
              >
                Book {!consultant.isFreeService && `$${consultant.price}`}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultantCard;
