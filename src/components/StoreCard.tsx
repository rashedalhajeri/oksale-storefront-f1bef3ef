
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all card-hover">
      <div className="relative aspect-[16/9] overflow-hidden bg-oksale-100">
        <img
          src={store.image}
          alt={store.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 image-lazy",
            imageLoaded ? "loaded" : ""
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {store.category}
            </span>
            <span className="text-sm font-medium">{store.productCount} products</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">{store.name}</h3>
          <div className="w-8 h-8 bg-oksale-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-4 w-4 text-oksale-700" />
          </div>
        </div>
        
        <p className="text-oksale-600 text-sm mb-3">
          By {store.owner} · {store.handle}
        </p>
        
        <div className="flex space-x-2 mb-4">
          {['Apparel', 'Accessories', 'New'].map((tag, i) => (
            <span 
              key={i} 
              className="text-xs bg-oksale-50 text-oksale-600 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Button 
          asChild
          className="w-full bg-oksale-800 hover:bg-oksale-900 text-white transition-colors"
        >
          <Link to={`/store/${store.id}`}>
            Visit Store
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StoreCard;
