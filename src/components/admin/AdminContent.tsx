import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import EventsManagement from "./system/addons/event-management/EventsManagement";

const AdminContent = ({ activeTab }: AdminContentProps) => {
  switch (activeTab) {
    case "dashboard":
      return <DashboardContent />;
    
    case "events":
      return <EventsManagement />;
    
    default:
      return <DashboardContent />;
  }
};

export default AdminContent;
