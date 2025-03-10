
import React, { useState } from "react";
import { useEventsCampaignsAddon } from "@/hooks/addon-modules/events-campaigns/useEventsCampaignsAddon";
import { Button } from "@/components/ui/button";
import { Plus, RotateCw } from "lucide-react";
import EventsList from "./EventsList";
import EventDialog from "./EventDialog";
import { Event, EventFormData } from "@/hooks/addon-modules/events-campaigns/types";

const EventsTab = () => {
  const {
    isLoading,
    events,
    createEvent,
    updateEvent,
    deleteEvent,
    refreshData
  } = useEventsCampaignsAddon();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const handleAddEvent = () => {
    setCurrentEvent(null);
    setDialogMode("create");
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = async (id: number) => {
    await deleteEvent(id);
  };

  const handleSaveEvent = async (eventData: EventFormData) => {
    if (dialogMode === "create") {
      await createEvent(eventData);
    } else if (dialogMode === "edit" && currentEvent) {
      await updateEvent(currentEvent.id, eventData);
    }
    setIsDialogOpen(false);
  };

  const handleRefresh = async () => {
    await refreshData();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Manage Events</h2>
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
            onClick={handleAddEvent}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <EventsList
        events={events}
        isLoading={isLoading}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />

      <EventDialog
        event={currentEvent}
        isOpen={isDialogOpen}
        mode={dialogMode}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
};

export default EventsTab;
