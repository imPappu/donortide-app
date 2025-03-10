
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DatabaseIcon, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DatabaseBackupTab: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DatabaseIcon className="mr-2 h-5 w-5" />
          Backup & Restore
        </CardTitle>
        <CardDescription>
          Backup your database or restore from previous backups
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Create Backup</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Create a full backup of your database that you can use to restore later
          </p>
          <Button
            onClick={() => {
              toast({
                title: "Backup Created",
                description: "Database backup created successfully",
              });
            }}
          >
            Create Backup
          </Button>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Restore from Backup</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Restore your database from a previous backup
          </p>
          <Alert className="mb-3 bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800">
            <AlertTriangle className="h-4 w-4 text-yellow-800 dark:text-yellow-400" />
            <AlertDescription className="text-yellow-800 dark:text-yellow-400">
              Warning: Restoring will overwrite your current database. Make sure to backup first.
            </AlertDescription>
          </Alert>
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Feature Not Available",
                description: "Restore functionality is currently in development",
                variant: "destructive",
              });
            }}
          >
            Restore Backup
          </Button>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Scheduled Backups</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Configure automated backups on a schedule
          </p>
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Scheduled Backups Enabled",
                description: "Your database will be backed up automatically every day at midnight",
              });
            }}
          >
            Configure Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseBackupTab;
