import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShoppingCart, 
  Search, 
  CheckCircle2, 
  Clock,
  AlertCircle,
  FileText,
  Package,
  Filter
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { cn } from "@/lib/utils";
import { formatOrderId, getCachedFormattedOrders } from '@/utils/dashboard/orderFormatters';

import OrderFilterSheet from './orders/OrderFilterSheet';
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(/\//g, '-');
  };

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setTabValue('all');
    setSortOption('newest');
  }, []);

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
      
      const formattedOrders = getCachedFormattedOrders(result.orders, storeData.currency || 'SAR');
      
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

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'processing':
        return 'تجهيز';
      case 'pending':
        return 'انتظار';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">مكتمل</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">تجهيز</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">انتظار</Badge>;
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

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const renderOrdersTable = () => {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">رقم الطلب</TableHead>
              <TableHead className="font-bold">العميل</TableHead>
              <TableHead className="font-bold">المبلغ</TableHead>
              <TableHead className="font-bold">التاريخ</TableHead>
              <TableHead className="font-bold">الحالة</TableHead>
              <TableHead className="text-center">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 font-bold font-mono dir-ltr">{order.id}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-800">{order.customer}</TableCell>
                <TableCell className="font-semibold font-mono">{order.amount}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-mono">{formatDate(order.created_at)}</span>
                    <span className={`text-xs ${order.timeColor}`}>{order.relativeTime}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleViewOrder(order)}
                    className="hover:bg-gray-100"
                  >
                    <FileText className="h-4 w-4 ml-1" />
                    عرض
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderOrderContent = () => {
    if (loading) {
      return <OrderLoadingState isMobile={isMobile} count={isMobile ? 4 : 6} />;
    }

    if (orders.length === 0) {
      return <OrderEmptyState onReset={resetFilters} isMobile={isMobile} />;
    }

    if (isMobile) {
      return (
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
      );
    }

    return (
      <>
        {renderOrdersTable()}
        <OrderPagination 
          pagination={pagination}
          handlePageChange={handlePageChange}
          isMobile={isMobile}
        />
      </>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center justify-center w-11 h-11 rounded-xl shadow-sm relative overflow-hidden",
            "bg-gradient-to-br from-purple-800 to-indigo-900",
            "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2 before:bg-white/20 before:rounded-t-full"
          )}>
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">إدارة الطلبات</h1>
            <p className="text-gray-600">إدارة ومتابعة طلبات متجرك ({pagination.total})</p>
          </div>
        </div>
        {!isMobile && (
          <Button 
            variant="outline" 
            size="sm" 
            className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 border-gray-200 hover:border-gray-300 transition-all duration-300"
          >
            تصدير الطلبات
          </Button>
        )}
      </div>

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
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 border-gray-200 hover:border-gray-300 transition-all duration-300"
                >
                  <div className={cn(
                    "flex items-center justify-center w-5 h-5 rounded-full shadow-sm relative overflow-hidden",
                    "bg-gradient-to-br from-purple-800 to-indigo-900",
                    "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2 before:bg-white/20 before:rounded-t-full"
                  )}>
                    <Filter className="h-3 w-3 text-white" />
                  </div>
                  تصفية
                </Button>
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
              {renderOrderContent()}
            </TabsContent>
          </Tabs>
        </>
      )}

      {isMobile && (
        <Tabs value={tabValue} onValueChange={setTabValue} className="mb-4">
          <TabsList className="hidden">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
            <TabsTrigger value="processing">قيد التجهيز</TabsTrigger>
            <TabsTrigger value="completed">مكتمل</TabsTrigger>
            <TabsTrigger value="cancelled">ملغي</TabsTrigger>
          </TabsList>
          
          <TabsContent value={tabValue}>
            {renderOrderContent()}
          </TabsContent>
        </Tabs>
      )}

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
