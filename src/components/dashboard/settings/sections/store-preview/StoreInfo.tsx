
import React from 'react';
import { CheckCircle2, MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import { SocialMediaType } from '@/utils/socialMediaUtils';
import SocialLinks from './SocialLinks';

interface StoreInfoProps {
  storeInfo: {
    name: string;
    handle: string;
    logo_url: string;
    address?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
    snapchat?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  logoLoaded: boolean;
  setLogoLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreInfo: React.FC<StoreInfoProps> = ({ 
  storeInfo, 
  logoLoaded, 
  setLogoLoaded 
}) => {
  const displayHandle = storeInfo.handle.startsWith('@') 
    ? storeInfo.handle
    : `@${storeInfo.handle}`;

  const getActiveSocialLinks = () => {
    const links: Array<[SocialMediaType, string]> = [];
    
    if (storeInfo.instagram) links.push(['instagram', storeInfo.instagram]);
    if (storeInfo.twitter) links.push(['twitter', storeInfo.twitter]);
    if (storeInfo.facebook) links.push(['facebook', storeInfo.facebook]);
    if (storeInfo.snapchat) links.push(['snapchat', storeInfo.snapchat]);
    if (storeInfo.tiktok) links.push(['tiktok', storeInfo.tiktok]);
    if (storeInfo.whatsapp) links.push(['whatsapp', storeInfo.whatsapp]);
    if (storeInfo.website) links.push(['website', storeInfo.website]);
    
    return links.slice(0, 3);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 pb-5 flex items-end text-white">
      <div className="w-full px-3 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative w-14 h-14 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 md:border-3 border-white shadow-lg bg-white flex-shrink-0">
              {storeInfo.logo_url ? (
                <img 
                  src={storeInfo.logo_url} 
                  alt={`${storeInfo.name} logo`} 
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-500", 
                    logoLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setLogoLoaded(true)}
                />
              ) : (
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-neutral-500" />
                </div>
              )}
            </div>
            
            <div className="glass-card px-3 py-2 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-1 md:gap-1.5 mb-0.5 md:mb-1">
                <h1 className="text-lg md:text-2xl font-bold truncate text-shadow">{storeInfo.name || 'اسم المتجر'}</h1>
                <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center p-0.5 md:p-1 rounded-full border border-blue-400 h-3.5 w-3.5 md:h-5 md:w-5 flex-shrink-0">
                  <CheckCircle2 className="w-2 h-2 md:w-3 md:h-3" />
                </Badge>
              </div>
              
              <div className="flex items-center gap-1 text-white text-xs md:text-sm text-shadow">
                <span className="ltr-text inline-block" dir="ltr">{displayHandle}</span>
              </div>
              
              {storeInfo.address && (
                <div className="flex items-center gap-1 text-white text-xs md:text-sm mt-1 text-shadow">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="truncate">{storeInfo.address}</span>
                </div>
              )}
              
              <SocialLinks links={getActiveSocialLinks()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
