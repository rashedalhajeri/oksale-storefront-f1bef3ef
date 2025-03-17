
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
      {/* Cover image container with fixed height and curved bottom edge */}
      <div className="h-[30vh] md:h-[45vh] overflow-hidden relative">
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
        
        {/* Curved edge overlay for the bottom of the cover image */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" style={{ borderRadius: '50% 50% 0 0 / 10% 10% 0 0' }} />
      </div>
      
      {/* Dark gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
      
      {/* Store info container with improved positioning and curved edges */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center text-white">
        <div className="w-full max-w-5xl mx-auto px-3 md:px-8">
          <div className="flex flex-col items-center justify-center">
            {/* Store logo and info - centered with improved spacing */}
            <div className="flex flex-col items-center gap-4">
              {/* Logo with increased size and stronger shadow */}
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 md:border-3 border-white shadow-xl bg-white flex-shrink-0 transform -translate-y-6">
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
                    <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-neutral-500" />
                  </div>
                )}
              </div>
              
              {/* Store details with improved glass effect and curved edges */}
              <div className="glass-morphism px-6 py-4 rounded-xl shadow-lg min-w-[260px] md:min-w-[320px] flex flex-col items-center backdrop-blur-lg bg-black/20 border border-white/20 transform translate-y-2">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <h1 className="text-lg md:text-2xl font-bold text-shadow text-center">{store.name}</h1>
                  {store.featured && (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center p-0.5 md:p-1 rounded-full border border-blue-400 h-4 w-4 md:h-5 md:w-5 flex-shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </Badge>
                  )}
                </div>
                
                {/* Address - if available */}
                {store.address && (
                  <div className="flex items-center justify-center gap-1.5 text-white text-xs md:text-sm mb-3 text-shadow">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="truncate">{store.address}</span>
                  </div>
                )}
                
                {/* Social links - centered below the store name with better spacing */}
                {store.socialLinks && Object.entries(store.socialLinks).some(([_, value]) => !!value) && (
                  <div className="flex items-center justify-center flex-wrap gap-5 mt-2">
                    {getSocialLinks().map(([type, username]) => {
                      if (!username) return null;
                      
                      return (
                        <a 
                          key={type}
                          href={getSocialUrl(type as SocialMediaType, username)} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white hover:text-blue-200 transition-colors flex items-center hover:scale-110 transition-transform"
                          title={type}
                        >
                          {getSocialIcon(type as SocialMediaType, "w-5 h-5 md:w-6 md:h-6")}
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
