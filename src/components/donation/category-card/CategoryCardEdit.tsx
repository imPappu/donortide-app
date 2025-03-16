
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X, Pencil, Trash } from "lucide-react";
import { DonationCategory } from "./types";

interface CategoryCardEditProps {
  category: DonationCategory;
  editForm: DonationCategory;
  isEditable: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSaveClick: (e: React.MouseEvent) => void;
  handleCancelClick: (e: React.MouseEvent) => void;
  handleEditClick: (e: React.MouseEvent) => void;
  handleDeleteClick: (e: React.MouseEvent) => void;
}

const CategoryCardEdit: React.FC<CategoryCardEditProps> = ({
  category,
  editForm,
  isEditable,
  handleChange,
  handleSaveClick,
  handleCancelClick,
  handleEditClick,
  handleDeleteClick,
}) => {
  if (isEditable) {
    return (
      <div className="p-4 flex-1 space-y-3">
        <Input
          name="name"
          value={editForm.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="font-semibold"
        />
        <Input
          name="description"
          value={editForm.description}
          onChange={handleChange}
          placeholder="Category Description"
          className="text-xs"
        />
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancelClick}
            className="flex-1"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSaveClick}
            className="flex-1"
          >
            <Check className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 flex-1">
        <h3 className="font-semibold text-base">{category.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
      </div>
      <div className="pr-2 flex flex-col space-y-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleEditClick}
          className="h-8 px-2"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDeleteClick}
          className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default CategoryCardEdit;
