
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
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-oksale-50">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 image-lazy",
            imageLoaded ? "loaded" : "",
            "group-hover:scale-105 transition-transform duration-500"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Quick add button that appears on hover */}
        <div 
          className={cn(
            "absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 transition-opacity duration-300",
            isHovered ? "opacity-100" : ""
          )}
        >
          <Button 
            className="bg-white text-oksale-800 hover:bg-oksale-50 transition-colors shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            size="sm"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
        
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-white text-oksale-800 px-2 py-1 md:px-3 md:py-1 rounded-md font-medium text-xs md:text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 md:p-4">
        <h3 className="font-medium text-base md:text-lg line-clamp-1">{product.name}</h3>
        <p className="text-oksale-600 text-xs md:text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-2 md:mt-3 flex items-center justify-between">
          <span className="font-semibold text-sm md:text-base">{formattedPrice}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-oksale-50 text-oksale-700 text-xs md:text-sm"
            disabled={!product.inStock}
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
