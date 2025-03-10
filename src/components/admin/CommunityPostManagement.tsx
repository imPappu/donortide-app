
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import DBErrorAlert from "./DBErrorAlert";
import { useCommunityPostManagement } from "./community/useCommunityPostManagement";
import SearchBar from "./community/SearchBar";
import PostTable from "./community/PostTable";
import ViewPostDialog from "./community/ViewPostDialog";
import FlagPostDialog from "./community/FlagPostDialog";

const CommunityPostManagement = () => {
  const {
    posts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    setError,
    viewPostDialog,
    setViewPostDialog,
    flagDialog,
    setFlagDialog,
    selectedPost,
    flagReason,
    setFlagReason,
    handleViewPost,
    handleOpenFlagDialog,
    handleFlagPost,
    handleDeletePost,
    formatDate,
    truncateContent
  } = useCommunityPostManagement();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Community Post Management</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Flagged Posts
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <DBErrorAlert 
            error={error} 
            severity="error" 
            onDismiss={() => setError(null)} 
            className="mb-4"
          />
        )}

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {loading && posts.length === 0 ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : (
          <PostTable 
            posts={posts}
            onViewPost={handleViewPost}
            onOpenFlagDialog={handleOpenFlagDialog}
            onDeletePost={handleDeletePost}
            formatDate={formatDate}
            truncateContent={truncateContent}
          />
        )}

        <ViewPostDialog 
          post={selectedPost} 
          open={viewPostDialog} 
          onOpenChange={setViewPostDialog}
          formatDate={formatDate}
        />

        <FlagPostDialog 
          open={flagDialog}
          onOpenChange={setFlagDialog}
          flagReason={flagReason}
          setFlagReason={setFlagReason}
          onFlagPost={handleFlagPost}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default CommunityPostManagement;
