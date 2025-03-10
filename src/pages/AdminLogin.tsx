import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import LoginCredentials from "@/components/admin/LoginCredentials";
import { getAppSettings } from "@/services/settingService";
import { verifyAdminCredentials } from "@/services/authService";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminPath, setAdminPath] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminSession = () => {
      const adminToken = localStorage.getItem("admin_token");
      if (adminToken) {
        navigate(`/${adminPath}/dashboard`);
      }
    };

    const fetchAdminPath = async () => {
      try {
        const settings = await getAppSettings();
        const adminPathSetting = settings.find(s => s.settingKey === 'admin_url_path');
        if (adminPathSetting && adminPathSetting.settingValue) {
          setAdminPath(adminPathSetting.settingValue);
        }
      } catch (error) {
        console.error("Error fetching admin path:", error);
      }
    };

    fetchAdminPath();
    checkAdminSession();
  }, [navigate, adminPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For demo purposes, directly check credentials
      // In a real app, you would call the API instead
      const isAdmin = username === "admin@example.com" && password === "admin123";
      
      if (isAdmin) {
        // Store admin token in localStorage
        localStorage.setItem("admin_token", JSON.stringify({
          username,
          timestamp: new Date().getTime(),
          expiresIn: 24 * 60 * 60 * 1000 // 24 hours
        }));
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        
        navigate(`/${adminPath}/dashboard`);
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "There was a problem with the login process",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <LoginCredentials />
        
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl flex justify-center items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="admin@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login to Dashboard"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Access the admin dashboard to manage your blood donation system
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
