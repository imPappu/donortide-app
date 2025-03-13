
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryCardProps } from "./types";
import { useCategoryCard } from "./useCategoryCard";
import CategoryCardEdit from "./CategoryCardEdit";
import CategoryCardDisplay from "./CategoryCardDisplay";

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  isEditing = false,
  onEdit,
  onDelete 
}) => {
  const {
    editForm,
    isEditable,
    isAdmin,
    handleClick,
    handleEditClick,
    handleDeleteClick,
    handleSaveClick,
    handleCancelClick,
    handleChange
  } = useCategoryCard(category, isEditing);

  const onSaveClick = (e: React.MouseEvent) => {
    const updatedCategory = handleSaveClick(e);
    if (onEdit) {
      onEdit(updatedCategory);
    }
  };

  const onDeleteClick = (e: React.MouseEvent) => {
    const categoryId = handleDeleteClick(e);
    if (onDelete) {
      onDelete(categoryId);
    }
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
          
          {isEditing && isAdmin ? (
            <CategoryCardEdit
              category={category}
              editForm={editForm}
              isEditable={isEditable}
              handleChange={handleChange}
              handleSaveClick={onSaveClick}
              handleCancelClick={handleCancelClick}
              handleEditClick={handleEditClick}
              handleDeleteClick={onDeleteClick}
            />
          ) : (
            <CategoryCardDisplay category={category} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
