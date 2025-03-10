
import React from "react";
import { Image, FileText, MessageSquare, Video } from "lucide-react";
import { NavSection, NavItem } from "../NavSection";

interface SectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ContentSection = ({ activeTab, setActiveTab }: SectionProps) => {
  return (
    <NavSection title="Content">
      <NavItem
        id="banners"
        label="Banners"
        icon={<Image className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="blog"
        label="Blog Posts"
        icon={<FileText className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="community"
        label="Community Posts"
        icon={<MessageSquare className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
      <NavItem
        id="stories"
        label="Stories"
        icon={<Video className="mr-2 h-4 w-4" />}
        activeTab={activeTab}
        onClick={setActiveTab}
      />
    </NavSection>
  );
};

export default ContentSection;
