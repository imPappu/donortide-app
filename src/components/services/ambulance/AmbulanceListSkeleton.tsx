
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AmbulanceListSkeleton: React.FC = () => {
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
};

export default AmbulanceListSkeleton;
