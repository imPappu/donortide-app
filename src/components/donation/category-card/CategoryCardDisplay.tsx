
import React from "react";
import { ArrowRight } from "lucide-react";
import { DonationCategory } from "./types";

interface CategoryCardDisplayProps {
  category: DonationCategory;
}

const CategoryCardDisplay: React.FC<CategoryCardDisplayProps> = ({ category }) => {
  return (
    <>
      <div className="p-4 flex-1">
        <h3 className="font-semibold text-base">{category.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
      </div>
      <div className="px-4">
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </>
  );
};

export default CategoryCardDisplay;
