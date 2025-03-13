
import React from "react";
import { 
  Droplet as DropletIcon, 
  Shirt, 
  Pizza, 
  BookOpen, 
  Package, 
  Gift, 
  Heart, 
  Backpack 
} from "lucide-react";
import { DonationCategory } from "../category-card/types";

export interface CategoryFormData extends Omit<DonationCategory, 'icon'> {
  iconId: string;
}

export interface CategoryManagementProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: DonationCategory) => void;
  onUpdateCategory: (category: DonationCategory) => void;
  categories: DonationCategory[];
  categoryToEdit?: DonationCategory;
}

export interface FormErrors {
  name: string;
  description: string;
}

// Define icon type
export interface IconOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Available icons for selection
export const iconOptions: IconOption[] = [
  { id: "droplet", label: "Droplet", icon: <DropletIcon className="h-6 w-6 text-white" /> },
  { id: "shirt", label: "Clothing", icon: <Shirt className="h-6 w-6 text-white" /> },
  { id: "pizza", label: "Food", icon: <Pizza className="h-6 w-6 text-white" /> },
  { id: "book", label: "Book", icon: <BookOpen className="h-6 w-6 text-white" /> },
  { id: "package", label: "Package", icon: <Package className="h-6 w-6 text-white" /> },
  { id: "gift", label: "Gift", icon: <Gift className="h-6 w-6 text-white" /> },
  { id: "heart", label: "Heart", icon: <Heart className="h-6 w-6 text-white" /> },
  { id: "backpack", label: "Backpack", icon: <Backpack className="h-6 w-6 text-white" /> },
];

// Color options
export const colorOptions = [
  { id: "bg-red-500", label: "Red" },
  { id: "bg-blue-500", label: "Blue" },
  { id: "bg-green-500", label: "Green" },
  { id: "bg-yellow-500", label: "Yellow" },
  { id: "bg-purple-500", label: "Purple" },
  { id: "bg-pink-500", label: "Pink" },
  { id: "bg-indigo-500", label: "Indigo" },
  { id: "bg-orange-500", label: "Orange" },
  { id: "bg-emerald-500", label: "Emerald" },
];
