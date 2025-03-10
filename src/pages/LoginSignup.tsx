
import React from "react";
import AccountAccessCard from "@/components/auth/AccountAccessCard";
import LoginCredentials from "@/components/admin/LoginCredentials";

const LoginSignup = () => {
  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <LoginCredentials />
      <div className="mt-4">
        <AccountAccessCard />
      </div>
    </div>
  );
};

export default LoginSignup;
