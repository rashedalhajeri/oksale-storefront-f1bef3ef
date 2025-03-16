
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Heart,
  Share,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  Tag,
  Truck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_COVER_IMAGE } from '@/components/StoreHeader';
import { v4 as uuidv4 } from 'uuid';

const StoreProductDetails: React.FC = () => {
  const { handle, productId } = useParams<{ handle: string; productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Fetch store data
  const { data: storeData, isLoading: isLoadingStore } = useQuery({
    queryKey: ['store-product-details', handle],
    queryFn: async () => {
      if (!handle) throw new Error('معرف المتجر غير موجود');
      
      const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
      const { data, error } = await supabase
        .from('stores')
        .select('id, name, logo_url, cover_url, handle, currency, custom_color, use_custom_colors')
        .eq('handle', cleanHandle)
        .single();
      
      if (error) throw error;
      return data;
    },
    meta: {
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "خطأ في تحميل بيانات المتجر",
          description: error.message
        });
      }
    }
  });
  
  // Fetch product data
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product-details', productId],
    queryFn: async () => {
      if (!productId) throw new Error('معرف المنتج غير موجود');
      
      // This would be replaced with a real API call to Supabase
      // For now, we'll use placeholder data
      return {
        id: productId,
        name: "قميص كلاسيكي أبيض",
        price: 199.99,
        description: "قميص قطني أبيض كلاسيكي بقصة عصرية، مناسب لجميع المناسبات. مصنوع من قطن عالي الجودة، مريح وأنيق.",
        images: [
          "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        ],
        inStock: true,
        category: "ملابس",
        isNew: true,
        discount: null,
        rating: 4.8,
        reviewCount: 24,
        features: [
          "100% قطن مصري",
          "أزرار عالية الجودة",
          "مناسب للغسيل بالغسالة",
          "متوفر بألوان متعددة"
        ],
        sizes: ["S", "M", "L", "XL"]
      };
    },
    enabled: !!productId,
    meta: {
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "خطأ في تحميل بيانات المنتج",
          description: error.message
        });
      }
    }
  });
  
  const getMainColor = () => {
    if (storeData?.use_custom_colors && storeData?.custom_color) {
      return storeData.custom_color;
    }
    return '#4B5563'; // Default color
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: storeData?.currency || 'SAR'
    }).format(amount);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const addToCart = () => {
    if (!storeData?.id) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "لا يمكن إضافة المنتج إلى سلة التسوق"
      });
      return;
    }
    
    setIsAddingToCart(true);
    
    try {
      const storeKey = `cart-${storeData.id}`;
      let cart = [];
      
      const savedCart = localStorage.getItem(storeKey);
      if (savedCart) {
        cart = JSON.parse(savedCart);
      }
      
      // Check if product already exists in cart
      const existingProductIndex = cart.findIndex((item: any) => item.productId === product?.id);
      
      if (existingProductIndex >= 0) {
        // Update quantity if product already in cart
        cart[existingProductIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.push({
          id: uuidv4(),
          productId: product?.id,
          name: product?.name,
          price: product?.price,
          quantity: quantity,
          image: product?.images[0]
        });
      }
      
      localStorage.setItem(storeKey, JSON.stringify(cart));
      
      toast({
        title: "تمت الإضافة",
        description: `تمت إضافة ${product?.name} إلى سلة التسوق`,
      });
    } catch (error) {
      console.error("خطأ في إضافة المنتج للسلة:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المنتج إلى السلة"
      });
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  const goToCart = () => {
    navigate(`/${handle?.replace('@', '')}/cart`);
  };
  
  if (isLoadingStore || isLoadingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-red-600 mb-2">المنتج غير موجود</h2>
          <p className="text-gray-600">
            لم يتم العثور على المنتج الذي تبحث عنه. يرجى التحقق من الرابط أو العودة للمتجر.
          </p>
          <Button className="mt-4" onClick={() => navigate(`/${handle?.replace('@', '')}`)}>
            العودة للمتجر
          </Button>
        </div>
      </div>
    );
  }
  
  const mainColor = getMainColor();
  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100)) 
    : null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Store Header Background */}
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${storeData?.cover_url || DEFAULT_COVER_IMAGE})` 
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <Link 
            to={`/${handle?.replace('@', '')}`} 
            className="flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>العودة للمتجر</span>
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-16 z-10 pb-16 md:pb-6">
        <Card className="overflow-hidden shadow-lg mb-8">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Product Images */}
              <div className="relative bg-white p-6 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="max-w-full max-h-[400px] object-contain"
                />
                
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-medium px-2 py-1 rounded-md">
                    خصم {product.discount}%
                  </div>
                )}
                
                {product.isNew && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-md">
                    جديد
                  </div>
                )}
                
                <div className="absolute bottom-4 right-4 flex space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="bg-white p-6 md:p-8 flex flex-col">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">التصنيف: {product.category}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2 rtl:space-x-reverse mb-2">
                    {discountedPrice ? (
                      <>
                        <span className="text-2xl font-bold">{formatCurrency(discountedPrice)}</span>
                        <span className="text-gray-500 line-through">{formatCurrency(product.price)}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold">{formatCurrency(product.price)}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 mr-1">{product.rating} ({product.reviewCount} تقييم)</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                {product.features && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">المميزات:</h3>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mt-1 ml-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {product.sizes && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">المقاسات المتوفرة:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          className="h-10 w-10 p-0 flex items-center justify-center border-gray-300"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-auto">
                  <div className="flex items-center mb-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-10"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-16 text-center mx-2">
                      <span className="text-lg font-medium">{quantity}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-10"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button 
                      className="w-full"
                      style={{ 
                        backgroundColor: mainColor,
                        borderColor: mainColor,
                        '--tw-ring-color': `${mainColor}80` // Adding transparency for the ring
                      } as React.CSSProperties}
                      onClick={addToCart}
                      disabled={isAddingToCart || !product.inStock}
                    >
                      {isAddingToCart ? (
                        <span>جارِ الإضافة...</span>
                      ) : !product.inStock ? (
                        <span>غير متوفر</span>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          <span>إضافة للسلة</span>
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={goToCart}
                    >
                      <span>الذهاب للسلة</span>
                      <ArrowRight className="h-4 w-4 mr-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between">
            <div className="flex items-center mb-2 sm:mb-0">
              <Tag className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                {product.inStock ? 'متوفر في المخزون' : 'غير متوفر حالياً'}
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <Truck className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  التوصيل خلال 3-5 أيام عمل
                </span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  ضمان الجودة
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StoreProductDetails;
