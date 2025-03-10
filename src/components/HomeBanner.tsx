
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [isLoaded, setIsLoaded] = useState<boolean[]>(Array(images.length).fill(false));

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const handleImageLoad = (index: number) => {
    const newLoaded = [...isLoaded];
    newLoaded[index] = true;
    setIsLoaded(newLoaded);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const autoPlayInterval = setInterval(goToNext, interval);
    return () => clearInterval(autoPlayInterval);
  }, [autoPlay, interval]);

  if (!images.length) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md">
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        {images.map((image, index) => (
          <a
            key={index}
            href={image.url}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <div className={cn(
              "absolute inset-0 bg-gray-200 animate-pulse",
              isLoaded[index] ? "opacity-0" : "opacity-100"
            )} />
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              onLoad={() => handleImageLoad(index)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <h3 className="text-lg font-semibold">{image.alt}</h3>
            </div>
          </a>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 border-none rounded-full h-10 w-10 z-20 shadow-md"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 border-none rounded-full h-10 w-10 z-20 shadow-md"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all duration-300 shadow-sm",
              index === currentIndex 
                ? "bg-white scale-110 w-4" 
                : "bg-white/50 hover:bg-white/80"
            )}
            onClick={() => goToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;
