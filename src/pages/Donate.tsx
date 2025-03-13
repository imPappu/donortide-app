
import React, { useState, useEffect } from "react";
import TopNavbar from "@/components/TopNavbar";
import CategoryCard, { DonationCategory } from "@/components/donation/category-card";
import MonetaryDonationCard from "@/components/donation/MonetaryDonationCard";
import { donationCategories as initialCategories } from "@/data/donationCategories";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Save } from "lucide-react";
import CategoryManagement from "@/components/donation/category-management";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Donate = () => {
  const [categories, setCategories] = useState<DonationCategory[]>(initialCategories);
  const [isEditing, setIsEditing] = useState(false);
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<DonationCategory | undefined>(undefined);
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
    setCategoryToEdit(undefined);
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
  
  const handleEditCategory = (category: DonationCategory) => {
    setCategoryToEdit(category);
    setIsManagingCategories(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavbar title="Donate" />
      
      <div className="container max-w-4xl mx-auto px-4 py-6 flex-1 pb-20">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">How You Can Help</h1>
          <p className="text-muted-foreground">
            There are many ways to contribute to our mission. Choose an option below to get started.
          </p>
          
          {isAdmin && (
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleEditMode}
              >
                {isEditing ? <Save className="h-4 w-4 mr-1" /> : <Edit className="h-4 w-4 mr-1" />}
                {isEditing ? "Save Changes" : "Edit Categories"}
              </Button>
              
              <Button
                size="sm"
                onClick={() => {
                  setCategoryToEdit(undefined);
                  setIsManagingCategories(true);
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Category
              </Button>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="categories" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="categories">Donation Categories</TabsTrigger>
            <TabsTrigger value="monetary">Monetary Donations</TabsTrigger>
            <TabsTrigger value="info">Donation Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map(category => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  isEditing={isEditing}
                  onEdit={() => handleEditCategory(category)}
                  onDelete={handleDeleteCategory}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="monetary">
            <div className="max-w-md mx-auto">
              <MonetaryDonationCard />
            </div>
          </TabsContent>
          
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>About Our Donation Program</CardTitle>
                <CardDescription>Learn more about how your donations help the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Blood Donations</h3>
                    <p className="text-sm text-muted-foreground">
                      Your blood donation can save up to three lives. We collect whole blood, platelets, and plasma.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold text-lg">Clothing & Essential Items</h3>
                    <p className="text-sm text-muted-foreground">
                      Donated items are distributed to shelters, disaster victims, and families in need throughout the community.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold text-lg">Food Donations</h3>
                    <p className="text-sm text-muted-foreground">
                      Non-perishable food items help stock local food banks and provide meals for those facing food insecurity.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold text-lg">Monetary Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Financial contributions help fund our operations, transportation, storage, and distribution of donated items.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {isAdmin && (
        <CategoryManagement
          isOpen={isManagingCategories}
          onClose={() => {
            setIsManagingCategories(false);
            setCategoryToEdit(undefined);
          }}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          categories={categories}
          categoryToEdit={categoryToEdit}
        />
      )}
    </div>
  );
};

export default Donate;
