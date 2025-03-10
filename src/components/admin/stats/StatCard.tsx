
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  percentageChange?: number;
}

const StatCard = ({ icon: Icon, value, label, percentageChange }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <Icon className={`h-5 w-5 ${label === 'Total Users' ? 'text-blue-500' : 
                               label === 'Donations' ? 'text-red-500' : 
                               label === 'Requests' ? 'text-orange-500' : 'text-green-500'}`} />
          {percentageChange && (
            <span className="text-sm text-green-600">+{percentageChange}%</span>
          )}
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
