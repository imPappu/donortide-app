
import React from "react";
import { RefreshCw } from "lucide-react";

const AddonSystemLoading = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <RefreshCw className="h-10 w-10 mx-auto text-primary animate-spin mb-3" />
        <h3 className="font-medium">Initializing Addon System</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Please wait while we set up the custom blood donation addon modules...
        </p>
      </div>
    </div>
  );
};

export default AddonSystemLoading;
