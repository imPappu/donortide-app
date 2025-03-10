
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, RefreshCw } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

const VerifyAccount = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { verifyAccount, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [navigate, user]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await verifyAccount(verificationCode);
    if (success) {
      navigate("/profile");
    }
  };

  const handleResendCode = () => {
    setTimer(60);
    setCanResend(false);
    // In a real app, this would call an API to resend the code
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Verify Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-6">
            We've sent a verification code to your email. Please enter the code below to verify your account.
          </p>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="verificationCode"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="text-center text-lg"
                required
              />
              <p className="text-xs text-center text-muted-foreground">
                For demo purposes, use code: 123456
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify Account"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?
            </p>
            <Button 
              variant="link" 
              className="text-primary p-0 h-auto" 
              onClick={handleResendCode}
              disabled={!canResend}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Resend Code {!canResend && `(${timer}s)`}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="ghost" onClick={() => navigate("/login")}>
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyAccount;
