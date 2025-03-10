
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, Shield } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

const VerificationTab = () => {
  const { user, verifyAccount } = useAuth();
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleVerify = async () => {
    if (!verificationCode.trim()) return;
    
    setIsSubmitting(true);
    await verifyAccount(verificationCode);
    setIsSubmitting(false);
    setVerificationCode("");
  };
  
  if (user?.isVerified) {
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
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium mb-2">Verify Your Account</h3>
        <p className="text-muted-foreground mb-4">
          Verification helps ensure the safety and trust of our community.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="verification-code">Verification Code</Label>
          <div className="flex gap-2">
            <input 
              type="text" 
              id="verification-code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter 6-digit code"
            />
            <Button onClick={handleVerify} disabled={isSubmitting || !verificationCode.trim()}>
              {isSubmitting ? "Verifying..." : "Verify"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            For this demo, use code: 123456
          </p>
        </div>
        
        <div className="rounded-md bg-muted p-3">
          <p className="text-sm">
            Why verify your account?
          </p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Confirm you're a real person</li>
            <li>Access all features of the platform</li>
            <li>Enhance trust with other users</li>
            <li>Protect your account from misuse</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerificationTab;
