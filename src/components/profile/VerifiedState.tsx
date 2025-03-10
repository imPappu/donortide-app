
import React from "react";
import { CheckCircle } from "lucide-react";

const VerifiedState = () => {
  return (
    <div className="text-center py-6">
      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-lg font-medium mb-2">Account Verified</h3>
      <p className="text-muted-foreground">
        Your account has been verified. You now have full access to all features.
      </p>
    </div>
  );
};

export default VerifiedState;
