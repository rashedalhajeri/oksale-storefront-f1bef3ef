
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface StoreCardProps {
  store: {
    id: number;
    name: string;
    owner: string;
    image: string;
    handle: string;
    category: string;
    productCount: number;
  };
}

const StoreCard = ({ store }: StoreCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <div className="relative aspect-[16/9] overflow-hidden bg-oksale-100">
        <img
          src={store.image}
          alt={store.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center justify-between">
            <Badge className="bg-white/20 text-white backdrop-blur-sm border-none">
              {store.category}
            </Badge>
            <Badge className="bg-oksale-700 text-white border-none">
              {store.productCount} products
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-oksale-800">{store.name}</h3>
          <div className="w-8 h-8 bg-oksale-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-4 w-4 text-oksale-700" />
          </div>
        </div>
        
        <p className="text-oksale-600 text-sm mb-4">
          By {store.owner} · <span className="font-medium text-oksale-700">{store.handle}</span>
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {['Apparel', 'Accessories', 'New'].map((tag, i) => (
            <Badge 
              key={i} 
              variant="outline"
              className="bg-oksale-50 text-oksale-600 border-oksale-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button 
          asChild
          className="w-full bg-oksale-700 hover:bg-oksale-800 text-white transition-colors gap-2"
        >
          <Link to={`/store/${store.id}`}>
            Visit Store
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StoreCard;
