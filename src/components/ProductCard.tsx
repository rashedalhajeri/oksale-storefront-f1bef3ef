
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
    inStock: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="relative aspect-square overflow-hidden bg-oksale-50">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            imageLoaded ? "loaded" : ""
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-white text-oksale-800 px-2 py-1 rounded-md font-medium text-xs">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-base line-clamp-2 h-[40px]">{product.name}</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-oksale-50 text-oksale-700 ml-1 mt-[-4px]"
            disabled={!product.inStock}
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
        <span className="font-semibold text-sm text-oksale-700">{formattedPrice}</span>
      </div>
    </div>
  );
};

export default ProductCard;
