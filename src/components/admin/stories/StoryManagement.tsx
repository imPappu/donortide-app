
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, Trash, Edit, Eye } from "lucide-react";
import StoryTable from "./StoryTable";
import ViewStoryDialog from "./ViewStoryDialog";
import EditStoryDialog from "./EditStoryDialog";
import DeleteStoryDialog from "./DeleteStoryDialog";
import { useStoryManagement } from "./useStoryManagement";
import { Story } from "@/types/community";

const StoryManagement = () => {
  const {
    stories,
    filteredStories,
    searchQuery,
    setSearchQuery,
    selectedStory,
    setSelectedStory,
    isViewDialogOpen,
    setIsViewDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteStory,
    handleUpdateStory,
    dateFilter,
    setDateFilter,
    isLoading,
    totalStories
  } = useStoryManagement();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Story Management</h2>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            className="w-auto"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          <Button variant="outline" size="sm" className="ml-1">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Story
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          <Badge variant="outline" className="mr-2">
            Total: {totalStories}
          </Badge>
          <Badge variant="outline" className="bg-blue-50">
            Active: {stories.filter(s => new Date(s.expiresAt) > new Date()).length}
          </Badge>
        </div>
      </div>

      <StoryTable
        stories={filteredStories}
        isLoading={isLoading}
        onView={(story) => {
          setSelectedStory(story);
          setIsViewDialogOpen(true);
        }}
        onEdit={(story) => {
          setSelectedStory(story);
          setIsEditDialogOpen(true);
        }}
        onDelete={(story) => {
          setSelectedStory(story);
          setIsDeleteDialogOpen(true);
        }}
      />

      {selectedStory && (
        <>
          <ViewStoryDialog
            story={selectedStory}
            isOpen={isViewDialogOpen}
            onClose={() => setIsViewDialogOpen(false)}
          />
          
          <EditStoryDialog
            story={selectedStory}
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            onSave={handleUpdateStory}
          />
          
          <DeleteStoryDialog
            story={selectedStory}
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={() => handleDeleteStory(selectedStory.id)}
          />
        </>
      )}
    </div>
  );
};

export default StoryManagement;
