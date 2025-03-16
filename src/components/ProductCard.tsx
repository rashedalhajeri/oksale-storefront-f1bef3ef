
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-full border border-neutral-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        {!product.inStock && (
          <Badge className="absolute top-2 right-2 z-10 bg-neutral-800 text-white">
            غير متوفر
          </Badge>
        )}
        
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
            <ShoppingCart className="h-4 w-4 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
            إضافة للسلة
          </Button>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-neutral-800 text-sm line-clamp-2 h-[40px] leading-tight mb-2">{product.name}</h3>
        
        <div className="flex items-center justify-between">
          <span className="font-semibold text-indigo-700">{formattedPrice}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-indigo-50 text-indigo-600 h-8 w-8 rounded-full"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
