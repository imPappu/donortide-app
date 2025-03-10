
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TopDonor {
  id: number;
  name: string;
  avatar: string;
  donations: number;
  bloodType: string;
}

interface TopDonorsRowProps {
  donors: TopDonor[];
}

const TopDonorsRow = ({ donors }: TopDonorsRowProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center">
          <Award className="h-5 w-5 text-yellow-500 mr-2" />
          Top Donors
        </h2>
        <Button variant="link" size="sm" className="text-primary">
          View All
        </Button>
      </div>
      <div className="flex overflow-x-auto pb-2 space-x-4">
        <TooltipProvider>
          {donors.map((donor) => (
            <Tooltip key={donor.id}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center min-w-[80px]">
                  <Avatar className="h-14 w-14 border-2 border-primary mb-2">
                    <AvatarImage src={donor.avatar} alt={donor.name} />
                    <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs font-medium truncate w-full text-center">{donor.name}</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {donor.bloodType}
                    </Badge>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  <p className="font-semibold">{donor.name}</p>
                  <p className="text-xs">{donor.donations} donations</p>
                  <p className="text-xs">Blood Type: {donor.bloodType}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TopDonorsRow;
