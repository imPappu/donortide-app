
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InfoIcon } from 'lucide-react';

const LoginCredentials = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <InfoIcon className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-lg">Demo Credentials</CardTitle>
        </div>
        <CardDescription>
          Use these credentials to test the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Admin</TableCell>
              <TableCell>admin@example.com</TableCell>
              <TableCell>admin123</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">User</TableCell>
              <TableCell>user@example.com</TableCell>
              <TableCell>password</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LoginCredentials;
