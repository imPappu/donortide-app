
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Pencil, Trash2, Check, X } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface DonationCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface CategoryCardProps {
  category: DonationCategory;
  isEditing?: boolean;
  onEdit?: (category: DonationCategory) => void;
  onDelete?: (categoryId: string) => void;
}

const CategoryCard = ({ 
  category, 
  isEditing = false,
  onEdit,
  onDelete 
}: CategoryCardProps) => {
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
    if (onDelete) {
      onDelete(category.id);
    }
  };
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(editForm);
    }
    setIsEditable(false);
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

  return (
    <Card 
      className={`mb-4 overflow-hidden transform transition-all duration-200 hover:shadow-lg hover:scale-[1.01] ${!isEditing ? 'cursor-pointer' : ''}`}
      onClick={!isEditing ? handleClick : undefined}
    >
      <CardContent className="p-0">
        <div className="flex items-center">
          <div 
            className={`${isEditable ? editForm.color : category.color} p-6 flex items-center justify-center`}
          >
            {category.icon}
          </div>
          
          {isEditable ? (
            <div className="p-4 flex-1">
              <Input
                name="name"
                value={editForm.name}
                onChange={handleChange}
                className="mb-2 font-semibold"
                autoFocus
              />
              <Textarea
                name="description"
                value={editForm.description}
                onChange={handleChange}
                className="text-xs text-muted-foreground"
                rows={2}
              />
            </div>
          ) : (
            <div className="p-4 flex-1">
              <h3 className="font-semibold text-base">{category.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
            </div>
          )}
          
          {isEditing && isAdmin ? (
            isEditable ? (
              <div className="px-2 flex gap-1">
                <Button variant="ghost" size="icon" onClick={handleSaveClick}>
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCancelClick}>
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <div className="px-2 flex gap-1">
                <Button variant="ghost" size="icon" onClick={handleEditClick}>
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDeleteClick}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            )
          ) : (
            <div className="px-4">
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
