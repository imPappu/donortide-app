
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DonationCategory } from "./CategoryCard";
import { v4 as uuidv4 } from "uuid";
import { Label } from "@/components/ui/label";
import { 
  DropletIcon, Shirt, Pizza, BookOpen, 
  Package, Gift, Heart, Backpack
} from "lucide-react";

interface CategoryManagementProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: DonationCategory) => void;
  onUpdateCategory: (category: DonationCategory) => void;
  categories: DonationCategory[];
  categoryToEdit?: DonationCategory;
}

// Available icons for selection
const iconOptions = [
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
const colorOptions = [
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

const CategoryManagement = ({ 
  isOpen, 
  onClose, 
  onAddCategory, 
  onUpdateCategory,
  categories,
  categoryToEdit 
}: CategoryManagementProps) => {
  const [formData, setFormData] = useState<Omit<DonationCategory, 'icon'> & { iconId: string }>({
    id: categoryToEdit?.id || uuidv4(),
    name: categoryToEdit?.name || "",
    description: categoryToEdit?.description || "",
    color: categoryToEdit?.color || "bg-blue-500",
    iconId: "droplet"
  });
  
  const [errors, setErrors] = useState({
    name: "",
    description: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleIconChange = (iconId: string) => {
    setFormData(prev => ({ ...prev, iconId }));
  };
  
  const handleColorChange = (color: string) => {
    setFormData(prev => ({ ...prev, color }));
  };
  
  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : "Category name is required",
      description: formData.description ? "" : "Description is required"
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };
  
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const iconObj = iconOptions.find(icon => icon.id === formData.iconId);
    
    const categoryData: DonationCategory = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      color: formData.color,
      icon: iconObj?.icon || <DropletIcon className="h-6 w-6 text-white" />
    };
    
    if (categoryToEdit) {
      onUpdateCategory(categoryData);
    } else {
      onAddCategory(categoryData);
    }
    
    // Reset form
    setFormData({
      id: uuidv4(),
      name: "",
      description: "",
      color: "bg-blue-500",
      iconId: "droplet"
    });
    
    onClose();
  };
  
  const handleDialogClose = () => {
    // Reset form on close
    setFormData({
      id: uuidv4(),
      name: "",
      description: "",
      color: "bg-blue-500",
      iconId: "droplet"
    });
    setErrors({ name: "", description: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {categoryToEdit ? "Edit Donation Category" : "Add Donation Category"}
          </DialogTitle>
          <DialogDescription>
            {categoryToEdit 
              ? "Make changes to the donation category below." 
              : "Create a new donation category for your organization."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
              placeholder="e.g., Clothing"
              autoFocus
            />
            {errors.name && (
              <p className="text-xs text-red-500 col-span-3 col-start-2">{errors.name}</p>
            )}
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
              placeholder="e.g., Donate clean, gently used clothing for those in need"
              rows={2}
            />
            {errors.description && (
              <p className="text-xs text-red-500 col-span-3 col-start-2">{errors.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right">
              Icon
            </Label>
            <Select
              value={formData.iconId}
              onValueChange={handleIconChange}
            >
              <SelectTrigger className="col-span-3" id="icon">
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map(icon => (
                  <SelectItem key={icon.id} value={icon.id}>
                    <div className="flex items-center">
                      <div className="mr-2 bg-slate-800 rounded p-1">
                        {React.cloneElement(icon.icon as React.ReactElement, { className: "h-4 w-4 text-white" })}
                      </div>
                      {icon.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <Select
              value={formData.color}
              onValueChange={handleColorChange}
            >
              <SelectTrigger className="col-span-3" id="color">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map(color => (
                  <SelectItem key={color.id} value={color.id}>
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 ${color.id}`}></div>
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Preview</Label>
            <div className="col-span-3 border rounded-lg p-2 flex items-center">
              <div className={`${formData.color} rounded-md p-2 flex items-center justify-center mr-3`}>
                {iconOptions.find(icon => icon.id === formData.iconId)?.icon}
              </div>
              <div>
                <p className="font-medium">{formData.name || "Category Name"}</p>
                <p className="text-xs text-muted-foreground">{formData.description || "Category description goes here"}</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {categoryToEdit ? "Save Changes" : "Add Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryManagement;
