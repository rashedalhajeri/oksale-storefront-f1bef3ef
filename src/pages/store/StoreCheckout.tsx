
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, CheckCircle, ShoppingBag, Truck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_COVER_IMAGE } from '@/components/StoreHeader';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema for checkout
const checkoutFormSchema = z.object({
  name: z.string().min(3, { message: 'الاسم يجب أن يحتوي على 3 أحرف على الأقل' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  phone: z.string().optional(),
  address: z.string().min(10, { message: 'يرجى إدخال عنوان تفصيلي' }),
  city: z.string().min(2, { message: 'يرجى إدخال اسم المدينة' }),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Type definitions for cart items
interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const StoreCheckout: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      notes: '',
    },
  });
  
  // Fetch store data
  const { data: storeData, isLoading: isLoadingStore } = useQuery({
    queryKey: ['store-checkout', handle],
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
          const items = JSON.parse(savedCart);
          setCartItems(items);
          
          if (items.length === 0) {
            // Redirect to cart if it's empty
            navigate(`/${handle?.replace('@', '')}/cart`);
          }
        } catch (e) {
          console.error("Error parsing cart data", e);
          setCartItems([]);
          navigate(`/${handle?.replace('@', '')}/cart`);
        }
      } else {
        // Redirect to cart if it's empty
        navigate(`/${handle?.replace('@', '')}/cart`);
      }
    };
    
    loadCart();
  }, [storeData?.id, handle, navigate]);
  
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
  
  const onSubmit = async (values: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "سلة التسوق فارغة",
        description: "لا يمكن إتمام الطلب بدون منتجات"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create order in database
      const totalAmount = getSubtotal();
      
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          store_id: storeData?.id,
          customer_name: values.name,
          customer_email: values.email,
          customer_phone: values.phone || null,
          total_amount: totalAmount,
          status: 'pending'
        })
        .select('id')
        .single();
      
      if (orderError) throw orderError;
      
      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.productId,
        price: item.price,
        quantity: item.quantity
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      // Clear cart
      if (storeData?.id) {
        const storeKey = `cart-${storeData.id}`;
        localStorage.removeItem(storeKey);
        setCartItems([]);
      }
      
      // Show success state
      setOrderPlaced(true);
      
      toast({
        title: "تم تقديم الطلب بنجاح",
        description: "سنتواصل معك قريباً لتأكيد الطلب"
      });
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ أثناء تقديم الطلب",
        description: error.message || "يرجى المحاولة مرة أخرى"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoadingStore) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  const mainColor = getMainColor();
  
  if (orderPlaced) {
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
          <Card className="max-w-xl mx-auto mb-8 shadow-lg overflow-hidden">
            <CardHeader className="text-center pt-8 pb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">تم تقديم طلبك بنجاح!</CardTitle>
              <p className="text-gray-500 mt-2">سنتواصل معك قريباً لتأكيد الطلب</p>
            </CardHeader>
            
            <CardContent className="space-y-4 px-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">ملخص الطلب</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">عدد المنتجات:</span>
                    <span className="font-medium">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">المجموع:</span>
                    <span className="font-medium">{formatCurrency(getSubtotal())}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Truck className="h-4 w-4" />
                  <span>سيتم التواصل معك لترتيب التوصيل وطريقة الدفع</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center gap-4 pt-2 pb-8">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/${handle?.replace('@', '')}`)}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                العودة للتسوق
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
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
            to={`/${handle?.replace('@', '')}/cart`} 
            className="flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>العودة لسلة التسوق</span>
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-16 z-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <Card className="md:col-span-2 shadow-lg overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle className="text-xl">معلومات الطلب</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم الكامل</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسمك الكامل" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="05xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان التوصيل</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل عنوان التوصيل بالتفصيل" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المدينة</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسم المدينة" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ملاحظات إضافية</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="ملاحظات إضافية أو تعليمات للتوصيل (اختياري)" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full"
                      style={{ 
                        backgroundColor: mainColor,
                        borderColor: mainColor,
                        '--tw-ring-color': `${mainColor}80` // Adding transparency for the ring
                      } as React.CSSProperties}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>جاري تقديم الطلب...</>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          تأكيد الطلب وإتمام الشراء
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {/* Order Summary */}
          <Card className="shadow-lg h-fit">
            <CardHeader className="border-b">
              <CardTitle className="text-xl">ملخص الطلب</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-100">
                          <ShoppingBag className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{formatCurrency(item.price)} × {item.quantity}</span>
                        <span className="font-medium text-gray-700">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2 py-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">المجموع الفرعي:</span>
                  <span>{formatCurrency(getSubtotal())}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>الإجمالي:</span>
                  <span>{formatCurrency(getSubtotal())}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 pb-4">
              <div className="text-sm text-center w-full text-gray-500">
                سيتم التواصل معك لترتيب التوصيل وطريقة الدفع بعد تقديم الطلب
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoreCheckout;
