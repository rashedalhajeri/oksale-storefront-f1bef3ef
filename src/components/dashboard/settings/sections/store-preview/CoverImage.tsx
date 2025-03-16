
import React from 'react';
import { cn } from '@/lib/utils';
import { DEFAULT_COVER_IMAGE } from '@/components/StoreHeader';

interface CoverImageProps {
  coverUrl?: string;
  coverLoaded: boolean;
  setCoverLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  storeName: string;
}

const CoverImage: React.FC<CoverImageProps> = ({ 
  coverUrl, 
  coverLoaded, 
  setCoverLoaded, 
  storeName 
}) => {
  const hasCover = !!coverUrl;

  return (
    <>
      <div className="h-[30vh] md:h-[45vh] overflow-hidden">
        <img 
          src={hasCover ? coverUrl : DEFAULT_COVER_IMAGE} 
          alt={`${storeName} cover`} 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-700", 
            coverLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setCoverLoaded(true)}
        />
      </div>
      
      {/* Dark gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
    </>
  );
};

export default CoverImage;
