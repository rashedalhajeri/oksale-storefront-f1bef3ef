
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, CheckCircle2, Instagram, Twitter, Facebook, Globe, MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

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
    };
  };
}

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

  // Default cover image if none is provided
  const defaultCoverUrl = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&h=300";

  // Check if there's no cover image
  const hasCover = !!store.coverImage;

  return (
    <div className="relative">
      {/* Cover image container with fixed height */}
      <div className="h-[30vh] md:h-[45vh] overflow-hidden">
        {/* Always show an image - either the store's cover or the default one */}
        <img 
          src={hasCover ? store.coverImage : defaultCoverUrl} 
          alt={`${store.name} cover`} 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-700", 
            coverLoaded ? "opacity-100" : "opacity-0"
          )} 
          onLoad={() => setCoverLoaded(true)} 
        />
        
        {/* Always apply the gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
      
      {/* Store info container with improved positioning */}
      <div className="absolute bottom-0 left-0 right-0 pb-5 md:pb-8 flex items-end text-white">
        <div className="w-full max-w-5xl mx-auto px-3 md:px-8">
          <div className="flex items-center justify-between">
            {/* Store logo and info */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Logo with consistent size */}
              <div className="w-14 h-14 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 md:border-3 border-white shadow-lg bg-white flex-shrink-0">
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
              
              {/* Store details with consistent text sizes */}
              <div>
                <div className="flex items-center gap-1 md:gap-1.5 mb-0.5 md:mb-1">
                  <h1 className="text-lg md:text-2xl font-bold truncate">{store.name}</h1>
                  {store.featured && (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center p-0.5 md:p-1 rounded-full border border-blue-400 h-3.5 w-3.5 md:h-5 md:w-5 flex-shrink-0">
                      <CheckCircle2 className="w-2 h-2 md:w-3 md:h-3" />
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-white text-xs md:text-sm">
                  <span className="truncate">{displayHandle}</span>
                </div>
                
                {/* Display address if available */}
                {store.address && (
                  <div className="flex items-center gap-1 text-white text-xs md:text-sm mt-1">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="truncate">{store.address}</span>
                  </div>
                )}
                
                {/* Social links - only show if they exist */}
                {(store.socialLinks?.instagram || store.socialLinks?.twitter || store.socialLinks?.facebook || store.socialLinks?.website) && (
                  <div className="flex items-center gap-3 md:gap-4 mt-2">
                    {store.socialLinks?.instagram && (
                      <a 
                        href={store.socialLinks.instagram.startsWith('http') ? store.socialLinks.instagram : `https://instagram.com/${store.socialLinks.instagram}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                    {store.socialLinks?.twitter && (
                      <a 
                        href={store.socialLinks.twitter.startsWith('http') ? store.socialLinks.twitter : `https://twitter.com/${store.socialLinks.twitter}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                    {store.socialLinks?.facebook && (
                      <a 
                        href={store.socialLinks.facebook.startsWith('http') ? store.socialLinks.facebook : `https://facebook.com/${store.socialLinks.facebook}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
                    {store.socialLinks?.website && (
                      <a 
                        href={store.socialLinks.website.startsWith('http') ? store.socialLinks.website : `https://${store.socialLinks.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        <Globe className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    )}
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
