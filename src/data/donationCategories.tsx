import React from "react";
import { DropletIcon, Shirt, Pizza, BookOpen, Package, Gift } from "lucide-react";
import { DonationCategory } from "@/components/donation/category-card/types";

export const donationCategories: DonationCategory[] = [
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
