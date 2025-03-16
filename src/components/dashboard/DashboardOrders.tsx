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
  MapPin,
  SlidersHorizontal,
  Clock3,
  Phone,
  Mail,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight
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
  SheetTrigger,
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/utils/dashboard/currencyUtils';
import { formatRelativeTime, formatOrderTime, translateOrderStatus, getOrderStatusColor, generateUniqueOrderNumber, formatOrderNumber, getTimeColor } from '@/utils/dashboard/dashboardUtils';
import { getOrders, getOrderDetails, OrderOptions } from '@/utils/dashboard/orders';
import { useIsMobile } from '@/hooks/use-mobile';

interface Order {
  id: string;
  rawId?: string;
  customer: string;
  email: string;
  phone: string | null;
  date: string;
  relativeTime: string;
  timeColor: string;
  amount: string;
  rawAmount: number;
  status: string;
  statusText: string;
  statusColors: { bg: string; text: string; icon: string };
  currency: string;
  created_at: string;
  store_id?: string;
  total_amount?: number;
  updated_at?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
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

interface PaginationState {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const DashboardOrders: React.FC<DashboardOrdersProps> = ({ storeData }) => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [tabValue, setTabValue] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [pagination, setPagination] = useState<PaginationState>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchOrders();
  }, [storeData, pagination.page, tabValue, sortOption]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (pagination.page === 1) {
        fetchOrders();
      } else {
        setPagination(prev => ({ ...prev, page: 1 }));
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const fetchOrders = async () => {
    if (storeData?.id) {
      setLoading(true);
      try {
        let sortBy = 'created_at';
        let sortDirection: 'asc' | 'desc' = 'desc';
        
        switch (sortOption) {
          case 'newest':
            sortBy = 'created_at';
            sortDirection = 'desc';
            break;
          case 'oldest':
            sortBy = 'created_at';
            sortDirection = 'asc';
            break;
          case 'highest':
            sortBy = 'total_amount';
            sortDirection = 'desc';
            break;
          case 'lowest':
            sortBy = 'total_amount';
            sortDirection = 'asc';
            break;
        }
        
        const status = tabValue !== 'all' ? tabValue : null;
        const options: OrderOptions = {
          page: pagination.page,
          limit: pagination.limit,
          status,
          search: searchTerm || null,
          sortBy,
          sortDirection
        };
        
        const result = await getOrders(storeData.id, options);
        
        if (result.orders.length === 0 && !searchTerm && tabValue === 'all' && pagination.page === 1) {
          const mockData = generateMockOrders(storeData.id);
          setOrders(mockData);
          setPagination({
            total: mockData.length,
            page: 1,
            limit: pagination.limit,
            totalPages: Math.ceil(mockData.length / pagination.limit)
          });
        } else {
          setOrders(result.orders as Order[]);
          setPagination(result.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast({
          variant: "destructive",
          title: "فشل تحميل الطلبات",
          description: "حدث خطأ أثناء تحميل الطلبات، يرجى المحاولة مرة أخرى.",
        });
        
        const mockData = generateMockOrders(storeData.id);
        setOrders(mockData);
        setPagination({
          total: mockData.length,
          page: 1,
          limit: pagination.limit,
          totalPages: Math.ceil(mockData.length / pagination.limit)
        });
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
        .eq('id', selectedOrder.rawId || selectedOrder.id);

      if (error) {
        console.error("Error updating order status:", error);
        throw error;
      }

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
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const renderPaginationItems = () => {
    const { page, totalPages } = pagination;
    const items = [];
    
    const pageNumbers = new Set<number>();
    pageNumbers.add(1);
    pageNumbers.add(totalPages);
    
    for (let i = Math.max(2, page - 1); i <= Math.min(page + 1, totalPages - 1); i++) {
      pageNumbers.add(i);
    }
    
    const sortedPageNumbers = Array.from(pageNumbers).sort((a, b) => a - b);
    
    for (let i = 0; i < sortedPageNumbers.length; i++) {
      const pageNum = sortedPageNumbers[i];
      
      if (i > 0 && sortedPageNumbers[i] - sortedPageNumbers[i - 1] > 1) {
        items.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key={pageNum}>
          <PaginationLink
            isActive={page === pageNum}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">إدارة الطلبات</h1>
          <p className="text-gray-600 text-sm">إدارة ومتابعة طلبات متجرك ({pagination.total})</p>
        </div>
        {!isMobile && (
          <Button variant="outline" size="sm" className="self-start">
            تصدير الطلبات
          </Button>
        )}
      </div>

      {isMobile && (
        <div className="mb-4 flex gap-2">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1 w-1/2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>تصفية</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
              <SheetHeader className="mb-4">
                <SheetTitle>تصفية الطلبات</SheetTitle>
              </SheetHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">حالة الطلب</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
                      <Button 
                        key={status}
                        variant={tabValue === status ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => {
                          setTabValue(status);
                          setIsFilterOpen(false);
                        }}
                        className="justify-start text-xs"
                      >
                        {status === 'all' && 'الكل'}
                        {status === 'pending' && 'قيد الانتظار'}
                        {status === 'processing' && 'قيد التجهيز'}
                        {status === 'completed' && 'مكتمل'}
                        {status === 'cancelled' && 'ملغي'}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">ترتيب حسب</label>
                  <Select 
                    defaultValue={sortOption} 
                    onValueChange={(value) => setSortOption(value)}
                  >
                    <SelectTrigger>
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

                <div className="relative">
                  <label className="text-sm font-medium mb-1 block">بحث</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="البحث عن طلب..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <SheetFooter className="mt-6 flex-row space-x-2 justify-end">
                  <SheetClose asChild>
                    <Button type="button" variant="outline" size="sm">
                      إغلاق
                    </Button>
                  </SheetClose>
                  <Button 
                    size="sm"
                    onClick={() => {
                      setSearchTerm('');
                      setTabValue('all');
                      setSortOption('newest');
                      setIsFilterOpen(false);
                    }}
                  >
                    إعادة تعيين
                  </Button>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث..."
              className="pl-10 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {!isMobile && (
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
              <Select 
                value={sortOption} 
                onValueChange={(value) => setSortOption(value)}
              >
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
      )}

      {!isMobile && (
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
            ) : orders.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {orders.map((order) => (
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
                          <div className={`text-xs ${order.timeColor || 'text-gray-500'} flex items-center gap-1`}>
                            <Clock3 className="h-3 w-3" />
                            <span className="rtl">{order.relativeTime}</span>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <div className="flex items-center justify-between">
                            <p className="text-gray-700 font-medium truncate">{order.customer}</p>
                          </div>
                          <div className="flex flex-col gap-0.5 mt-1 text-xs text-gray-500">
                            {order.phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                <span className="ltr">{order.phone}</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-gray-400 text-xs ltr mt-1.5 font-medium">
                            {order.id}
                          </h3>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-oksale-700 text-sm ltr">
                            {order.amount}
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
                
                {pagination.totalPages > 1 && (
                  <Pagination className="mt-6">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pagination.page - 1);
                          }}
                          className={pagination.page <= 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      
                      {renderPaginationItems()}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pagination.page + 1);
                          }}
                          className={pagination.page >= pagination.totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
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
                    setSortOption('newest');
                  }}
                  size="sm"
                >
                  عرض كل الطلبات
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      {isMobile && (
        <div className="mb-4">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="animate-pulse border-none shadow-sm">
                  <CardContent className="p-3">
                    <div className="h-4 bg-gray-200 rounded mb-3 w-1/4"></div>
                    <div className="h-5 bg-gray-200 rounded mb-3 w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3 mt-3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : orders.length > 0 ? (
            <>
              <div className="space-y-2">
                {orders.map((order) => (
                  <Card 
                    key={order.id} 
                    className="border-none shadow-sm"
                    onClick={() => handleViewOrder(order)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            {getStatusBadge(order.status)}
                            <div className={`text-xs ${order.timeColor || 'text-gray-500'} flex items-center gap-1 mr-2`}>
                              <Clock3 className="h-3 w-3" />
                              <span className="rtl">{order.relativeTime}</span>
                            </div>
                          </div>
                          <p className="font-medium text-sm mb-0.5">{order.customer}</p>
                          
                          {order.phone && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                              <Phone className="h-3 w-3" />
                              <span className="ltr">{order.phone}</span>
                            </div>
                          )}
                          
                          <h3 className="text-gray-400 text-xs mt-1 ltr font-medium">
                            {order.id}
                          </h3>
                        </div>
                        <span className="font-bold text-sm text-oksale-700 ltr">
                          {order.amount}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={pagination.page <= 1}
                      onClick={() => handlePageChange(1)}
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={pagination.page <= 1}
                      onClick={() => handlePageChange(pagination.page - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <span className="text-sm">
                      {pagination.page} / {pagination.totalPages}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={pagination.page >= pagination.totalPages}
                      onClick={() => handlePageChange(pagination.page + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={pagination.page >= pagination.totalPages}
                      onClick={() => handlePageChange(pagination.totalPages)}
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 px-4">
              <ShoppingCart className="h-8 w-8 text-gray-400 mb-2" />
              <h3 className="text-base font-medium text-gray-900 mb-1">لا توجد طلبات</h3>
              <p className="text-gray-500 text-center mb-3 text-xs">
                لم يتم العثور على أي طلبات مطابقة لمعايير البحث الخاصة بك.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setTabValue('all');
                  setSortOption('newest');
                }}
                size="sm"
                variant="outline"
              >
                عرض كل الطلبات
              </Button>
            </div>
          )}
        </div>
      )}

      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className={`w-full ${isMobile ? 'max-w-full' : 'sm:max-w-md'} overflow-y-auto p-4`}>
          <SheetHeader className="text-right">
            <SheetTitle className="text-lg ltr font-bold">
              تفاصيل الطلب {selectedOrder && selectedOrder.id}
            </SheetTitle>
            <SheetDescription>
              <div className="flex items-center gap-2 justify-end">
                <span>تاريخ الطلب:</span> 
                {selectedOrder && <span className="ltr">{formatDate(selectedOrder.created_at)}</span>}
              </div>
              {selectedOrder && (
                <div className={`flex items-center gap-1 justify-end mt-1 ${selectedOrder.timeColor || 'text-gray-500'}`}>
                  <Clock3 className="h-3.5 w-3.5" />
                  <span>{selectedOrder.relativeTime}</span>
                </div>
              )}
            </SheetDescription>
          </SheetHeader>
          
          {selectedOrder && (
            <div className="mt-4">
              <div className="flex justify-start items-center mb-3">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedOrder.status)}
                </div>
              </div>

              <Separator className="my-3" />
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium flex items-center gap-1.5 mb-1.5 text-sm">
                    <User className="h-3.5 w-3.5 text-gray-500" />
                    معلومات العميل
                  </h3>
                  <div className="bg-gray-50 rounded-md p-2.5">
                    <p className="text-xs mb-1.5"><strong>الاسم:</strong> {selectedOrder.customer}</p>
                    <p className="text-xs mb-1.5"><strong>البريد:</strong> {selectedOrder.email}</p>
                    {selectedOrder.phone && (
                      <p className="text-xs ltr"><strong>الهاتف:</strong> {selectedOrder.phone}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium flex items-center gap-1.5 mb-1.5 text-sm">
                    <Package className="h-3.5 w-3.5 text-gray-500" />
                    المنتجات
                  </h3>
                  <div className="space-y-1.5">
                    {selectedOrder.items?.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-md p-2.5 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-xs">{item.name}</p>
                          <p className="text-[10px] text-gray-500">الكمية: {item.quantity}</p>
                        </div>
                        <div className="font-medium text-xs ltr">
                          {formatCurrency(item.price * item.quantity, selectedOrder.currency)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-3 font-bold text-sm">
                    <span>الإجمالي</span>
                    <span className="ltr">{formatCurrency(selectedOrder.total_amount || 0, selectedOrder.currency)}</span>
                  </div>
                </div>
                
                {selectedOrder.shipping_address && (
                  <div>
                    <h3 className="font-medium flex items-center gap-1.5 mb-1.5 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-gray-500" />
                      عنوان الشحن
                    </h3>
                    <div className="bg-gray-50 rounded-md p-2.5">
                      <p className="text-xs">{selectedOrder.shipping_address}</p>
                    </div>
                  </div>
                )}
                
                {selectedOrder.payment_method && (
                  <div>
                    <h3 className="font-medium flex items-center gap-1.5 mb-1.5 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-gray-500" />
                      طريقة الدفع
                    </h3>
                    <div className="bg-gray-50 rounded-md p-2.5">
                      <p className="text-xs">{selectedOrder.payment_method}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="my-3" />
              
              <div>
                <h3 className="font-medium mb-2 text-sm">تحديث حالة الطلب</h3>
                <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2'} gap-2`}>
                  <Button 
                    variant={selectedOrder.status === 'pending' ? 'default' : '
