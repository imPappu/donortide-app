
import React, { useState } from "react";
import { useEventsCampaignsAddon } from "@/hooks/addon-modules/events-campaigns/useEventsCampaignsAddon";
import { Button } from "@/components/ui/button";
import { Plus, RotateCw } from "lucide-react";
import CampaignsList from "./CampaignsList";
import CampaignDialog from "./CampaignDialog";
import { Campaign, CampaignFormData } from "@/hooks/addon-modules/events-campaigns/types";

const CampaignsTab = () => {
  const {
    isLoading,
    campaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    refreshData
  } = useEventsCampaignsAddon();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const handleAddCampaign = () => {
    setCurrentCampaign(null);
    setDialogMode("create");
    setIsDialogOpen(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleDeleteCampaign = async (id: number) => {
    await deleteCampaign(id);
  };

  const handleSaveCampaign = async (campaignData: CampaignFormData) => {
    if (dialogMode === "create") {
      await createCampaign(campaignData);
    } else if (dialogMode === "edit" && currentCampaign) {
      await updateCampaign(currentCampaign.id, campaignData);
    }
    setIsDialogOpen(false);
  };

  const handleRefresh = async () => {
    await refreshData();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Manage Campaigns</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RotateCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={handleAddCampaign}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Campaign
          </Button>
        </div>
      </div>

      <CampaignsList
        campaigns={campaigns}
        isLoading={isLoading}
        onEdit={handleEditCampaign}
        onDelete={handleDeleteCampaign}
      />

      <CampaignDialog
        campaign={currentCampaign}
        isOpen={isDialogOpen}
        mode={dialogMode}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveCampaign}
      />
    </div>
  );
};

export default CampaignsTab;
