
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropletIcon, Heart, Shirt, Pizza, Package, BookOpen, Gift, ArrowRight 
} from "lucide-react";
import TopNavbar from "@/components/TopNavbar";
import { toast } from "@/hooks/use-toast";

interface DonationCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const CategoryCard = ({ category }: { category: DonationCategory }) => {
  const handleClick = () => {
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

const DonationCategories = () => {
  const categories: DonationCategory[] = [
    {
      id: '1',
      name: 'Blood',
      description: 'Donate blood to save lives in emergency situations',
      icon: <DropletIcon className="h-6 w-6 text-white" />,
      color: 'bg-red-500'
    },
    {
      id: '2',
      name: 'Clothing',
      description: 'Donate clean, gently used clothing for those in need',
      icon: <Shirt className="h-6 w-6 text-white" />,
      color: 'bg-blue-500'
    },
    {
      id: '3',
      name: 'Food',
      description: 'Donate non-perishable food items to local food banks',
      icon: <Pizza className="h-6 w-6 text-white" />,
      color: 'bg-orange-500'
    },
    {
      id: '4',
      name: 'Books',
      description: 'Donate books to schools, libraries, and literacy programs',
      icon: <BookOpen className="h-6 w-6 text-white" />,
      color: 'bg-emerald-500'
    },
    {
      id: '5',
      name: 'Essential Items',
      description: 'Donate toiletries, hygiene products, and basic necessities',
      icon: <Package className="h-6 w-6 text-white" />,
      color: 'bg-purple-500'
    },
    {
      id: '6',
      name: 'Toys & Gifts',
      description: 'Donate toys and gifts for children in hospitals or shelters',
      icon: <Gift className="h-6 w-6 text-white" />,
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Donation Categories" />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-1">Ways to Donate</h1>
          <p className="text-sm text-muted-foreground">
            Choose a category below to donate and help those in need
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Heart className="h-10 w-10 text-primary mr-4" />
              <div>
                <h3 className="font-semibold">Make a Monetary Donation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Support our organization with a financial contribution
                </p>
                <Button className="mt-3">
                  Donate Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationCategories;
