
import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock,
  AlertCircle,
  ChevronDown,
  Package,
  User,
  Calendar,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/utils/dashboard/currencyUtils';

interface Order {
  id: string;
  store_id: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  status: string;
  // Additional properties for the mock data
  items?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  payment_method?: string;
  shipping_address?: string;
}

interface DashboardOrdersProps {
  storeData: any;
}

const DashboardOrders: React.FC<DashboardOrdersProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [tabValue, setTabValue] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, [storeData]);

  const fetchOrders = async () => {
    if (storeData?.id) {
      setLoading(true);
      try {
        // Fetch actual orders from Supabase
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('store_id', storeData.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching orders:", error);
          throw error;
        }

        // For demonstration, let's add mock items to each order
        const ordersWithItems = (data || []).map(order => {
          // Create some random mock items for each order
          const itemCount = Math.floor(Math.random() * 4) + 1;
          const items = Array.from({ length: itemCount }).map((_, index) => ({
            id: `item-${order.id}-${index}`,
            name: mockProductNames[Math.floor(Math.random() * mockProductNames.length)],
            quantity: Math.floor(Math.random() * 3) + 1,
            price: parseFloat((Math.random() * 100 + 50).toFixed(2))
          }));

          return {
            ...order,
            items,
            payment_method: Math.random() > 0.5 ? 'بطاقة ائتمان' : 'الدفع عند الاستلام',
            shipping_address: mockAddresses[Math.floor(Math.random() * mockAddresses.length)]
          };
        });

        setOrders(ordersWithItems);

        // If we don't have any actual orders, add some mock data for demonstration
        if (ordersWithItems.length === 0) {
          setOrders(generateMockOrders(storeData.id));
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast({
          variant: "destructive",
          title: "فشل تحميل الطلبات",
          description: "حدث خطأ أثناء تحميل الطلبات، يرجى المحاولة مرة أخرى.",
        });
        
        // Add some mock orders for demonstration
        setOrders(generateMockOrders(storeData.id));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedOrder) return;

    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedOrder.id);

      if (error) {
        console.error("Error updating order status:", error);
        throw error;
      }

      // Update local state
      setOrders(orders.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status, updated_at: new Date().toISOString() }
          : order
      ));

      setSelectedOrder(prev => prev ? { ...prev, status, updated_at: new Date().toISOString() } : null);
      
      toast({
        title: "تم تحديث حالة الطلب",
        description: `تم تغيير حالة الطلب إلى ${getStatusText(status)}`,
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast({
        variant: "destructive",
        title: "فشل تحديث حالة الطلب",
        description: "حدث خطأ أثناء تحديث حالة الطلب، يرجى المحاولة مرة أخرى.",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">مكتمل</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">قيد التجهيز</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">قيد الانتظار</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">ملغي</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'processing':
        return 'قيد التجهيز';
      case 'pending':
        return 'قيد الانتظار';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    // Format date in Gregorian calendar with English numerals
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatShortDate = (dateString: string) => {
    // Format short date in Gregorian calendar with English numerals (day/month only)
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order => {
    // Filter by tab
    if (tabValue !== "all" && order.status !== tabValue) {
      return false;
    }

    // Filter by search
    if (searchTerm) {
      return (
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.customer_phone && order.customer_phone.includes(searchTerm))
      );
    }

    return true;
  });

  // Check if we're on a mobile device
  const isMobile = window.innerWidth < 768;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">إدارة الطلبات</h1>
          <p className="text-gray-600 text-sm">إدارة ومتابعة طلبات متجرك ({orders.length})</p>
        </div>
        <Button variant="outline" size="sm" className="self-start">
          تصدير الطلبات
        </Button>
      </div>

      <Card className="mb-4 border-none shadow-sm">
        <CardContent className="p-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث عن طلب..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="oldest">الأقدم</SelectItem>
                <SelectItem value="highest">الأعلى قيمة</SelectItem>
                <SelectItem value="lowest">الأقل قيمة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tabValue} onValueChange={setTabValue} className="mb-4">
        <TabsList className="mb-3 w-full overflow-x-auto flex-nowrap justify-start">
          <TabsTrigger value="all" className="flex-shrink-0">الكل</TabsTrigger>
          <TabsTrigger value="pending" className="flex-shrink-0">قيد الانتظار</TabsTrigger>
          <TabsTrigger value="processing" className="flex-shrink-0">قيد التجهيز</TabsTrigger>
          <TabsTrigger value="completed" className="flex-shrink-0">مكتمل</TabsTrigger>
          <TabsTrigger value="cancelled" className="flex-shrink-0">ملغي</TabsTrigger>
        </TabsList>

        <TabsContent value={tabValue}>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="animate-pulse border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3 mt-4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredOrders.map((order) => (
                <Card 
                  key={order.id} 
                  className="border-none shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => handleViewOrder(order)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="bg-gray-100 p-1.5 rounded-full">
                          {getStatusIcon(order.status)}
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-xs text-gray-500 ltr">{formatShortDate(order.created_at)}</div>
                    </div>
                    
                    <div className="mb-3">
                      <h3 className="font-medium text-base mb-1">#{order.id.substring(0, 8).toUpperCase()}</h3>
                      <p className="text-gray-600 text-sm truncate">{order.customer_name}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-oksale-700 ltr">
                        {formatCurrency(order.total_amount, storeData?.currency || 'SAR')}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center gap-1 text-xs"
                      >
                        عرض التفاصيل
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <ShoppingCart className="h-10 w-10 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">لا توجد طلبات</h3>
              <p className="text-gray-500 text-center mb-4 text-sm">
                لم يتم العثور على أي طلبات مطابقة لمعايير البحث الخاصة بك.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setTabValue('all');
                }}
                size="sm"
              >
                عرض كل الطلبات
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Order Details Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>تفاصيل الطلب #{selectedOrder?.id.substring(0, 8).toUpperCase()}</SheetTitle>
            <SheetDescription>
              تاريخ الطلب: {selectedOrder && <span className="ltr">{formatDate(selectedOrder.created_at)}</span>}
            </SheetDescription>
          </SheetHeader>
          
          {selectedOrder && (
            <div className="mt-5">
              <div className="flex justify-start items-center mb-4">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedOrder.status)}
                </div>
              </div>

              <Separator className="my-3" />
              
              <div className="space-y-4">
                {/* Customer Info */}
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-2 text-sm">
                    <User className="h-4 w-4 text-gray-500" />
                    معلومات العميل
                  </h3>
                  <div className="bg-gray-50 rounded-md p-3">
                    <p className="text-sm"><strong>الاسم:</strong> {selectedOrder.customer_name}</p>
                    <p className="text-sm"><strong>البريد:</strong> {selectedOrder.customer_email}</p>
                    {selectedOrder.customer_phone && <p className="text-sm ltr"><strong>الهاتف:</strong> {selectedOrder.customer_phone}</p>}
                  </div>
                </div>
                
                {/* Order Items */}
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-2 text-sm">
                    <Package className="h-4 w-4 text-gray-500" />
                    المنتجات
                  </h3>
                  <div className="space-y-2">
                    {selectedOrder.items?.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-md p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
                        </div>
                        <div className="font-medium text-sm ltr">
                          {formatCurrency(item.price * item.quantity, storeData?.currency || 'SAR')}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 font-bold">
                    <span>الإجمالي</span>
                    <span className="ltr">{formatCurrency(selectedOrder.total_amount, storeData?.currency || 'SAR')}</span>
                  </div>
                </div>
                
                {/* Shipping Address */}
                {selectedOrder.shipping_address && (
                  <div>
                    <h3 className="font-medium flex items-center gap-2 mb-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      عنوان الشحن
                    </h3>
                    <div className="bg-gray-50 rounded-md p-3">
                      <p className="text-sm">{selectedOrder.shipping_address}</p>
                    </div>
                  </div>
                )}
                
                {/* Payment Method */}
                {selectedOrder.payment_method && (
                  <div>
                    <h3 className="font-medium flex items-center gap-2 mb-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      طريقة الدفع
                    </h3>
                    <div className="bg-gray-50 rounded-md p-3">
                      <p className="text-sm">{selectedOrder.payment_method}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="my-4" />
              
              <div>
                <h3 className="font-medium mb-2 text-sm">تحديث حالة الطلب</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={selectedOrder.status === 'pending' ? 'default' : 'outline'} 
                    onClick={() => handleUpdateStatus('pending')}
                    className="justify-start text-xs"
                    size="sm"
                  >
                    <Clock className="h-3 w-3 mr-1 text-yellow-500" />
                    قيد الانتظار
                  </Button>
                  <Button 
                    variant={selectedOrder.status === 'processing' ? 'default' : 'outline'} 
                    onClick={() => handleUpdateStatus('processing')}
                    className="justify-start text-xs"
                    size="sm"
                  >
                    <Clock className="h-3 w-3 mr-1 text-blue-500" />
                    قيد التجهيز
                  </Button>
                  <Button 
                    variant={selectedOrder.status === 'completed' ? 'default' : 'outline'} 
                    onClick={() => handleUpdateStatus('completed')}
                    className="justify-start text-xs"
                    size="sm"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                    مكتمل
                  </Button>
                  <Button 
                    variant={selectedOrder.status === 'cancelled' ? 'default' : 'outline'} 
                    onClick={() => handleUpdateStatus('cancelled')}
                    className="justify-start text-xs"
                    size="sm"
                  >
                    <AlertCircle className="h-3 w-3 mr-1 text-red-500" />
                    ملغي
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <SheetFooter className="mt-6">
            <SheetClose asChild>
              <Button size="sm">إغلاق</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// Mock data helpers
const mockProductNames = [
  'هاتف ذكي XYZ Pro',
  'سماعات بلوتوث لاسلكية',
  'حقيبة ظهر للسفر',
  'حذاء رياضي جديد',
  'ساعة ذكية متطورة',
  'قميص قطني رجالي',
  'فستان نسائي عصري',
  'جهاز لوحي 10 بوصة',
  'كاميرا رقمية احترافية',
  'مجموعة عناية بالبشرة'
];

const mockAddresses = [
  'الرياض، حي النزهة، شارع التحلية، فيلا 123',
  'جدة، حي الروضة، شارع فلسطين، عمارة 45، شقة 3',
  'الدمام، حي الشاطئ، شارع الأمير محمد، منزل 67',
  'مكة المكرمة، حي العزيزية، شارع الملك فهد، عمارة 89'
];

const generateMockOrders = (storeId: string): Order[] => {
  // Generate 10 mock orders
  return Array.from({ length: 10 }).map((_, index) => {
    const id = `${Math.random().toString(36).substring(2, 10)}`;
    const totalAmount = parseFloat((Math.random() * 1000 + 100).toFixed(2));
    const statusOptions = ['pending', 'processing', 'completed', 'cancelled'];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));
    
    // Create some random mock items for this order
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const items = Array.from({ length: itemCount }).map((_, itemIndex) => ({
      id: `item-${id}-${itemIndex}`,
      name: mockProductNames[Math.floor(Math.random() * mockProductNames.length)],
      quantity: Math.floor(Math.random() * 3) + 1,
      price: parseFloat((Math.random() * 100 + 50).toFixed(2))
    }));
    
    return {
      id,
      store_id: storeId,
      total_amount: totalAmount,
      created_at: createdDate.toISOString(),
      updated_at: createdDate.toISOString(),
      customer_name: ['أحمد محمد', 'سارة أحمد', 'محمد علي', 'فاطمة خالد'][Math.floor(Math.random() * 4)],
      customer_email: ['ahmed@example.com', 'sara@example.com', 'mohammad@example.com', 'fatima@example.com'][Math.floor(Math.random() * 4)],
      customer_phone: `05${Math.floor(Math.random() * 90000000) + 10000000}`,
      status,
      items,
      payment_method: Math.random() > 0.5 ? 'بطاقة ائتمان' : 'الدفع عند الاستلام',
      shipping_address: mockAddresses[Math.floor(Math.random() * mockAddresses.length)]
    };
  });
};

export default DashboardOrders;
