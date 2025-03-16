
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, CheckCircle2, MapPin, Landmark } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { getSocialIcon, getSocialUrl, type SocialMediaType } from '@/utils/socialMediaUtils';

interface StoreHeaderProps {
  store: {
    name: string;
    owner: string;
    coverImage: string;
    logo?: string;
    handle: string;
    location: string;
    foundedYear: number;
    rating: number;
    reviewCount: number;
    featured: boolean;
    address?: string;
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
      website?: string;
      snapchat?: string;
      tiktok?: string;
      whatsapp?: string;
    };
  };
}

// Define the default cover image URL as a constant that can be exported
export const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80";

const StoreHeader = ({
  store
}: StoreHeaderProps) => {
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { handle } = useParams<{ handle: string }>();
  const isMobile = useIsMobile();

  // استخراج المعرف بدون علامة @ للعرض
  const displayHandle = store.handle.startsWith('@') 
    ? store.handle
    : `@${store.handle}`;

  // Check if there's no cover image
  const hasCover = !!store.coverImage;

  // Get all active social links without limiting to 3
  const getSocialLinks = () => {
    if (!store.socialLinks) return [];
    
    // Get all social media links that have values
    return Object.entries(store.socialLinks)
      .filter(([_, value]) => !!value);
  };

  return (
    <div className="relative">
      {/* Cover image container with fixed height */}
      <div className="h-[30vh] md:h-[45vh] overflow-hidden">
        {/* Always show an image - either the store's cover or the default one */}
        <img 
          src={hasCover ? store.coverImage : DEFAULT_COVER_IMAGE} 
          alt={`${store.name} cover`} 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-700", 
            coverLoaded ? "opacity-100" : "opacity-0"
          )} 
          onLoad={() => setCoverLoaded(true)} 
        />
      </div>
      
      {/* Dark gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
      
      {/* Store info container with improved positioning */}
      <div className="absolute bottom-0 left-0 right-0 pb-5 md:pb-8 flex items-end text-white">
        <div className="w-full max-w-5xl mx-auto px-3 md:px-8">
          <div className="flex items-center justify-between">
            {/* Store logo and info */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Logo with increased size */}
              <div className="w-16 h-16 md:w-28 md:h-28 rounded-lg overflow-hidden border-2 md:border-3 border-white shadow-lg bg-white flex-shrink-0">
                {store.logo ? (
                  <img 
                    src={store.logo} 
                    alt={`${store.name} logo`} 
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
              
              {/* Store details with fixed height container */}
              <div className="glass-card px-3 py-2 rounded-lg backdrop-blur-sm bg-black/20 min-h-[4.5rem] md:min-h-[6.5rem] flex flex-col justify-center">
                <div className="flex items-center gap-1 md:gap-1.5 mb-1 md:mb-2">
                  <h1 className="text-base md:text-xl font-bold truncate text-shadow">{store.name}</h1>
                  {store.featured && (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center p-0.5 md:p-1 rounded-full border border-blue-400 h-3.5 w-3.5 md:h-5 md:w-5 flex-shrink-0">
                      <CheckCircle2 className="w-2 h-2 md:w-3 md:h-3" />
                    </Badge>
                  )}
                </div>
                
                {/* Display address if available */}
                {store.address && (
                  <div className="flex items-center gap-1 text-white text-xs md:text-sm mb-2 text-shadow">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="truncate">{store.address}</span>
                  </div>
                )}
                
                {/* Social links - display all available social media links */}
                {store.socialLinks && Object.entries(store.socialLinks).some(([_, value]) => !!value) && (
                  <div className="flex items-center flex-wrap justify-start gap-4 mt-auto">
                    {getSocialLinks().map(([type, username]) => {
                      if (!username) return null;
                      
                      return (
                        <a 
                          key={type}
                          href={getSocialUrl(type as SocialMediaType, username)} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white hover:text-blue-200 transition-colors flex items-center"
                          title={type}
                        >
                          {getSocialIcon(type as SocialMediaType, "w-4 h-4 md:w-5 md:h-5")}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
