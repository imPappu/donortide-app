
import React from "react";
import { User } from "lucide-react";

const ConsultantEmptyState: React.FC = () => {
  return (
    <div className="text-center py-8">
      <User className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
      <p className="text-muted-foreground">No consultants available at the moment</p>
    </div>
  );
};

export default ConsultantEmptyState;
