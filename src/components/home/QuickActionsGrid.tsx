
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, User, MessageSquare, Gift } from "lucide-react";

const QuickActionsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <Link to="/requests">
        <Card className="hover:bg-muted/50 transition-colors h-full border-transparent hover:border-primary/20">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-full mb-3">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="font-medium text-center text-sm">Blood Requests</h3>
          </CardContent>
        </Card>
      </Link>
      <Link to="/donors">
        <Card className="hover:bg-muted/50 transition-colors h-full border-transparent hover:border-primary/20">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full mb-3">
              <User className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-center text-sm">Find Donors</h3>
          </CardContent>
        </Card>
      </Link>
      <Link to="/donate">
        <Card className="hover:bg-muted/50 transition-colors h-full border-transparent hover:border-primary/20">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-full mb-3">
              <Gift className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="font-medium text-center text-sm">Make a Donation</h3>
          </CardContent>
        </Card>
      </Link>
      <Link to="/community">
        <Card className="hover:bg-muted/50 transition-colors h-full border-transparent hover:border-primary/20">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-full mb-3">
              <MessageSquare className="h-6 w-6 text-indigo-500" />
            </div>
            <h3 className="font-medium text-center text-sm">Community</h3>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default QuickActionsGrid;
