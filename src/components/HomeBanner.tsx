
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannerProps {
  images: {
    src: string;
    alt: string;
    url: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
}

const HomeBanner = ({ images, autoPlay = true, interval = 5000 }: BannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative h-48">
        {images.map((image, index) => (
          <a
            key={index}
            href={image.url}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </a>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 border-none rounded-full h-8 w-8"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 border-none rounded-full h-8 w-8"
        onClick={goToNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;
