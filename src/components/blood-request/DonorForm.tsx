
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { BloodTypeSelector } from "./BloodTypeSelector";
import { useDonorForm } from "@/hooks/useDonorForm";

export function DonorForm() {
  const {
    donorForm,
    isSubmitting,
    handleDonorInputChange,
    handleDonorBloodTypeSelect,
    handleDonorSubmit
  } = useDonorForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Donor Registration</CardTitle>
      </CardHeader>
      <form onSubmit={handleDonorSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="donor-name">Your Name</Label>
            <Input 
              id="donor-name" 
              placeholder="Your full name" 
              required 
              value={donorForm.name}
              onChange={handleDonorInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donor-blood-type">Your Blood Type</Label>
            <BloodTypeSelector 
              selectedType={donorForm.bloodType}
              onSelectType={handleDonorBloodTypeSelect}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donor-location">Your Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="donor-location" 
                className="pl-9" 
                placeholder="Your current location" 
                required 
                value={donorForm.location}
                onChange={handleDonorInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="donor-contactNumber">Contact Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="donor-contactNumber" 
                className="pl-9" 
                placeholder="Your contact number" 
                required 
                type="tel" 
                value={donorForm.contactNumber}
                onChange={handleDonorInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Availability</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline">Weekdays</Button>
              <Button type="button" variant="outline">Weekends</Button>
              <Button type="button" variant="outline">Mornings</Button>
              <Button type="button" variant="outline">Evenings</Button>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register as Donor"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
