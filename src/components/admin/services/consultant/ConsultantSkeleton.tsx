
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ConsultantSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 border rounded-md">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="mt-2">
            <Skeleton className="h-4 w-60" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConsultantSkeleton;
