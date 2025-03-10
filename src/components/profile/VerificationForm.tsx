
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

interface VerificationFormProps {
  onVerify: (code: string) => Promise<void>;
}

const VerificationForm = ({ onVerify }: VerificationFormProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = async () => {
    if (!verificationCode.trim()) return;
    
    setIsSubmitting(true);
    await onVerify(verificationCode);
    setIsSubmitting(false);
    setVerificationCode("");
  };

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
      
      <div className="space-y-2">
        <Label htmlFor="verification-code">Verification Code</Label>
        <div className="flex gap-2">
          <Input 
            type="text" 
            id="verification-code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
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
    </div>
  );
};

export default VerificationForm;
