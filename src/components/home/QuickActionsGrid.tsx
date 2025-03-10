
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, User, MessageSquare, Award } from "lucide-react";

const QuickActionsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <Link to="/requests">
        <Card className="hover:bg-muted/50 transition-colors h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <Heart className="h-8 w-8 text-red-500 mb-2" />
            <h3 className="font-medium text-center">Blood Requests</h3>
          </CardContent>
        </Card>
      </Link>
      <Link to="/donors">
        <Card className="hover:bg-muted/50 transition-colors h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <User className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium text-center">Find Donors</h3>
          </CardContent>
        </Card>
      </Link>
      <Link to="/donate">
        <Card className="hover:bg-muted/50 transition-colors h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <Award className="h-8 w-8 text-amber-500 mb-2" />
            <h3 className="font-medium text-center">Donate Items</h3>
          </CardContent>
        </Card>
      </Link>
      <Link to="/community">
        <Card className="hover:bg-muted/50 transition-colors h-full">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <MessageSquare className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-medium text-center">Community</h3>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default QuickActionsGrid;
