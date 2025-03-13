
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryFormData, FormErrors, iconOptions, colorOptions } from "./types";

interface CategoryFormFieldsProps {
  formData: CategoryFormData;
  errors: FormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleIconChange: (iconId: string) => void;
  handleColorChange: (color: string) => void;
}

const CategoryFormFields = ({
  formData,
  errors,
  handleChange,
  handleIconChange,
  handleColorChange
}: CategoryFormFieldsProps) => {
  return (
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
    </div>
  );
};

export default CategoryFormFields;
