
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export interface DonationCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface CategoryCardProps {
  category: DonationCategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to make a donation",
      });
      navigate("/login");
      return;
    }

    toast({
      title: `${category.name} donation`,
      description: `Coming soon: ${category.name.toLowerCase()} donation process`,
    });
  };

  return (
    <Card 
      className="mb-4 overflow-hidden transform transition-all duration-200 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="flex items-center">
          <div 
            className={`${category.color} p-6 flex items-center justify-center`}
          >
            {category.icon}
          </div>
          <div className="p-4 flex-1">
            <h3 className="font-semibold text-base">{category.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
          </div>
          <div className="px-4">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
