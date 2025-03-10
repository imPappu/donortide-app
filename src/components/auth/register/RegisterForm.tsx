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
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { User as UserType } from "@/types/auth";

interface RegisterFormProps {
  setActiveTab: (tab: string) => void;
}

type RoleOption = {
  value: UserType['role'];
  label: string;
  icon: React.ReactNode;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setActiveTab }) => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<UserType['roles']>(["user"]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    
    try {
      const success = await register(registerName, registerEmail, registerPassword, selectedRoles);
      if (success) {
        navigate("/profile");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  const roleOptions: RoleOption[] = [
    { value: 'user', label: 'Regular User', icon: <User className="h-4 w-4" /> },
    { value: 'donor', label: 'Blood Donor', icon: <HeartHandshake className="h-4 w-4" /> },
    { value: 'service_provider', label: 'Service Provider', icon: <Briefcase className="h-4 w-4" /> },
    { value: 'volunteer', label: 'Volunteer', icon: <UserRound className="h-4 w-4" /> },
    { value: 'organization', label: 'Organization', icon: <Building2 className="h-4 w-4" /> },
  ];

  const handleRoleToggle = (role: UserType['role']) => {
    setSelectedRoles(prev => {
      // If we're toggling the 'user' role, which is required, don't remove it
      if (role === 'user' && prev.includes('user')) {
        return prev;
      }
      
      // If the role is already selected, remove it
      if (prev.includes(role)) {
        return prev.filter(r => r !== role);
      }
      
      // Otherwise, add it
      return [...prev, role];
    });
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
        <Label>I am registering as</Label>
        <div className="space-y-2">
          {roleOptions.map((role) => (
            <div key={role.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`role-${role.value}`} 
                checked={selectedRoles.includes(role.value)}
                onCheckedChange={() => handleRoleToggle(role.value)}
                disabled={role.value === 'user'} // User role is always required
              />
              <Label 
                htmlFor={`role-${role.value}`} 
                className="flex items-center space-x-2 cursor-pointer"
              >
                {role.icon}
                <span>{role.label} {role.value === 'user' && <span className="text-xs text-muted-foreground">(Required)</span>}</span>
              </Label>
            </div>
          ))}
        </div>
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
