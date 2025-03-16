
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  
  // Format price based on the provided currency but using English locale
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(product.price);

  console.log(`Formatting price ${product.price} with currency ${currency}: ${formattedPrice}`);

  const addToCart = () => {
    if (!handle) return;
    
    // Get the current store id from local storage
    const getStoreId = () => {
      // Here, we're making a simple store id based on the handle
      // In a real-world app, this would come from the API
      return `store-${handle}`;
    };
    
    const storeId = getStoreId();
    const storeKey = `cart-${storeId}`;
    
    // Get existing cart
    const existingCart = localStorage.getItem(storeKey);
    let cartItems = [];
    
    if (existingCart) {
      try {
        cartItems = JSON.parse(existingCart);
        
        // Check if the product is already in the cart
        const existingItemIndex = cartItems.findIndex(
          (item: any) => item.productId === product.id.toString()
        );
        
        if (existingItemIndex >= 0) {
          // Increment quantity if product already exists
          cartItems[existingItemIndex].quantity += 1;
        } else {
          // Add new product to cart
          cartItems.push({
            id: uuidv4(),
            productId: product.id.toString(),
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
          });
        }
      } catch (e) {
        console.error("Error parsing cart data", e);
        cartItems = [];
      }
    } else {
      // Create a new cart with this product
      cartItems = [{
        id: uuidv4(),
        productId: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }];
    }
    
    // Save updated cart
    localStorage.setItem(storeKey, JSON.stringify(cartItems));
    
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${product.name} إلى سلة التسوق`
    });
  };
  
  const goToCart = () => {
    navigate(`/${handle}/cart`);
  };

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
            <span className="bg-white text-neutral-800 px-3 py-1 rounded-md font-medium text-xs">
              Out of Stock
            </span>
          </div>
        )}
        
        {/* Add to cart button overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white hover:bg-neutral-50 text-neutral-700"
            disabled={!product.inStock}
            onClick={addToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-neutral-800 text-base line-clamp-2 h-[48px] leading-tight">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-neutral-700">{formattedPrice}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-neutral-50 text-neutral-700 h-8 w-8"
            disabled={!product.inStock}
            onClick={addToCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
