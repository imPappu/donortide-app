
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, User } from "lucide-react";
import { Consultant } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";

interface ConsultantsListProps {
  consultants: Consultant[];
  isLoading: boolean;
}

const ConsultantsList: React.FC<ConsultantsListProps> = ({ consultants, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {consultants.map((consultant) => (
        <Card key={consultant.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 flex items-center space-x-4">
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
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{consultant.name}</h3>
                  <Badge variant={consultant.status === "Available" ? "success" : "outline"}>
                    {consultant.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{consultant.specialty}</p>
                <a 
                  href={`tel:${consultant.phone}`} 
                  className="text-sm text-primary flex items-center mt-1"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  {consultant.phone}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {consultants.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <User className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No consultants available at the moment</p>
        </div>
      )}
    </div>
  );
};

export default ConsultantsList;
