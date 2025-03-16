
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface StoreHeaderProps {
  storeData: any;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ storeData }) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-lg border border-gray-200/10 shadow-sm">
          {storeData?.logo_url ? (
            <div className="h-full w-full overflow-hidden rounded-lg">
              <AspectRatio ratio={1} className="h-full w-full">
                <img 
                  src={storeData.logo_url} 
                  alt={storeData?.name || 'Store'} 
                  className="h-full w-full object-cover" 
                />
              </AspectRatio>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bluesky-600 to-bluesky-800 text-white rounded-lg">
              <span className="text-lg font-semibold">{storeData?.name?.charAt(0) || 'S'}</span>
            </div>
          )}
        </div>
        <div className="overflow-hidden">
          <h2 className="text-lg font-semibold truncate">{storeData?.name || 'New Store'}</h2>
          <div className="text-xs text-white/70 truncate">
            <span className="ltr-text inline-block" dir="ltr">
              {storeData?.handle ? `@${storeData.handle}` : '@store'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
