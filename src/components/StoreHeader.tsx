
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, MapPin, Star, Calendar, Share2, ShoppingBag, CheckCircle, Instagram, Twitter, Facebook, Navigation } from 'lucide-react';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useParams } from 'react-router-dom';

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
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
    };
  };
}

const StoreHeader = ({
  store
}: StoreHeaderProps) => {
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="relative">
      <div className="h-[35vh] md:h-[45vh] overflow-hidden">
        <img 
          src={store.coverImage} 
          alt={`${store.name} cover`} 
          className={cn("w-full h-full object-cover transition-opacity duration-700", 
            coverLoaded ? "opacity-100" : "opacity-0")} 
          onLoad={() => setCoverLoaded(true)} 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 text-white p-4 md:p-8">
        <div className="max-w-5xl mx-auto flex items-end justify-between">
          <div className="flex items-end gap-4 md:gap-6">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden border-3 border-white shadow-lg bg-white">
              {store.logo ? (
                <img 
                  src={store.logo} 
                  alt={`${store.name} logo`} 
                  className={cn("w-full h-full object-cover transition-opacity duration-500", 
                    logoLoaded ? "opacity-100" : "opacity-0")} 
                  onLoad={() => setLogoLoaded(true)} 
                />
              ) : (
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-neutral-500" />
                </div>
              )}
            </div>
            <div className="mb-1">
              <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden mb-1">
                <h1 className="text-xl md:text-2xl font-bold truncate">{store.name}</h1>
                {store.featured && (
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex-shrink-0 flex items-center justify-center p-1 rounded-full border border-blue-400 h-4 w-4 md:h-5 md:w-5">
                    <CheckCircle className="w-2 h-2 md:w-3 md:h-3" />
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1 text-blue-100 text-xs mt-0.5 whitespace-nowrap overflow-hidden">
                <span className="text-white truncate">@Fashion</span>
              </div>
              
              <div className="flex items-center gap-3 md:gap-4 mt-2">
                {store.socialLinks?.instagram && (
                  <a href={store.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition-colors">
                    <Instagram className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                )}
                {store.socialLinks?.twitter && (
                  <a href={store.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition-colors">
                    <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                )}
                {store.socialLinks?.facebook && (
                  <a href={store.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition-colors">
                    <Facebook className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex gap-2">
            <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 text-xs py-1 px-3 h-8">
              <Share2 className="w-3 h-3 mr-1.5" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
