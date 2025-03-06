
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  DropletIcon, 
  Award, 
  Clock, 
  Settings, 
  LogOut,
  Bell
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const DonationHistory = () => {
  const donations = [
    { date: "May 15, 2023", location: "Central Blood Bank", amount: "450ml" },
    { date: "January 10, 2023", location: "Memorial Hospital", amount: "450ml" },
    { date: "September 5, 2022", location: "Community Drive", amount: "450ml" },
  ];

  return (
    <div className="space-y-4">
      {donations.map((donation, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{donation.location}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {donation.date}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">{donation.amount}</span>
                <div className="text-xs text-muted-foreground">Blood donated</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const Achievements = () => {
  const badges = [
    { name: "First Donation", icon: <DropletIcon className="h-5 w-5" />, earned: true },
    { name: "Life Saver", icon: <Award className="h-5 w-5" />, earned: true },
    { name: "Regular Donor", icon: <Clock className="h-5 w-5" />, earned: true },
    { name: "Emergency Responder", icon: <Bell className="h-5 w-5" />, earned: false },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {badges.map((badge, index) => (
        <Card key={index} className={`p-4 text-center ${!badge.earned ? "opacity-50" : ""}`}>
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-primary">
              {badge.icon}
            </div>
            <h3 className="font-medium text-sm">{badge.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {badge.earned ? "Earned" : "Not earned yet"}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Notifications</h3>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Urgent Blood Requests</Label>
            <p className="text-sm text-muted-foreground">Receive alerts for urgent requests</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Nearby Requests</Label>
            <p className="text-sm text-muted-foreground">Get notified about requests in your area</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Donation Reminders</Label>
            <p className="text-sm text-muted-foreground">Reminders when you're eligible to donate again</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Account</h3>
        <Button variant="outline" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" /> Account Settings
        </Button>
        <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <Card>
        <CardHeader className="text-center border-b pb-6">
          <div className="mx-auto h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-primary" />
          </div>
          <CardTitle>John Doe</CardTitle>
          <div className="flex items-center justify-center mt-1">
            <DropletIcon className="h-4 w-4 mr-1 text-red-500" />
            <span className="font-medium">O+</span>
          </div>
          <div className="flex flex-col items-center text-sm text-muted-foreground mt-2 space-y-1">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" /> New York, NY
            </div>
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" /> +1 (555) 123-4567
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">5 Donations</Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">3 Lives Saved</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="history">
            <TabsList className="w-full">
              <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
              <TabsTrigger value="achievements" className="flex-1">Achievements</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="history">
                <DonationHistory />
              </TabsContent>
              <TabsContent value="achievements">
                <Achievements />
              </TabsContent>
              <TabsContent value="settings">
                <Settings />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t flex justify-center py-4">
          <p className="text-sm text-muted-foreground">Last donation: 4 months ago • Eligible to donate</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
