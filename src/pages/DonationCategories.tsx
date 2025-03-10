
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import CategoryCard from "@/components/donation/CategoryCard";
import MonetaryDonationCard from "@/components/donation/MonetaryDonationCard";
import { donationCategories } from "@/data/donationCategories";

const DonationCategories = () => {
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
          {donationCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        <MonetaryDonationCard />
      </div>
    </div>
  );
};

export default DonationCategories;
