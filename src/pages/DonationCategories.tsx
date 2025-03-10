
import React, { useState } from "react";
import TopNavbar from "@/components/TopNavbar";
import CategoryCard from "@/components/donation/CategoryCard";
import MonetaryDonationCard from "@/components/donation/MonetaryDonationCard";
import { donationCategories as initialCategories } from "@/data/donationCategories";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Save } from "lucide-react";
import CategoryManagement from "@/components/donation/CategoryManagement";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "@/hooks/use-toast";
import { DonationCategory } from "@/components/donation/CategoryCard";

const DonationCategories = () => {
  const [categories, setCategories] = useState<DonationCategory[]>(initialCategories);
  const [isEditing, setIsEditing] = useState(false);
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const { isAuthenticated, user } = useAuth();
  
  const isAdmin = isAuthenticated && user?.role === "admin";
  
  const handleAddCategory = (category: DonationCategory) => {
    setCategories([...categories, category]);
    toast({
      title: "Category Added",
      description: `${category.name} has been added to donation categories`,
    });
  };
  
  const handleUpdateCategory = (updatedCategory: DonationCategory) => {
    setCategories(categories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    ));
    toast({
      title: "Category Updated",
      description: `${updatedCategory.name} has been updated successfully`,
    });
  };
  
  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    toast({
      title: "Category Deleted",
      description: "Donation category has been removed",
    });
  };
  
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Save changes to backend would go here
      toast({
        title: "Changes Saved",
        description: "Your changes to donation categories have been saved",
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Donation Categories" />
      
      <div className="container max-w-md mx-auto px-4 py-6 flex-1 pb-20">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold mb-1">Ways to Donate</h1>
            <p className="text-sm text-muted-foreground">
              Choose a category below to donate and help those in need
            </p>
          </div>
          
          {isAdmin && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleEditMode}
              >
                {isEditing ? <Save className="h-4 w-4 mr-1" /> : <Edit className="h-4 w-4 mr-1" />}
                {isEditing ? "Save" : "Edit"}
              </Button>
              
              <Button
                size="sm"
                onClick={() => setIsManagingCategories(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          )}
        </div>
        
        <div className="space-y-4 mb-6">
          {categories.map(category => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              isEditing={isEditing}
              onEdit={handleUpdateCategory}
              onDelete={handleDeleteCategory}
            />
          ))}
        </div>
        
        <MonetaryDonationCard />
      </div>
      
      {isAdmin && (
        <CategoryManagement
          isOpen={isManagingCategories}
          onClose={() => setIsManagingCategories(false)}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          categories={categories}
        />
      )}
    </div>
  );
};

export default DonationCategories;
