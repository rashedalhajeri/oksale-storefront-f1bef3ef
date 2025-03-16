
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
  
  // تحسين استخدام React Query مع خيارات الكاش
  const { 
    data: statsData, 
    isLoading: statsLoading,
    refetch: refetchStats
  } = useQuery({
    queryKey: ['dashboard-stats', storeId, timeframe],
    queryFn: () => fetchStoreStatistics(storeId),
    enabled: !!storeId,
    staleTime: 2 * 60 * 1000, // تقليل وقت التقادم
    gcTime: 5 * 60 * 1000, // وقت جمع القمامة
    refetchOnWindowFocus: true, // تفعيل إعادة الجلب عند التركيز
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
  
  // تحسين استخدام useMemo لتجنب إعادة الحساب غير الضروري
  const salesData = useMemo(() => {
    if (!statsData?.orders?.length) return [];
    return generateSalesData(statsData.orders, timeframe);
  }, [statsData?.orders, timeframe]);
  
  // تحسين استعلامات React Query الأخرى
  const { 
    data: topProducts = [], 
    isLoading: topProductsLoading 
  } = useQuery({
    queryKey: ['top-products', storeId, timeframe],
    queryFn: () => getTopSellingProducts(storeId),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
  
  // Modified to handle and transform the data correctly
  const { 
    data: recentOrdersResponse,
    isLoading: recentOrdersLoading 
  } = useQuery({
    queryKey: ['recent-orders', storeId],
    queryFn: () => getRecentOrders(storeId, 10),
    enabled: !!storeId,
    staleTime: 1 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
    refetchOnWindowFocus: true,
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
  
  const { 
    data: orderStatusData = [], 
    isLoading: orderStatusLoading 
  } = useQuery({
    queryKey: ['order-status', storeId, timeframe],
    queryFn: () => getOrderStatusStats(storeId),
    enabled: !!storeId,
    staleTime: 3 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  // تحسين الأداء باستخدام useMemo لإحصائيات الداشبورد
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

  // تحسين أداء وظيفة تحميل البيانات
  const loadDashboardData = useCallback(() => {
    refetchStats();
  }, [refetchStats]);

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
    currency: dashboardStats.currency
  };
};
