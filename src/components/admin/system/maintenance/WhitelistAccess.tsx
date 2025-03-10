
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

const WhitelistAccess: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-blue-500" />
          Whitelist Access
        </CardTitle>
        <CardDescription>
          Configure IP addresses and user roles that can bypass maintenance mode
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="ip-whitelist">IP Whitelist (one per line)</Label>
            <Textarea
              id="ip-whitelist"
              placeholder="127.0.0.1
192.168.1.100"
              className="mt-1 font-mono text-sm"
            />
          </div>
          
          <div>
            <Label>Roles with Access</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center space-x-2">
                <Switch id="role-admin" defaultChecked={true} disabled />
                <Label htmlFor="role-admin">Administrators</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="role-staff" defaultChecked={false} />
                <Label htmlFor="role-staff">Staff</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="role-editors" defaultChecked={false} />
                <Label htmlFor="role-editors">Editors</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="role-moderators" defaultChecked={false} />
                <Label htmlFor="role-moderators">Moderators</Label>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            Update Access Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhitelistAccess;
