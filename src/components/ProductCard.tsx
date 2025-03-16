
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
  currency?: string;
}

const ProductCard = ({ product, currency = 'USD' }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format price based on the provided currency
  const formattedPrice = new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(product.price);

  console.log(`Formatting price ${product.price} with currency ${currency}: ${formattedPrice}`);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 hover:scale-105",
            imageLoaded ? "loaded" : ""
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-white text-oksale-800 px-3 py-1 rounded-md font-medium text-xs">
              Out of Stock
            </span>
          </div>
        )}
        
        {/* Add to cart button overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white hover:bg-oksale-50 text-oksale-700"
            disabled={!product.inStock}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-oksale-800 text-base line-clamp-2 h-[48px] leading-tight">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-oksale-700">{formattedPrice}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-oksale-50 text-oksale-700 h-8 w-8"
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
