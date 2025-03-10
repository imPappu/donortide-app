
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, CalendarClock } from "lucide-react";

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

interface AppointmentTabContentProps {
  appointments: Appointment[];
  toggleAppointmentStatus: (id: number) => void;
  handleAddAppointment: () => void;
}

const AppointmentTabContent = ({ 
  appointments, 
  toggleAppointmentStatus,
  handleAddAppointment
}: AppointmentTabContentProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Manage appointment schedules for blood donation services.
        </div>
        <Button size="sm" onClick={handleAddAppointment}>
          <Plus className="mr-2 h-4 w-4" />
          Add Appointment
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.patientName}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.type}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={appointment.status === "Confirmed"} 
                      onCheckedChange={() => toggleAppointmentStatus(appointment.id)}
                    />
                    <span className={appointment.status === "Confirmed" ? "text-green-600" : "text-amber-600"}>
                      {appointment.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentTabContent;
