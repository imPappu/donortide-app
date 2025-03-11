
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar, Phone } from "lucide-react";
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { sendNotification } from "@/services/notificationService";

interface BloodRequestCardProps {
  patientName: string;
  bloodType: string;
  location: string;
  urgency: string;
  postedTime: string;
  distance?: string;
  hospital: string;
  notes?: string;
  contactNumber?: string;
}

const BloodRequestCard = ({ 
  patientName, 
  bloodType, 
  location, 
  urgency, 
  postedTime, 
  distance, 
  hospital, 
  notes, 
  contactNumber 
}: BloodRequestCardProps) => {
  const { toast } = useToast();
  const [responded, setResponded] = useState(false);

  const handleRespond = async () => {
    setResponded(true);
    
    toast({
      title: "Response sent",
      description: `You have responded to ${patientName}'s blood request.`,
    });
    
    try {
      await sendNotification({
        title: `Response to your ${bloodType} blood request`,
        message: `A donor has responded to your blood request at ${hospital}. They will contact you soon.`,
        targetType: 'specific_users',
        userId: patientName.replace(/\s+/g, '-').toLowerCase()
      });
    } catch (error) {
      console.error("Failed to send push notification:", error);
    }
  };
  
  const handleCall = () => {
    window.location.href = `tel:${contactNumber || "1234567890"}`;
    
    toast({
      title: "Calling requester",
      description: `Dialing ${patientName}`,
    });
  };

  const nameInitial = patientName.charAt(0);
  
  const getBgColor = () => {
    switch (bloodType) {
      case "O-": return "bg-red-600";
      case "O+": return "bg-red-500";
      case "A-": return "bg-orange-600";
      case "A+": return "bg-orange-500";
      case "B-": return "bg-yellow-600";
      case "B+": return "bg-yellow-500";
      case "AB-": return "bg-green-600";
      case "AB+": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="mb-3 overflow-hidden border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-3">
              <AvatarImage src="" alt={patientName} />
              <AvatarFallback className="bg-gray-100 text-primary font-medium">
                {nameInitial}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">{patientName}</h3>
              <p className="text-xs text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {location} • <span className="font-medium text-green-600 ml-1">{distance}</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className={cn(
              "inline-block px-2 py-0.5 text-xs font-medium rounded-full text-white",
              getBgColor()
            )}>
              {bloodType}
            </span>
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end">
              <Clock className="h-3 w-3 mr-1" />
              {postedTime}
            </p>
          </div>
        </div>

        <div className="mb-3 bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
          <p className="text-xs"><span className="font-medium">Hospital:</span> {hospital}</p>
          {notes && <p className="text-xs mt-1 text-muted-foreground">{notes}</p>}
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            "px-2 py-0.5 text-xs font-medium rounded-full",
            urgency === "Urgent" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : 
            urgency === "High" ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" : 
            "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
          )}>
            {urgency}
          </span>
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            Needed ASAP
          </span>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-gray-50/50 dark:bg-gray-900/20 px-4 py-2">
        {responded ? (
          <div className="w-full text-center text-green-600 dark:text-green-400 text-xs font-medium py-1">
            You've responded to this request ✓
          </div>
        ) : (
          <div className="w-full flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 py-1 h-8 border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800" 
              size="sm"
              onClick={handleCall}
            >
              <Phone className="h-3.5 w-3.5 mr-1" />
              Call
            </Button>
            <Button 
              className="flex-1 py-1 h-8 bg-primary hover:bg-primary/90" 
              size="sm"
              onClick={handleRespond}
            >
              Respond
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default BloodRequestCard;
