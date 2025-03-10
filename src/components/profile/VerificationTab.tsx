
import React from "react";
import { useAuth } from "@/components/auth/AuthContext";
import VerifiedState from "./VerifiedState";
import VerificationForm from "./VerificationForm";
import VerificationInfo from "./VerificationInfo";

const VerificationTab = () => {
  const { user, verifyAccount } = useAuth();
  
  const handleVerify = async (code: string) => {
    await verifyAccount(code);
  };
  
  if (user?.isVerified) {
    return <VerifiedState />;
  }
  
  return (
    <div className="space-y-4">
      <VerificationForm onVerify={handleVerify} />
      <VerificationInfo />
    </div>
  );
};

export default VerificationTab;
