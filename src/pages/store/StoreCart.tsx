
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Trash2, ShoppingCart, ShoppingBag, Plus, Minus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_COVER_IMAGE } from '@/components/StoreHeader';

// Type definitions for cart items
interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const StoreCart: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Fetch store data
  const { data: storeData, isLoading: isLoadingStore } = useQuery({
    queryKey: ['store-cart', handle],
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

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      if (!storeData?.id) return;
      
      const storeKey = `cart-${storeData.id}`;
      const savedCart = localStorage.getItem(storeKey);
      
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Error parsing cart data", e);
          setCartItems([]);
        }
      }
    };
    
    loadCart();
  }, [storeData?.id]);
  
  // Update localStorage whenever cart items change
  useEffect(() => {
    if (!storeData?.id || cartItems.length === 0) return;
    
    const storeKey = `cart-${storeData.id}`;
    localStorage.setItem(storeKey, JSON.stringify(cartItems));
  }, [cartItems, storeData?.id]);
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    setTimeout(() => setIsUpdating(false), 300);
  };
  
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "تم إزالة المنتج",
      description: "تم إزالة المنتج من سلة التسوق"
    });
  };
  
  const clearCart = () => {
    if (window.confirm("هل أنت متأكد من رغبتك في إفراغ السلة؟")) {
      setCartItems([]);
      if (storeData?.id) {
        const storeKey = `cart-${storeData.id}`;
        localStorage.removeItem(storeKey);
      }
      toast({
        title: "تم إفراغ السلة",
        description: "تم إفراغ سلة التسوق بنجاح"
      });
    }
  };
  
  const proceedToCheckout = () => {
    navigate(`/${handle?.replace('@', '')}/checkout`);
  };
  
  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
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
  
  if (isLoadingStore) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  const mainColor = getMainColor();
  const isCartEmpty = cartItems.length === 0;
  
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
      
      <div className="container mx-auto px-4 -mt-16 z-10 pb-16">
        <Card className="max-w-3xl mx-auto mb-8 shadow-lg overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white mr-3 bg-white flex items-center justify-center">
                {storeData?.logo_url ? (
                  <img 
                    src={storeData.logo_url} 
                    alt={`${storeData.name} logo`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ShoppingBag className="h-6 w-6 text-gray-500" />
                )}
              </div>
              <div>
                <CardTitle className="text-xl">{storeData?.name || 'المتجر'}</CardTitle>
                <p className="text-sm text-gray-500">سلة التسوق</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearCart}
              disabled={isCartEmpty}
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-1" /> إفراغ السلة
            </Button>
          </CardHeader>
          
          <CardContent className="pt-6">
            {isCartEmpty ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">سلة التسوق فارغة</h3>
                <p className="text-gray-500 mb-6">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
                <Button 
                  onClick={() => navigate(`/${handle?.replace('@', '')}`)}
                  style={{ 
                    backgroundColor: mainColor,
                    borderColor: mainColor,
                    '--tw-ring-color': `${mainColor}80` // Adding transparency for the ring
                  } as React.CSSProperties}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" /> تصفح المنتجات
                </Button>
              </div>
            ) : (
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">المنتج</TableHead>
                      <TableHead>الاسم</TableHead>
                      <TableHead>السعر</TableHead>
                      <TableHead>الكمية</TableHead>
                      <TableHead className="text-left">الإجمالي</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="h-14 w-14 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            ) : (
                              <ShoppingBag className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{formatCurrency(item.price)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || isUpdating}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value) && value > 0) {
                                  updateQuantity(item.id, value);
                                }
                              }}
                              className="h-8 w-14 text-center"
                              min="1"
                            />
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={isUpdating}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-left">
                          {formatCurrency(item.price * item.quantity)}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          
          {!isCartEmpty && (
            <CardFooter className="flex flex-col pt-4 pb-6">
              <Separator className="mb-4" />
              <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">المجموع الفرعي:</span>
                    <span className="font-medium">{formatCurrency(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>الإجمالي:</span>
                    <span>{formatCurrency(getSubtotal())}</span>
                  </div>
                </div>
                <Button 
                  onClick={proceedToCheckout}
                  style={{ 
                    backgroundColor: mainColor,
                    borderColor: mainColor,
                    '--tw-ring-color': `${mainColor}80` // Adding transparency for the ring
                  } as React.CSSProperties}
                  className="w-full md:w-auto"
                >
                  إتمام الشراء
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StoreCart;
