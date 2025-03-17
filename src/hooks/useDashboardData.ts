
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from '@/utils/dashboard/currencyUtils';
import { formatCurrencyWithSettings, formatNumber } from '@/utils/dashboard/dashboardUtils';
import { useQuery } from '@tanstack/react-query';

import { 
  fetchStoreStatistics, 
  generateSalesData, 
  getTopSellingProducts, 
  getRecentOrders,
  getOrderStatusStats
} from '@/utils/dashboard';

import { formatOrders } from '@/utils/dashboard/orderFormatters';
import { Order } from '@/utils/dashboard/orderTypes';
import { useOrdersRealtime } from './useOrdersRealtime';

// Define a type for the possible response formats from getRecentOrders
interface OrdersResponseObject {
  orders: any[];
  currency: string;
}

export const useDashboardData = (storeId: string) => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState("week");
  const [dashboardStats, setDashboardStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    revenue: 0,
    soldProductsCount: 0,
    currency: 'SAR'
  });
  
  // Optimize React Query with improved cache options
  const { 
    data: statsData, 
    isLoading: statsLoading,
    refetch: refetchStats
  } = useQuery({
    queryKey: ['dashboard-stats', storeId, timeframe],
    queryFn: () => fetchStoreStatistics(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000, // Increase stale time to 5 minutes
    gcTime: 10 * 60 * 1000, // Increase GC time to 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus to prevent duplicate fetches
    meta: {
      onSuccess: (data: any) => {
        if (data) {
          setDashboardStats({
            productsCount: data.productsCount || 0,
            ordersCount: data.ordersCount || 0,
            revenue: parseFloat(data.revenue || '0'),
            soldProductsCount: data.soldProductsCount || 0,
            currency: data.currency || 'SAR'
          });
        }
      },
      onError: (error: any) => {
        console.error("Error loading dashboard stats:", error);
        toast({
          variant: "destructive",
          title: "فشل تحميل الإحصائيات",
          description: "حدث خطأ أثناء تحميل إحصائيات لوحة التحكم، يرجى المحاولة مرة أخرى.",
        });
      }
    }
  });
  
  // Optimize useMemo to avoid unnecessary recalculations
  const salesData = useMemo(() => {
    if (!statsData?.orders?.length) return [];
    return generateSalesData(statsData.orders, timeframe);
  }, [statsData?.orders, timeframe]);
  
  // Optimize other React Query calls
  const { 
    data: topProducts = [], 
    isLoading: topProductsLoading 
  } = useQuery({
    queryKey: ['top-products', storeId, timeframe],
    queryFn: () => getTopSellingProducts(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  
  // Optimize recent orders query with improved caching
  const { 
    data: recentOrdersResponse,
    isLoading: recentOrdersLoading,
    refetch: refetchRecentOrders
  } = useQuery({
    queryKey: ['recent-orders', storeId],
    queryFn: () => getRecentOrders(storeId, 10),
    enabled: !!storeId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  
  // Process the recent orders to ensure we always have an array
  const recentOrders = useMemo(() => {
    if (!recentOrdersResponse) return [];
    
    // If the response is an object with orders property
    if (typeof recentOrdersResponse === 'object' && 
        recentOrdersResponse !== null && 
        !Array.isArray(recentOrdersResponse)) {
      
      // Check if it has the orders property and it's an array
      if ('orders' in recentOrdersResponse && 
          Array.isArray((recentOrdersResponse as OrdersResponseObject).orders)) {
        
        // Safely extract currency
        const currency = 'currency' in recentOrdersResponse ? 
          (recentOrdersResponse as OrdersResponseObject).currency || 'SAR' : 'SAR';
        
        // Format orders using the extracted data
        return formatOrders((recentOrdersResponse as OrdersResponseObject).orders, currency);
      }
    }
    
    // If it's already an array, return it
    if (Array.isArray(recentOrdersResponse)) {
      return recentOrdersResponse;
    }
    
    // Default case, return empty array
    return [];
  }, [recentOrdersResponse]);
  
  // Optimize order status query
  const { 
    data: orderStatusData = [], 
    isLoading: orderStatusLoading 
  } = useQuery({
    queryKey: ['order-status', storeId, timeframe],
    queryFn: () => getOrderStatusStats(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000,
    gcTime: 7 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // استخدام الخطاف الجديد للوقت الحقيقي
  const { lastUpdateTime } = useOrdersRealtime({
    storeId,
    autoRefetch: () => {
      // إعادة تحميل البيانات عند وصول طلب جديد
      refetchRecentOrders();
      refetchStats();
    }
  });

  // تحديث عند تغيير lastUpdateTime
  useEffect(() => {
    if (lastUpdateTime) {
      console.log(`[Dashboard] Realtime update detected at ${lastUpdateTime.toISOString()}`);
    }
  }, [lastUpdateTime]);

  // Optimize statistics with useMemo
  const statistics = useMemo(() => [
    {
      name: "المنتجات",
      value: formatNumber(dashboardStats.productsCount),
      icon: "products",
      description: "إجمالي المنتجات",
      trendUp: true
    },
    {
      name: "المبيعات",
      value: formatNumber(dashboardStats.soldProductsCount),
      icon: "sold",
      description: "المنتجات المباعة",
      trendUp: true
    },
    {
      name: "الطلبات",
      value: formatNumber(dashboardStats.ordersCount),
      icon: "orders",
      description: "طلب",
      trendUp: true
    },
    {
      name: "الإيرادات",
      value: formatCurrencyWithSettings(dashboardStats.revenue, dashboardStats.currency),
      icon: "revenue",
      description: "الإيرادات",
      trendUp: true
    }
  ], [dashboardStats]);

  // Optimize data loading function
  const loadDashboardData = useCallback(() => {
    refetchStats();
    refetchRecentOrders();
  }, [refetchStats, refetchRecentOrders]);

  return {
    timeframe,
    setTimeframe,
    statistics,
    salesData,
    topProducts,
    recentOrders,
    orderStatusData,
    statsLoading,
    chartLoading: statsLoading, 
    topProductsLoading,
    recentOrdersLoading,
    orderStatusLoading,
    loadDashboardData,
    currency: dashboardStats.currency,
    lastUpdateTime // إضافة lastUpdateTime إلى القيم المعادة
  };
};
