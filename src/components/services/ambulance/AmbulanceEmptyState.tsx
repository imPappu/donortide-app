
import React from "react";
import { Ambulance } from "lucide-react";

const AmbulanceEmptyState: React.FC = () => {
  return (
    <div className="text-center py-8">
      <Ambulance className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
      <p className="text-muted-foreground">No ambulances available at the moment</p>
    </div>
  );
};

export default AmbulanceEmptyState;
