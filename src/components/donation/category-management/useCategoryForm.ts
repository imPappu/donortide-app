
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CategoryFormData, FormErrors } from "./types";
import { DonationCategory } from "../CategoryCard";

export const useCategoryForm = (categoryToEdit?: DonationCategory) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    id: categoryToEdit?.id || uuidv4(),
    name: categoryToEdit?.name || "",
    description: categoryToEdit?.description || "",
    color: categoryToEdit?.color || "bg-blue-500",
    iconId: "droplet"
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    description: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (errors[name as keyof FormErrors]) {
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
  
  const resetForm = () => {
    setFormData({
      id: uuidv4(),
      name: "",
      description: "",
      color: "bg-blue-500",
      iconId: "droplet"
    });
    setErrors({ name: "", description: "" });
  };

  return {
    formData,
    errors,
    handleChange,
    handleIconChange,
    handleColorChange,
    validateForm,
    resetForm
  };
};
