
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, X, Pencil, Trash2 } from "lucide-react";
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
  handleDeleteClick
}) => {
  if (isEditable) {
    return (
      <>
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
        <div className="px-2 flex gap-1">
          <Button variant="ghost" size="icon" onClick={handleSaveClick}>
            <Check className="h-4 w-4 text-green-500" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCancelClick}>
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-4 flex-1">
        <h3 className="font-semibold text-base">{category.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
      </div>
      <div className="px-2 flex gap-1">
        <Button variant="ghost" size="icon" onClick={handleEditClick}>
          <Pencil className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDeleteClick}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </>
  );
};

export default CategoryCardEdit;
