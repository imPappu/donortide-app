
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropletIcon, MapPin, Phone, AlertCircle } from "lucide-react";
import { BloodTypeSelector } from "./BloodTypeSelector";
import { useRequestForm } from "@/hooks/useRequestForm";

// Changed from "Standard", "High", "Urgent" to match the enum values in the BloodRequest type
const urgencyLevels = ["standard", "urgent", "critical"];

export function RequestForm() {
  const {
    requestForm,
    isSubmitting,
    handleRequestInputChange,
    handleRequestBloodTypeSelect,
    handleUrgencySelect,
    handleRequestSubmit
  } = useRequestForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Blood Request Form</CardTitle>
      </CardHeader>
      <form onSubmit={handleRequestSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="request-patientName">Patient Name</Label>
            <Input 
              id="request-patientName" 
              placeholder="Full name of the patient" 
              required 
              value={requestForm.patientName}
              onChange={handleRequestInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blood-type">Blood Type Required</Label>
            <BloodTypeSelector 
              selectedType={requestForm.bloodType}
              onSelectType={handleRequestBloodTypeSelect}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="request-hospital">Hospital/Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="request-hospital" 
                className="pl-9" 
                placeholder="Hospital name and address" 
                required 
                value={requestForm.hospital}
                onChange={handleRequestInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="request-location">City/Area</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="request-location" 
                className="pl-9" 
                placeholder="City or area" 
                required 
                value={requestForm.location}
                onChange={handleRequestInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="request-contactNumber">Contact Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="request-contactNumber" 
                className="pl-9" 
                placeholder="Your contact number" 
                required 
                type="tel" 
                value={requestForm.contactNumber}
                onChange={handleRequestInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency Level</Label>
            <div className="grid grid-cols-3 gap-2">
              {urgencyLevels.map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={requestForm.urgency === level ? "default" : "outline"}
                  className={level === "critical" && requestForm.urgency === level ? "bg-red-500 hover:bg-red-600" : ""}
                  onClick={() => handleUrgencySelect(level as 'standard' | 'urgent' | 'critical')}
                >
                  {level === "critical" && <AlertCircle className="h-4 w-4 mr-1" />}
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="request-notes">Additional Notes</Label>
            <textarea
              id="request-notes"
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Any additional information or special requirements..."
              value={requestForm.notes}
              onChange={handleRequestInputChange}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Blood Request"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
