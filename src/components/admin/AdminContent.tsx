
import React from "react";
import ContentRouter from "./content/ContentRouter";
import { Banner, BlogPost, Notification } from "@/types/apiTypes";

interface AdminContentProps {
  activeTab: string;
  stats: {
    totalUsers: number;
    totalDonations: number;
    totalRequests: number;
    totalLocations: number;
  };
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  notification: Partial<Notification>;
  setNotification: React.Dispatch<React.SetStateAction<Partial<Notification>>>;
  loading: boolean;
}

const AdminContent = ({
  activeTab,
  stats,
  banners,
  setBanners,
  blogPosts,
  setBlogPosts,
  notification,
  setNotification,
  loading
}: AdminContentProps) => {
  return (
    <ContentRouter
      activeTab={activeTab}
      stats={stats}
      banners={banners}
      setBanners={setBanners}
      blogPosts={blogPosts}
      setBlogPosts={setBlogPosts}
      notification={notification}
      setNotification={setNotification}
      loading={loading}
    />
  );
};

export default AdminContent;
