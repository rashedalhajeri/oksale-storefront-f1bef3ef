
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Heart, Share2 } from 'lucide-react';
import { formatCurrencyDisplay } from '@/utils/dashboard/currencyUtils';
import ProductImageGallery from '@/components/ProductImageGallery';
import { motion } from 'framer-motion';

interface EnhancedProductCardProps {
  product: {
    id: number | string;
    name: string;
    price: number;
    image: string | string[];
    description?: string;
    inStock: boolean;
    discount?: number | null;
    rating?: number;
  };
  currency?: string;
  onAddToCart?: (product: any) => void;
  onLike?: (product: any) => void;
  onShare?: (product: any) => void;
}

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({ 
  product, 
  currency = 'SAR',
  onAddToCart,
  onLike,
  onShare
}) => {
  // تنسيق السعر باستخدام أداة العملة المتوافقة مع العربية
  const formattedPrice = formatCurrencyDisplay(product.price, currency);
  
  // حساب السعر بعد الخصم إذا كان متاحًا
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
  
  const formattedDiscountedPrice = discountedPrice 
    ? formatCurrencyDisplay(discountedPrice, currency)
    : null;
  
  // معالجة الضغط على زر الإضافة إلى السلة
  const handleAddToCart = () => {
    if (product.inStock && onAddToCart) {
      onAddToCart(product);
    }
  };
  
  // معالجة الضغط على زر الإعجاب
  const handleLike = () => {
    if (onLike) {
      onLike(product);
    }
  };
  
  // معالجة الضغط على زر المشاركة
  const handleShare = () => {
    if (onShare) {
      onShare(product);
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* استخدام مكون معرض الصور المحسن */}
        <ProductImageGallery 
          images={typeof product.image === 'string' ? product.image : product.image}
          alt={product.name}
          showControls={true}
          aspectRatio="square"
        />
        
        {/* علامة الخصم */}
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
            خصم {product.discount}%
          </Badge>
        )}
        
        {/* حالة المخزون */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <Badge className="bg-white text-neutral-800 px-3 py-1.5 text-sm">
              نفذت الكمية
            </Badge>
          </div>
        )}
        
        {/* أزرار سريعة على الصورة */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {onLike && (
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={handleLike}
            >
              <Heart className="h-4 w-4 text-red-500" />
            </Button>
          )}
          
          {onShare && (
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 text-blue-500" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-neutral-800 text-base line-clamp-2 h-[48px] leading-tight">{product.name}</h3>
        </div>
        
        {product.description && (
          <p className="text-neutral-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {discountedPrice ? (
              <>
                <span className="font-semibold text-neutral-700">{formattedDiscountedPrice}</span>
                <span className="text-neutral-400 text-sm line-through">{formattedPrice}</span>
              </>
            ) : (
              <span className="font-semibold text-neutral-700">{formattedPrice}</span>
            )}
          </div>
          
          <Button 
            variant={product.inStock ? "default" : "secondary"}
            size="sm" 
            className={product.inStock 
              ? "bg-neutral-900 hover:bg-neutral-800 text-white" 
              : "bg-neutral-200 text-neutral-500 cursor-not-allowed"}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            {product.inStock ? "إضافة" : "نفذت"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedProductCard;
