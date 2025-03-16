
import React from "react";
import { DonationType } from "../DonationPayment";
import { HeartHandshake, Heart, Gift, Shirt, BookOpen, Package, Pizza } from "lucide-react";

interface DonationHeaderProps {
  donationType: DonationType;
  category?: string;
}

const DonationHeader = ({ donationType, category }: DonationHeaderProps) => {
  const getHeaderContent = () => {
    switch (donationType) {
      case "monetary":
        return {
          icon: <HeartHandshake className="h-6 w-6 text-white" />,
          title: "Make a Donation",
          description: "Your financial support helps save lives",
          color: "bg-gradient-to-r from-primary to-primary/80"
        };
      case "blood":
        return {
          icon: <Heart className="h-6 w-6 text-white" />,
          title: "Donate Blood",
          description: "Your blood donation can save up to three lives",
          color: "bg-gradient-to-r from-red-600 to-red-500"
        };
      case "clothing":
        return {
          icon: <Shirt className="h-6 w-6 text-white" />,
          title: "Donate Clothing",
          description: "Provide essential clothing to those in need",
          color: "bg-gradient-to-r from-blue-600 to-blue-500"
        };
      case "food":
        return {
          icon: <Pizza className="h-6 w-6 text-white" />,
          title: "Donate Food",
          description: "Help fight hunger in our community",
          color: "bg-gradient-to-r from-orange-600 to-orange-500"
        };
      case "books":
        return {
          icon: <BookOpen className="h-6 w-6 text-white" />,
          title: "Donate Books",
          description: "Support literacy and education",
          color: "bg-gradient-to-r from-emerald-600 to-emerald-500"
        };
      case "essentials":
        return {
          icon: <Package className="h-6 w-6 text-white" />,
          title: "Donate Essentials",
          description: "Provide basic necessities to those in need",
          color: "bg-gradient-to-r from-purple-600 to-purple-500"
        };
      default:
        return {
          icon: <Gift className="h-6 w-6 text-white" />,
          title: "Make a Donation",
          description: category || "Support our mission with your contribution",
          color: "bg-gradient-to-r from-gray-700 to-gray-600"
        };
    }
  };

  const { icon, title, description, color } = getHeaderContent();

  return (
    <div className={`${color} p-6 flex items-center`}>
      <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default DonationHeader;
