
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

const PaymentSettingsAlert = () => {
  return (
    <Alert className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Payment gateways configured here will be available in the donation forms throughout the app.
      </AlertDescription>
    </Alert>
  );
};

export default PaymentSettingsAlert;
