
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DonationCategory } from "../category-card";
import { iconOptions } from "./types";
import { useCategoryForm } from "./useCategoryForm";
import CategoryFormFields from "./CategoryFormFields";
import CategoryPreview from "./CategoryPreview";
import { DropletIcon } from "lucide-react";

interface CategoryManagementProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: DonationCategory) => void;
  onUpdateCategory: (category: DonationCategory) => void;
  categories: DonationCategory[];
  categoryToEdit?: DonationCategory;
}

const CategoryManagement = ({ 
  isOpen, 
  onClose, 
  onAddCategory, 
  onUpdateCategory,
  categories,
  categoryToEdit 
}: CategoryManagementProps) => {
  const {
    formData,
    errors,
    handleChange,
    handleIconChange,
    handleColorChange,
    validateForm,
    resetForm
  } = useCategoryForm(categoryToEdit);
  
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
    
    resetForm();
    onClose();
  };
  
  const handleDialogClose = () => {
    resetForm();
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
        
        <CategoryFormFields
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleIconChange={handleIconChange}
          handleColorChange={handleColorChange}
        />
        
        <CategoryPreview formData={formData} />
        
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
