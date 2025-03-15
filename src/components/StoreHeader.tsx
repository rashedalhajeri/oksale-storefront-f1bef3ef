
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, MapPin, Star, Calendar, Share2, ShoppingBag, CheckCircle, Instagram, Twitter, Facebook, Navigation } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
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
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const isMobile = useIsMobile();
  
  return (
    <div className="relative">
      {/* Cover Image with Gradient Overlay */}
      <div className="h-[30vh] md:h-[45vh] overflow-hidden">
        <img 
          src={store.coverImage} 
          alt={`${store.name} cover`} 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-700", 
            coverLoaded ? "opacity-100" : "opacity-0"
          )} 
          onLoad={() => setCoverLoaded(true)} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
      
      {/* Store Information Section */}
      <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-0 right-0 text-white px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Logo and Name Section */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Store Logo */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-white shadow-lg bg-white flex-shrink-0">
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
            
            {/* Store Name and Details */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{store.name}</h1>
                {store.featured && (
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 py-1">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-xs">Featured</span>
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1 text-blue-100 text-xs mt-1">
                <span className="text-white text-sm">@{store.handle}</span>
              </div>
              
              {/* Store Stats */}
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-blue-300" />
                  <span>{store.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                  <span>{store.rating} ({store.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 text-blue-300" />
                  <span>Est. {store.foundedYear}</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-3 mt-2">
                {store.socialLinks?.instagram && (
                  <a href={store.socialLinks.instagram} target="_blank" rel="noopener noreferrer" 
                     className="text-white hover:text-blue-200 transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {store.socialLinks?.twitter && (
                  <a href={store.socialLinks.twitter} target="_blank" rel="noopener noreferrer" 
                     className="text-white hover:text-blue-200 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {store.socialLinks?.facebook && (
                  <a href={store.socialLinks.facebook} target="_blank" rel="noopener noreferrer" 
                     className="text-white hover:text-blue-200 transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-3 sm:mt-0">
            <Button variant="outline" 
                   className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Visit Store
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
