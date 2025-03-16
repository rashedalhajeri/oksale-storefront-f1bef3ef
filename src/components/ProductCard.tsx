
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            imageLoaded ? "opacity-100" : "opacity-0",
            isHovered ? "scale-105" : "scale-100"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-white text-neutral-800 px-3 py-1 rounded-md font-medium text-xs">
              غير متوفر
            </span>
          </div>
        )}
        
        {/* Add to cart button overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white hover:bg-neutral-50 text-indigo-600 shadow-md"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            إضافة للسلة
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-neutral-800 text-base line-clamp-2 h-[48px] leading-tight">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-indigo-700">{formattedPrice}</span>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-indigo-50 text-indigo-600 h-8 w-8"
              disabled={!product.inStock}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-indigo-50 text-indigo-600 h-8 w-8"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
