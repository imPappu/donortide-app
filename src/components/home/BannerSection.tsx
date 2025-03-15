
import React from "react";
import HomeBanner from "@/components/HomeBanner";

interface BannerSectionProps {
  images: {
    src: string;
    alt: string;
    url: string;
  }[];
}

const BannerSection = ({ images }: BannerSectionProps) => {
  return <HomeBanner images={images} />;
};

export default BannerSection;
