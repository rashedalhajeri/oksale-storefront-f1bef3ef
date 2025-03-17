
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart } from 'lucide-react';
import { formatCurrencyDisplay } from '@/utils/dashboard/currencyUtils';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
    inStock: boolean;
  };
  currency?: string;
}

const ProductCard = ({ product, currency = 'KWD' }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Format price using our Arab-friendly currency utility
  const formattedPrice = formatCurrencyDisplay(product.price, currency);

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform perspective-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            imageLoaded ? "loaded blur-up" : "blur-up",
            isHovered ? "scale-110" : "scale-100"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-white text-neutral-800 px-3 py-1 rounded-md font-medium text-xs shimmer">
              نفذت الكمية
            </span>
          </div>
        )}
        
        {/* Add to cart button overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center transition-all duration-300 p-4",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <Button 
            variant="secondary" 
            size="sm" 
            className="w-full bg-white hover:bg-neutral-50 text-neutral-700 liquid-button"
            disabled={!product.inStock}
          >
            <ShoppingBag className="h-4 w-4 ml-1" />
            إضافة للسلة
          </Button>
        </div>
        
        {/* Favorite button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full transition-all duration-300",
            isFavorite ? "bg-red-500 text-white" : "bg-white/80 text-neutral-500 hover:bg-white"
          )}
        >
          <Heart className={cn(
            "h-4 w-4 transition-all",
            isFavorite && "fill-current animate-in zoom-in" 
          )} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-neutral-800 text-base line-clamp-2 h-[48px] leading-tight">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-neutral-700 rtl-number text-base">{formattedPrice}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-neutral-50 text-neutral-700 h-8 w-8 hover:scale-110 transition-transform"
            disabled={!product.inStock}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
