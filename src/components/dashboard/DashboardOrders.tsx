
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShoppingCart, 
  Search, 
  CheckCircle2, 
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { formatRelativeTime, getTimeColor } from '@/utils/dashboard/dashboardUtils';
import { 
  getOrders, 
  OrderOptions, 
  Order, 
  PaginationState,
  generateMockOrders
} from '@/utils/dashboard/orders';
import { useIsMobile } from '@/hooks/use-mobile';

// Import refactored components
import OrderFilterSheet from './orders/OrderFilterSheet';
import OrderCard from './orders/OrderCard';
import OrderCardMobile from './orders/OrderCardMobile';
import OrderDetailSheet from './orders/OrderDetailSheet';
import OrderPagination from './orders/OrderPagination';
import OrderEmptyState from './orders/OrderEmptyState';
import OrderLoadingState from './orders/OrderLoadingState';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [pagination, setPagination] = useState<PaginationState>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });
  const isMobile = useIsMobile();

  // Format dates and relative times
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

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setTabValue('all');
    setSortOption('newest');
  }, []);

  // Fetch orders based on current filters and pagination
  const fetchOrders = useCallback(async () => {
    if (!storeData?.id) return;

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
      
      // Format orders with relative time
      const formattedOrders = result.orders.map((order: any) => {
        const relativeTime = formatRelativeTime(order.created_at);
        const timeColor = getTimeColor(order.created_at, order.status);
        
        return {
          ...order,
          customer: order.customer_name || 'عميل',
          relativeTime,
          timeColor,
          amount: formatCurrency(Number(order.total_amount), storeData.currency || 'SAR'),
          rawAmount: Number(order.total_amount),
          currency: storeData.currency || 'SAR',
          email: order.customer_email,
          phone: order.customer_phone
        };
      });
      
      if (formattedOrders.length === 0 && !searchTerm && tabValue === 'all' && pagination.page === 1) {
        const mockData = generateMockOrders(storeData.id);
        setOrders(mockData);
        setPagination({
          total: mockData.length,
          page: 1,
          limit: pagination.limit,
          totalPages: Math.ceil(mockData.length / pagination.limit)
        });
      } else {
        setOrders(formattedOrders);
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
  }, [storeData?.id, pagination.page, pagination.limit, tabValue, sortOption, searchTerm, toast]);

  // Fetch orders on filter or pagination change
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (pagination.page === 1) {
        fetchOrders();
      } else {
        setPagination(prev => ({ ...prev, page: 1 }));
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, fetchOrders]);

  // Handle viewing order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  // Handle updating order status
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

      // Update order in UI
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

  // Get status text for display
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

  // Get status badge for display
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

  // Get icon for status
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

  // Handle page change for pagination
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination(prev => ({ ...prev, page: newPage }));
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

      {/* Mobile filter controls */}
      {isMobile && (
        <div className="mb-4 flex gap-2">
          <OrderFilterSheet 
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            tabValue={tabValue}
            setTabValue={setTabValue}
            sortOption={sortOption}
            setSortOption={setSortOption}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
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

      {/* Desktop filter controls */}
      {!isMobile && (
        <>
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

          <Tabs value={tabValue} onValueChange={setTabValue} className="mb-4">
            <TabsList className="mb-3 w-full overflow-x-auto flex-nowrap justify-start">
              <TabsTrigger value="all" className="flex-shrink-0">الكل</TabsTrigger>
              <TabsTrigger value="pending" className="flex-shrink-0">قيد الانتظار</TabsTrigger>
              <TabsTrigger value="processing" className="flex-shrink-0">قيد التجهيز</TabsTrigger>
              <TabsTrigger value="completed" className="flex-shrink-0">مكتمل</TabsTrigger>
              <TabsTrigger value="cancelled" className="flex-shrink-0">ملغي</TabsTrigger>
            </TabsList>
          </Tabs>
        </>
      )}

      {/* Desktop order cards */}
      {!isMobile && (
        <TabsContent value={tabValue}>
          {loading ? (
            <OrderLoadingState isMobile={false} />
          ) : orders.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {orders.map((order) => (
                  <OrderCard 
                    key={order.id} 
                    order={order}
                    onViewOrder={handleViewOrder}
                    getStatusIcon={getStatusIcon}
                  />
                ))}
              </div>
              
              <OrderPagination 
                pagination={pagination}
                handlePageChange={handlePageChange}
                isMobile={false}
              />
            </>
          ) : (
            <OrderEmptyState 
              onReset={resetFilters}
              isMobile={false}
            />
          )}
        </TabsContent>
      )}

      {/* Mobile order cards */}
      {isMobile && (
        <div className="mb-4">
          {loading ? (
            <OrderLoadingState isMobile={true} count={4} />
          ) : orders.length > 0 ? (
            <>
              <div className="space-y-2">
                {orders.map((order) => (
                  <OrderCardMobile 
                    key={order.id} 
                    order={order}
                    onViewOrder={handleViewOrder}
                    getStatusBadge={getStatusBadge}
                  />
                ))}
              </div>
              
              <OrderPagination 
                pagination={pagination}
                handlePageChange={handlePageChange}
                isMobile={true}
              />
            </>
          ) : (
            <OrderEmptyState 
              onReset={resetFilters}
              isMobile={true}
            />
          )}
        </div>
      )}

      {/* Order details sheet */}
      <OrderDetailSheet 
        isOpen={isDetailOpen}
        setIsOpen={setIsDetailOpen}
        selectedOrder={selectedOrder}
        getStatusBadge={getStatusBadge}
        formatDate={formatDate}
        handleUpdateStatus={handleUpdateStatus}
        isMobile={isMobile}
      />
    </div>
  );
};

export default DashboardOrders;
