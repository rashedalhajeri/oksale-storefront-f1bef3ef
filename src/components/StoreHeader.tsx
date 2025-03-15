
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  MapPin, 
  Star, 
  Calendar, 
  Heart,
  Share2,
  ShoppingBag
} from 'lucide-react';

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
  };
}

const StoreHeader = ({ store }: StoreHeaderProps) => {
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  return (
    <div className="relative">
      <div className="h-[45vh] overflow-hidden">
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
      
      <div className="absolute bottom-0 left-0 right-0 text-white p-8">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-4 border-white shadow-lg bg-white">
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
                  <ShoppingBag className="w-12 h-12 text-neutral-500" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl md:text-4xl font-bold">{store.name}</h1>
                {store.featured && (
                  <Badge className="bg-indigo-500 text-white">Featured</Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {store.owner}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {store.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {store.rating} ({store.reviewCount} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Since {store.foundedYear}
                </span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Heart className="w-4 h-4 mr-2" />
              Follow
            </Button>
            <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
