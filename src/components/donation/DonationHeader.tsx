
import React from "react";
import { DonationType } from "@/components/DonationPayment";

interface DonationHeaderProps {
  donationType?: DonationType;
  category?: string;
}

const DonationHeader: React.FC<DonationHeaderProps> = ({ donationType = 'monetary', category }) => {
  const getTitle = () => {
    if (category) {
      return `${category} Donation`;
    }
    
    switch (donationType) {
      case 'blood':
        return 'Blood Donation';
      case 'clothing':
        return 'Clothing Donation';
      case 'food':
        return 'Food Donation';
      case 'books':
        return 'Book Donation';
      case 'essentials':
        return 'Essentials Donation';
      case 'other':
        return 'In-Kind Donation';
      case 'monetary':
      default:
        return 'Monetary Donation';
    }
  };

  return (
    <div className={`p-6 bg-gradient-to-r ${getDonationTypeColor(donationType)}`}>
      <h2 className="text-xl font-semibold text-white">{getTitle()}</h2>
      <p className="text-sm text-white/90 mt-1">
        {getDonationDescription(donationType, category)}
      </p>
    </div>
  );
};

function getDonationTypeColor(donationType: DonationType): string {
  switch (donationType) {
    case 'blood':
      return 'from-red-500 to-red-600';
    case 'clothing':
      return 'from-purple-500 to-purple-600';
    case 'food':
      return 'from-orange-500 to-orange-600';
    case 'books':
      return 'from-blue-500 to-blue-600';
    case 'essentials':
      return 'from-green-500 to-green-600';
    case 'other':
      return 'from-gray-500 to-gray-600';
    case 'monetary':
    default:
      return 'from-emerald-500 to-emerald-600';
  }
}

function getDonationDescription(donationType: DonationType, category?: string): string {
  if (category) {
    return `Your donation will support ${category.toLowerCase()} initiatives.`;
  }
  
  switch (donationType) {
    case 'blood':
      return 'Your blood donation can save up to 3 lives.';
    case 'clothing':
      return 'Your clothing donation helps those in need stay warm and dignified.';
    case 'food':
      return 'Your food donation helps fight hunger in our community.';
    case 'books':
      return 'Your book donation supports education and literacy.';
    case 'essentials':
      return 'Your donation of essential items helps families in crisis.';
    case 'other':
      return 'Your in-kind donation makes a difference in our community.';
    case 'monetary':
    default:
      return 'Your financial contribution supports our mission.';
  }
}

export default DonationHeader;
