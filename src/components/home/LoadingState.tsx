
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const LoadingState = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4 flex items-center justify-center">
        <div className="animate-pulse h-24 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
