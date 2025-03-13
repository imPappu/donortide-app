
import React from "react";

export interface DonationCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface CategoryCardProps {
  category: DonationCategory;
  isEditing?: boolean;
  onEdit?: (category: DonationCategory) => void;
  onDelete?: (categoryId: string) => void;
}
