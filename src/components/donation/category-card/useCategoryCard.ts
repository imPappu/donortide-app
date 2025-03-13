
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { DonationCategory } from "./types";

export const useCategoryCard = (category: DonationCategory, isEditing = false) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [editForm, setEditForm] = useState({ ...category });
  const [isEditable, setIsEditable] = useState(false);

  const isAdmin = isAuthenticated && user?.role === "admin";

  const handleClick = () => {
    if (isEditing) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to make a donation",
      });
      navigate("/login");
      return;
    }

    toast({
      title: `${category.name} donation`,
      description: `Coming soon: ${category.name.toLowerCase()} donation process`,
    });
  };
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditable(true);
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    return category.id;
  };
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditable(false);
    return editForm;
  };
  
  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditForm({ ...category });
    setIsEditable(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    editForm,
    isEditable,
    isAdmin,
    handleClick,
    handleEditClick,
    handleDeleteClick,
    handleSaveClick,
    handleCancelClick,
    handleChange
  };
};
