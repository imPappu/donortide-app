
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Key, 
  User, 
  UserRound, 
  HeartHandshake, 
  Building2, 
  Briefcase 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { User as UserType } from "@/types/auth";

interface RegisterFormProps {
  setActiveTab: (tab: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setActiveTab }) => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRole, setRegisterRole] = useState<UserType['role']>("user");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    
    try {
      const success = await register(registerName, registerEmail, registerPassword, registerRole);
      if (success) {
        navigate("/profile");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  // Helper function to get role icon
  const getRoleIcon = (role: UserType['role']) => {
    switch (role) {
      case 'donor':
        return <HeartHandshake className="h-4 w-4" />;
      case 'service_provider':
        return <Briefcase className="h-4 w-4" />;
      case 'volunteer':
        return <UserRound className="h-4 w-4" />;
      case 'organization':
        return <Building2 className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="name"
            placeholder="John Doe"
            className="pl-10"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            className="pl-10"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-password">Password</Label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="role">I am registering as a</Label>
        <Select
          value={registerRole}
          onValueChange={(value) => setRegisterRole(value as UserType['role'])}
        >
          <SelectTrigger id="role" className="w-full">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Regular User</span>
              </div>
            </SelectItem>
            <SelectItem value="donor">
              <div className="flex items-center">
                <HeartHandshake className="mr-2 h-4 w-4" />
                <span>Blood Donor</span>
              </div>
            </SelectItem>
            <SelectItem value="service_provider">
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Service Provider</span>
              </div>
            </SelectItem>
            <SelectItem value="volunteer">
              <div className="flex items-center">
                <UserRound className="mr-2 h-4 w-4" />
                <span>Volunteer</span>
              </div>
            </SelectItem>
            <SelectItem value="organization">
              <div className="flex items-center">
                <Building2 className="mr-2 h-4 w-4" />
                <span>Organization</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button type="submit" className="w-full" disabled={isRegistering}>
        {isRegistering ? "Creating account..." : "Create Account"}
      </Button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className="text-primary hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
