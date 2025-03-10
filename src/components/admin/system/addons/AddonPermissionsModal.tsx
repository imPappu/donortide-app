
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Shield, Info } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Permission {
  id: number;
  name: string;
  key: string;
  enabled: boolean;
}

interface AddonPermissionsModalProps {
  addonId: number | null;
  addonName: string;
  permissions: Permission[];
  isOpen: boolean;
  onClose: () => void;
  onUpdatePermission: (addonId: number, permissionId: number, enabled: boolean) => void;
}

const AddonPermissionsModal = ({ 
  addonId, 
  addonName, 
  permissions, 
  isOpen, 
  onClose,
  onUpdatePermission
}: AddonPermissionsModalProps) => {
  if (!addonId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {addonName} Permissions
          </DialogTitle>
          <DialogDescription>
            Manage access permissions for this addon module
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permission</TableHead>
                <TableHead>Access Key</TableHead>
                <TableHead className="text-right">Enabled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {permission.name}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground ml-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Controls access to {permission.name.toLowerCase()} functions</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{permission.key}</TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={permission.enabled}
                      onCheckedChange={(checked) => 
                        onUpdatePermission(addonId, permission.id, checked)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddonPermissionsModal;
